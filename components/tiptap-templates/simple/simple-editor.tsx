"use client";

import * as React from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import styles from "@/styles/tiptap-custom.module.css";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Underline } from "@tiptap/extension-underline";
import { HorizontalRule } from "@tiptap/extension-horizontal-rule";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";

// --- Custom Extensions ---
import { Link } from "@/components/tiptap-extension/link-extension";
import { Selection } from "@/components/tiptap-extension/selection-extension";
import { TrailingNode } from "@/components/tiptap-extension/trailing-node-extension";

// --- UI Primitives ---
import { Button } from "@/components/tiptap-ui-primitive/button";
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu";
import { BlockQuoteButton } from "@/components/tiptap-ui/blockquote-button";
import { HorizontalRuleButton } from "@/components/tiptap-ui/horizontal-rule-button";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from "@/components/tiptap-ui/color-highlight-popover/color-highlight-popover";
import {
  TextColorPopover,
  TextColorPopoverContent,
  TextColorPopoverButton,
} from "@/components/tiptap-ui/text-color-popover/text-color-popover";
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/components/tiptap-ui/link-popover";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";

// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/components/tiptap-icons/link-icon";

// --- Hooks ---
import { useMobile } from "@/hooks/use-mobile";
import { useWindowSize } from "@/hooks/use-window-size";
import { useCursorVisibility } from "@/hooks/use-cursor-visibility";
import { useNewProductStore } from "@/lib/store/useNewProductStore";

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss";

import content from "@/components/tiptap-templates/simple/data/content.json";

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  onTextColorClick,
  isMobile,
}: {
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  onTextColorClick: () => void;
  isMobile: boolean;
}) => {
  return (
    <>
      <ToolbarGroup className="tiptap-toolbar-group">
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup className="tiptap-toolbar-group">
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
        <ListDropdownMenu types={["bulletList", "orderedList", "taskList"]} />
        <BlockQuoteButton />
        <HorizontalRuleButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup className="tiptap-toolbar-group">
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <TextColorPopover />
        ) : (
          <TextColorPopoverButton onClick={onTextColorClick} />
        )}
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup className="tiptap-toolbar-group">
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup className="tiptap-toolbar-group">
        <ImageUploadButton text="Add" />
      </ToolbarGroup>
    </>
  );
};

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link" | "textColor";
  onBack: () => void;
}) => (
  <>
    <ToolbarGroup className="tiptap-toolbar-group">
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : type === "textColor" ? (
      <TextColorPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
);

export function SimpleEditor() {
  const isMobile = useMobile();
  const windowSize = useWindowSize();
  const [mobileView, setMobileView] = React.useState<
    "main" | "highlighter" | "link" | "textColor"
  >("main");
  const toolbarRef = React.useRef<HTMLDivElement>(null);
  const { contentIntroduction, setContentIntroduction } = useNewProductStore();

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "상품 상세 내용을 입력하세요.",
        class: "tiptap-editor-content",
      },
      // 내용 기반 자동 높이 조정
      handleDOMEvents: {
        keydown: (view, event) => {
          // 에디터 내용 변경 시 높이 자동 조정 처리
          setTimeout(() => {
            if (view.dom && view.dom.parentElement) {
              const editorHeight = view.dom.scrollHeight;
              view.dom.style.minHeight = `${editorHeight}px`;
            }
          }, 0);
          return false;
        },
      },
    },
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "resizable-image",
          style: "cursor: pointer; max-width: 100%; height: auto;",
        },
      }),
      Typography,
      HorizontalRule,
      // 텍스트 스타일과 색상 기능 추가 (핵심)
      TextStyle,
      Color.configure({
        types: [TextStyle.name],
      }),

      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
      TrailingNode,
      Link.configure({ openOnClick: false }),
    ],
    content: contentIntroduction || content,
    onUpdate: ({ editor }) => {
      // 에디터 내용이 변경될 때마다 스토어에 저장
      const html = editor.getHTML();
      setContentIntroduction(html);

      // 내용 변경 시 높이 자동 조정
      if (editor.view && editor.view.dom) {
        const editorDOM = editor.view.dom;
        editorDOM.style.height = "auto";
        editorDOM.style.minHeight = "500px";
      }
    },
  });

  // 에디터 마운트 후 높이 초기화 처리
  React.useEffect(() => {
    if (editor && editor.view && editor.view.dom) {
      const editorDOM = editor.view.dom;
      editorDOM.style.height = "auto";
      editorDOM.style.minHeight = "500px";
      editorDOM.style.overflow = "visible";

      // 부모 요소도 auto height로 설정
      if (editorDOM.parentElement) {
        editorDOM.parentElement.style.height = "auto";
        editorDOM.parentElement.style.minHeight = "500px";
        editorDOM.parentElement.style.overflow = "visible";
      }

      // 이미지 클릭 이벤트 처리
      const handleImageClick = (event: Event) => {
        const target = event.target as HTMLElement;
        console.log("클릭된 요소:", target);

        // 이벤트 위임으로 이미지 찾기
        let imageElement: HTMLImageElement | null = null;
        if (
          target.tagName === "IMG" &&
          target.classList.contains("resizable-image")
        ) {
          imageElement = target as HTMLImageElement;
        } else {
          // 클릭된 요소의 자식에서 이미지 찾기
          const clickedImage = target.querySelector(
            "img.resizable-image",
          ) as HTMLImageElement;
          if (clickedImage) {
            imageElement = clickedImage;
          }
        }

        if (imageElement) {
          event.preventDefault();
          event.stopPropagation();

          console.log("이미지 클릭됨:", imageElement);

          // 모든 기존 리사이즈 핸들 제거
          const existingHandles = document.querySelectorAll(".resize-handle");
          existingHandles.forEach((handle) => handle.remove());

          // 모든 이미지에서 선택 상태 제거
          const allImages = editorDOM.querySelectorAll("img.resizable-image");
          allImages.forEach((img) => {
            img.removeAttribute("data-selected");
            img.classList.remove("selected-image");
          });

          // 클릭된 이미지에 선택 상태 추가
          imageElement.setAttribute("data-selected", "true");
          imageElement.classList.add("selected-image");
          imageElement.style.position = "relative";

          // 이미지의 위치와 크기 정보 가져오기
          const rect = imageElement.getBoundingClientRect();
          const editorRect = editorDOM.getBoundingClientRect();

          // 리사이즈 핸들 생성
          const createHandle = (position: "top-left" | "bottom-right") => {
            const handle = document.createElement("div");
            handle.className = "resize-handle";
            handle.style.cssText = `
              position: fixed;
              width: 24px;
              height: 24px;
              background: #3b82f6;
              border: 3px solid white;
              border-radius: 50%;
              cursor: nw-resize;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
              z-index: 99999;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              color: white;
              font-weight: bold;
              user-select: none;
              pointer-events: auto;
            `;

            if (position === "top-left") {
              handle.style.top = `${rect.top - 12}px`;
              handle.style.left = `${rect.left - 12}px`;
              handle.textContent = "↖";
            } else {
              handle.style.top = `${rect.bottom - 12}px`;
              handle.style.left = `${rect.right - 12}px`;
              handle.textContent = "↘";
            }

            // 드래그 리사이즈 기능 추가
            let isDragging = false;
            let startX = 0;
            let startY = 0;
            let startWidth = 0;
            let startHeight = 0;

            const handleMouseDown = (e: MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();

              isDragging = true;
              startX = e.clientX;
              startY = e.clientY;

              // 이미지의 현재 크기 가져오기
              const imgRect = imageElement!.getBoundingClientRect();
              startWidth = imgRect.width;
              startHeight = imgRect.height;

              document.addEventListener("mousemove", handleMouseMove);
              document.addEventListener("mouseup", handleMouseUp);

              // 드래그 중 스타일
              handle.style.background = "#1d4ed8";
              document.body.style.cursor = "nw-resize";
              document.body.style.userSelect = "none";
            };

            const handleMouseMove = (e: MouseEvent) => {
              if (!isDragging) return;

              e.preventDefault();

              let newWidth = startWidth;
              let newHeight = startHeight;

              if (position === "bottom-right") {
                // 우하단 핸들: 크기 증가/감소
                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;
                newWidth = Math.max(50, startWidth + deltaX);
                newHeight = Math.max(50, startHeight + deltaY);
              } else {
                // 좌상단 핸들: 크기 증가/감소 (반대 방향)
                const deltaX = startX - e.clientX;
                const deltaY = startY - e.clientY;
                newWidth = Math.max(50, startWidth + deltaX);
                newHeight = Math.max(50, startHeight + deltaY);
              }

              // 이미지 크기 적용
              imageElement!.style.width = `${newWidth}px`;
              imageElement!.style.height = `${newHeight}px`;

              // 핸들 위치 업데이트
              const newRect = imageElement!.getBoundingClientRect();
              if (position === "top-left") {
                handle.style.top = `${newRect.top - 12}px`;
                handle.style.left = `${newRect.left - 12}px`;
                // 반대쪽 핸들도 업데이트
                const otherHandle = document.querySelector(
                  ".resize-handle:not(:first-child)",
                ) as HTMLElement;
                if (otherHandle) {
                  otherHandle.style.top = `${newRect.bottom - 12}px`;
                  otherHandle.style.left = `${newRect.right - 12}px`;
                }
              } else {
                handle.style.top = `${newRect.bottom - 12}px`;
                handle.style.left = `${newRect.right - 12}px`;
                // 반대쪽 핸들도 업데이트
                const otherHandle = document.querySelector(
                  ".resize-handle:first-child",
                ) as HTMLElement;
                if (otherHandle) {
                  otherHandle.style.top = `${newRect.top - 12}px`;
                  otherHandle.style.left = `${newRect.left - 12}px`;
                }
              }
            };

            const handleMouseUp = (e: MouseEvent) => {
              if (!isDragging) return;

              isDragging = false;

              document.removeEventListener("mousemove", handleMouseMove);
              document.removeEventListener("mouseup", handleMouseUp);

              // 드래그 종료 스타일 복원
              handle.style.background = "#3b82f6";
              document.body.style.cursor = "";
              document.body.style.userSelect = "";

              console.log("리사이즈 완료");
            };

            handle.addEventListener("mousedown", handleMouseDown);

            return handle;
          };

          // 핸들을 body에 직접 추가 (fixed 포지션이므로)
          const topLeftHandle = createHandle("top-left");
          const bottomRightHandle = createHandle("bottom-right");

          document.body.appendChild(topLeftHandle);
          document.body.appendChild(bottomRightHandle);

          console.log("리사이즈 핸들 추가됨");

          // 스크롤이나 리사이즈 시 핸들 위치 업데이트
          const updateHandlePositions = () => {
            const newRect = imageElement!.getBoundingClientRect();
            topLeftHandle.style.top = `${newRect.top - 12}px`;
            topLeftHandle.style.left = `${newRect.left - 12}px`;
            bottomRightHandle.style.top = `${newRect.bottom - 12}px`;
            bottomRightHandle.style.left = `${newRect.right - 12}px`;
          };

          // 스크롤 이벤트 리스너 추가
          window.addEventListener("scroll", updateHandlePositions);
          window.addEventListener("resize", updateHandlePositions);

          // 나중에 제거할 수 있도록 핸들에 이벤트 리스너 제거 함수 저장
          (topLeftHandle as any).updatePositions = updateHandlePositions;
          (bottomRightHandle as any).updatePositions = updateHandlePositions;
        }
      };

      // 에디터 영역 외부 클릭 시 선택 해제
      const handleOutsideClick = (event: Event) => {
        const target = event.target as HTMLElement;
        if (
          !target.closest(".resizable-image") &&
          !target.closest(".resize-handle")
        ) {
          // 모든 리사이즈 핸들 제거 (이벤트 리스너도 정리)
          const existingHandles = document.querySelectorAll(".resize-handle");
          existingHandles.forEach((handle) => {
            // 이벤트 리스너 제거
            const updateFn = (handle as any).updatePositions;
            if (updateFn) {
              window.removeEventListener("scroll", updateFn);
              window.removeEventListener("resize", updateFn);
            }
            handle.remove();
          });

          // 모든 이미지에서 선택 상태 제거
          const allImages = editorDOM.querySelectorAll("img.resizable-image");
          allImages.forEach((img) => {
            img.removeAttribute("data-selected");
            img.classList.remove("selected-image");
          });
        }
      };

      editorDOM.addEventListener("click", handleImageClick);
      document.addEventListener("click", handleOutsideClick);

      return () => {
        editorDOM.removeEventListener("click", handleImageClick);
        document.removeEventListener("click", handleOutsideClick);
      };
    }
  }, [editor]);

  const bodyRect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  // 초기 컨텐츠가 변경되면 에디터 내용 업데이트
  React.useEffect(() => {
    if (editor && contentIntroduction) {
      // 만약 현재 에디터 내용과 다르면 업데이트
      const currentContent = editor.getHTML();
      if (currentContent !== contentIntroduction) {
        editor.commands.setContent(contentIntroduction);
      }
    }
  }, [editor, contentIntroduction]);

  return (
    <EditorContext.Provider value={{ editor }}>
      <div
        className="editor-container"
        style={{
          width: "100%",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar
          ref={toolbarRef}
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "white",
            justifyContent: "flex-start",
          }}
          className="tiptap-toolbar"
        >
          {mobileView === "main" ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView("highlighter")}
              onLinkClick={() => setMobileView("link")}
              onTextColorClick={() => setMobileView("textColor")}
              isMobile={isMobile}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === "highlighter" ? "highlighter" : "link"}
              onBack={() => setMobileView("main")}
            />
          )}
        </Toolbar>

        <div className="content-wrapper">
          <EditorContent
            editor={editor}
            role="presentation"
            className="simple-editor-content"
          />
        </div>
      </div>
    </EditorContext.Provider>
  );
}
