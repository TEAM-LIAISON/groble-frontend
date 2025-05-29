"use client";

import * as React from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import { createPopper } from "@popperjs/core";

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
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";

// --- Custom Extensions ---
import { Link } from "@/components/(improvement)/editor/tiptap-extension/link-extension";
import { Selection } from "@/components/(improvement)/editor/tiptap-extension/selection-extension";
import { TrailingNode } from "@/components/(improvement)/editor/tiptap-extension/trailing-node-extension";

// --- UI Primitives ---
import { Button } from "@/components/(improvement)/editor/tiptap-ui-primitive/button";
import { Spacer } from "@/components/(improvement)/editor/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/(improvement)/editor/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/(improvement)/editor/tiptap-node/image-upload-node/image-upload-node-extension";
import "@/components/(improvement)/editor/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/(improvement)/editor/tiptap-node/list-node/list-node.scss";
import "@/components/(improvement)/editor/tiptap-node/image-node/image-node.scss";
import "@/components/(improvement)/editor/tiptap-node/paragraph-node/paragraph-node.scss";
import "@/components/(improvement)/editor/tiptap-node/table-node/table-node.scss";

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/(improvement)/editor/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/components/(improvement)/editor/tiptap-ui/image-upload-button";
import { ListDropdownMenu } from "@/components/(improvement)/editor/tiptap-ui/list-dropdown-menu";
import { BlockQuoteButton } from "@/components/(improvement)/editor/tiptap-ui/blockquote-button";
import { HorizontalRuleButton } from "@/components/(improvement)/editor/tiptap-ui/horizontal-rule-button";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from "@/components/(improvement)/editor/tiptap-ui/color-highlight-popover/color-highlight-popover";
import {
  TextColorPopover,
  TextColorPopoverContent,
  TextColorPopoverButton,
} from "@/components/(improvement)/editor/tiptap-ui/text-color-popover/text-color-popover";
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/components/(improvement)/editor/tiptap-ui/link-popover";
import { MarkButton } from "@/components/(improvement)/editor/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/(improvement)/editor/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/(improvement)/editor/tiptap-ui/undo-redo-button";

// --- Icons ---
import { ArrowLeftIcon } from "@/components/(improvement)/editor/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/components/(improvement)/editor/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/components/(improvement)/editor/tiptap-icons/link-icon";

// --- Hooks ---
import { useMobile } from "@/hooks/use-mobile";
import { useWindowSize } from "@/hooks/use-window-size";
import { useCursorVisibility } from "@/hooks/use-cursor-visibility";
import { useNewProductStore } from "@/features/products/register/store/useNewProductStore";

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

// --- Styles ---
import "@/components/(improvement)/editor/tiptap-templates/simple/simple-editor.scss";

import content from "@/components/(improvement)/editor/tiptap-templates/simple/data/content.json";
import ImageUploadExtension from "../../tiptap-extension/image-upload-extension";

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
  const { editor } = React.useContext(EditorContext);

  const insertTable = () => {
    if (editor) {
      editor.commands.insertTable({ rows: 3, cols: 3, withHeaderRow: true });
    }
  };

  const addColumnBefore = () => {
    if (editor) {
      editor.commands.addColumnBefore();
    }
  };

  const addColumnAfter = () => {
    if (editor) {
      editor.commands.addColumnAfter();
    }
  };

  const deleteColumn = () => {
    if (editor) {
      editor.commands.deleteColumn();
    }
  };

  const addRowBefore = () => {
    if (editor) {
      editor.commands.addRowBefore();
    }
  };

  const addRowAfter = () => {
    if (editor) {
      editor.commands.addRowAfter();
    }
  };

  const deleteRow = () => {
    if (editor) {
      editor.commands.deleteRow();
    }
  };

  const deleteTable = () => {
    if (editor) {
      editor.commands.deleteTable();
    }
  };

  const mergeCells = () => {
    if (editor) {
      editor.commands.mergeCells();
    }
  };

  const splitCell = () => {
    if (editor) {
      editor.commands.splitCell();
    }
  };

  const toggleHeaderColumn = () => {
    if (editor) {
      editor.commands.toggleHeaderColumn();
    }
  };

  const toggleHeaderRow = () => {
    if (editor) {
      editor.commands.toggleHeaderRow();
    }
  };

  const [tableMenuOpen, setTableMenuOpen] = React.useState(false);
  const isTableActive = editor?.isActive("table");
  const tableButtonRef = React.useRef<HTMLButtonElement>(null);
  const tableDropdownRef = React.useRef<HTMLDivElement>(null);

  // 테이블 메뉴 외부 클릭 시 닫기
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (tableMenuOpen && !target.closest(".relative.inline-block")) {
        setTableMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [tableMenuOpen]);

  // Popper.js 설정
  React.useEffect(() => {
    if (tableMenuOpen && tableButtonRef.current && tableDropdownRef.current) {
      const popperInstance = createPopper(
        tableButtonRef.current,
        tableDropdownRef.current,
        {
          placement: "bottom-start",
          strategy: "fixed",
          modifiers: [
            {
              name: "preventOverflow",
              options: {
                boundary: "viewport",
              },
            },
            {
              name: "flip",
              options: {
                fallbackPlacements: ["top-start", "bottom-end", "top-end"],
              },
            },
            {
              name: "offset",
              options: {
                offset: [0, 4],
              },
            },
          ],
        },
      );

      return () => {
        popperInstance.destroy();
      };
    }
  }, [tableMenuOpen]);

  const handleTableButtonClick = () => {
    setTableMenuOpen(!tableMenuOpen);
  };

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
        <div className="relative inline-block" style={{ overflow: "visible" }}>
          <Button
            data-style="ghost"
            data-state={isTableActive ? "active" : "inactive"}
            onClick={handleTableButtonClick}
            className="tiptap-button"
            ref={tableButtonRef}
          >
            <svg
              className="tiptap-button-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <path d="M3 9h18" stroke="currentColor" strokeWidth="2" />
              <path d="M3 15h18" stroke="currentColor" strokeWidth="2" />
              <path d="M9 3v18" stroke="currentColor" strokeWidth="2" />
              <path d="M15 3v18" stroke="currentColor" strokeWidth="2" />
            </svg>
          </Button>

          {tableMenuOpen && (
            <div
              className="tiptap-dropdown absolute top-full left-0 mt-1 min-w-[200px] rounded-md border border-gray-200 bg-white shadow-lg"
              style={{
                zIndex: 99999,
                position: "absolute",
                top: "100%",
                left: "0",
                marginTop: "4px",
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                minWidth: "200px",
              }}
              ref={tableDropdownRef}
              onMouseLeave={() => setTableMenuOpen(false)}
            >
              <div style={{ padding: "4px 0" }}>
                <button
                  onClick={() => {
                    insertTable();
                    setTableMenuOpen(false);
                  }}
                  className="w-full border-b border-gray-100 px-3 py-2 text-left text-sm hover:bg-gray-100"
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "8px 12px",
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                  }}
                >
                  📋 표 삽입 (3x3)
                </button>

                {isTableActive && (
                  <>
                    <div className="border-b border-gray-100 bg-gray-50 px-3 py-1 text-xs text-gray-500">
                      🏗️ 열 관리
                    </div>
                    <button
                      onClick={() => {
                        addColumnBefore();
                        setTableMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                    >
                      ⬅️ 열 앞에 추가
                    </button>
                    <button
                      onClick={() => {
                        addColumnAfter();
                        setTableMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                    >
                      ➡️ 열 뒤에 추가
                    </button>
                    <button
                      onClick={() => {
                        deleteColumn();
                        setTableMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                    >
                      🗑️ 열 삭제
                    </button>

                    <div className="border-t border-b border-gray-100 bg-gray-50 px-3 py-1 text-xs text-gray-500">
                      📐 행 관리
                    </div>
                    <button
                      onClick={() => {
                        addRowBefore();
                        setTableMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                    >
                      ⬆️ 행 위에 추가
                    </button>
                    <button
                      onClick={() => {
                        addRowAfter();
                        setTableMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                    >
                      ⬇️ 행 아래에 추가
                    </button>
                    <button
                      onClick={() => {
                        deleteRow();
                        setTableMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                    >
                      🗑️ 행 삭제
                    </button>

                    <div className="border-t border-b border-gray-100 bg-gray-50 px-3 py-1 text-xs text-gray-500">
                      🔗 셀 관리
                    </div>
                    <button
                      onClick={() => {
                        mergeCells();
                        setTableMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                    >
                      🔗 셀 병합
                    </button>
                    <button
                      onClick={() => {
                        splitCell();
                        setTableMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                    >
                      ✂️ 셀 분할
                    </button>

                    <div className="border-t border-b border-gray-100 bg-gray-50 px-3 py-1 text-xs text-gray-500">
                      📊 헤더 설정
                    </div>
                    <button
                      onClick={() => {
                        toggleHeaderRow();
                        setTableMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                    >
                      📊 헤더 행 토글
                    </button>
                    <button
                      onClick={() => {
                        toggleHeaderColumn();
                        setTableMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                    >
                      📈 헤더 열 토글
                    </button>

                    <button
                      onClick={() => {
                        deleteTable();
                        setTableMenuOpen(false);
                      }}
                      className="bg-red-25 w-full border-t-2 border-red-200 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                      style={{
                        marginTop: "8px",
                        fontWeight: "bold",
                      }}
                    >
                      🗑️ 표 전체 삭제
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
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
  type: "main" | "highlighter" | "link" | "textColor";
  onBack: () => void;
}) => (
  <>
    <ToolbarGroup className="tiptap-toolbar-group">
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" && (
          <HighlighterIcon className="tiptap-button-icon" />
        )}
        {type === "link" && <LinkIcon className="tiptap-button-icon" />}
        {type === "textColor" && <LinkIcon className="tiptap-button-icon" />}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" && <ColorHighlightPopoverContent />}
    {type === "textColor" && <TextColorPopoverContent />}
    {type === "link" && <LinkContent />}
  </>
);

export function SimpleEditor() {
  const isMobile = useMobile();
  const windowSize = useWindowSize();
  const [mobileView, setMobileView] = React.useState<
    "main" | "highlighter" | "link" | "textColor"
  >("main");
  const [tableContextMenuOpen, setTableContextMenuOpen] = React.useState(false);
  const [contextMenuPosition, setContextMenuPosition] = React.useState({
    x: 0,
    y: 0,
  });
  const tableContextRef = React.useRef<HTMLDivElement>(null);
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
        contextmenu: (view, event) => {
          // 표 내부에서 우클릭 시 컨텍스트 메뉴 표시
          const target = event.target as HTMLElement;
          const tableCell = target.closest("td, th");

          if (tableCell && editor?.isActive("table")) {
            event.preventDefault();
            setContextMenuPosition({ x: event.clientX, y: event.clientY });
            setTableContextMenuOpen(true);
            return true;
          }
          return false;
        },
      },
    },
    extensions: [
      StarterKit.configure({
        hardBreak: {
          HTMLAttributes: {
            class: "hard-break",
          },
          keepMarks: false,
        },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: "tiptap-image resizable-image",
        },
      }).extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            width: {
              default: null,
              parseHTML: (element) => element.getAttribute("width"),
              renderHTML: (attributes) => {
                if (!attributes.width) {
                  return {};
                }
                return {
                  width: attributes.width,
                };
              },
            },
            height: {
              default: null,
              parseHTML: (element) => element.getAttribute("height"),
              renderHTML: (attributes) => {
                if (!attributes.height) {
                  return {};
                }
                return {
                  height: attributes.height,
                };
              },
            },
          };
        },
      }),
      Typography,
      HorizontalRule,
      // 텍스트 스타일과 색상 기능 추가 (핵심)
      TextStyle,
      Color.configure({
        types: [TextStyle.name],
      }),
      // 표 기능 추가
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "table-node",
        },
        allowTableNodeSelection: true,
      }),
      TableRow,
      TableHeader,
      TableCell,

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
      ImageUploadExtension.configure({
        allowedTypes: ["image/"],
        maxFileSize: 10 * 1024 * 1024, // 10MB
        uploadingText: "이미지 업로드 중...",
        onError: (error: Error) => {
          console.error("이미지 업로드 오류:", error);
          // 추후 Toast나 알림으로 사용자에게 알림 표시 가능
        },
        onUploadStart: () => {},
        onUploadComplete: () => {},
      }),
    ],
    content: contentIntroduction || content,
    onUpdate: ({ editor }) => {
      // 에디터 내용이 변경될 때마다 스토어에 저장
      const html = editor.getHTML();
      setContentIntroduction(html);

      // 디버깅: 현재 에디터 내 이미지 확인
      const images = editor.view.dom.querySelectorAll("img");

      // 이미지 인라인 스타일만 제거 (width/height 속성은 유지)
      editor.view.dom.querySelectorAll("img.resizable-image").forEach((img) => {
        const imageElement = img as HTMLImageElement;
        // style 속성만 제거하여 인라인 스타일 클리어 (width/height 속성은 유지)
        imageElement.removeAttribute("style");
      });

      // 내용 변경 시 높이 자동 조정
      if (editor.view && editor.view.dom) {
        const editorDOM = editor.view.dom;
        editorDOM.style.height = "auto";
        editorDOM.style.minHeight = "500px";
      }
    },
  });

  // 에디터 마운트 후 이미지 리사이즈 핸들러 설정
  React.useEffect(() => {
    if (!editor || !editor.view) return;

    const editorDOM = editor.view.dom as HTMLElement;
    editorDOM.style.height = "auto";
    editorDOM.style.minHeight = "500px";
    editorDOM.style.overflow = "visible";

    // 부모 요소도 auto height로 설정
    if (editorDOM.parentElement) {
      editorDOM.parentElement.style.height = "auto";
      editorDOM.parentElement.style.minHeight = "500px";
      editorDOM.parentElement.style.overflow = "visible";
    }

    // 이미지 리사이즈 핸들러
    let activeImage: HTMLImageElement | null = null;
    let resizeHandles: HTMLElement[] = [];
    // 리사이즈 상태 변수들을 useEffect 최상단으로 이동
    let startImageWidth = 0;
    let startImageHeight = 0;
    let aspectRatio = 0;

    // 모든 핸들 제거
    const removeAllHandles = () => {
      resizeHandles.forEach((handle) => {
        if (handle.parentNode) {
          handle.parentNode.removeChild(handle);
        }
      });
      resizeHandles = [];
      activeImage = null;
    };

    // 이미지에 핸들 추가
    const addHandlesToImage = (img: HTMLImageElement) => {
      removeAllHandles();
      activeImage = img;

      // 이미지에 선택 스타일 추가
      img.style.outline = "2px solid #3b82f6";
      img.style.outlineOffset = "2px";

      // 핸들 위치 정의 - 6개로 확장 (꼭짓점 4개 + 좌우 중앙 2개)
      const handlePositions = [
        { name: "top-left", cursor: "nw-resize" },
        { name: "top-right", cursor: "ne-resize" },
        { name: "bottom-left", cursor: "sw-resize" },
        { name: "bottom-right", cursor: "se-resize" },
        { name: "middle-left", cursor: "w-resize" },
        { name: "middle-right", cursor: "e-resize" },
      ];

      // 핸들 위치 업데이트 함수
      const updateHandlePositions = () => {
        const rect = img.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft =
          window.pageXOffset || document.documentElement.scrollLeft;

        resizeHandles.forEach((handle, index) => {
          const pos = handlePositions[index];
          let top = 0;
          let left = 0;

          switch (pos.name) {
            case "top-left":
              top = rect.top + scrollTop - 6;
              left = rect.left + scrollLeft - 6;
              break;
            case "top-right":
              top = rect.top + scrollTop - 6;
              left = rect.right + scrollLeft - 6;
              break;
            case "bottom-left":
              top = rect.bottom + scrollTop - 6;
              left = rect.left + scrollLeft - 6;
              break;
            case "bottom-right":
              top = rect.bottom + scrollTop - 6;
              left = rect.right + scrollLeft - 6;
              break;
            case "middle-left":
              top = rect.top + scrollTop + rect.height / 2 - 6; // 세로 중앙
              left = rect.left + scrollLeft - 6;
              break;
            case "middle-right":
              top = rect.top + scrollTop + rect.height / 2 - 6; // 세로 중앙
              left = rect.right + scrollLeft - 6;
              break;
          }

          handle.style.top = top + "px";
          handle.style.left = left + "px";
        });
      };

      // 각 위치에 핸들 생성
      handlePositions.forEach((pos, index) => {
        const handle = document.createElement("div");
        handle.className = "image-resize-handle";
        handle.setAttribute("data-position", pos.name);

        // 핸들 스타일
        handle.style.cssText = `
          position: absolute;
          width: 12px;
          height: 12px;
          background: white;
          border: 2px solid #3b82f6;
          border-radius: 50%;
          cursor: ${pos.cursor};
          z-index: 10000;
          user-select: none;
          pointer-events: auto;
        `;

        document.body.appendChild(handle);
        resizeHandles.push(handle);

        // 드래그 이벤트
        let isDragging = false;
        let startMouseX = 0;
        let startMouseY = 0;

        const handleMouseDown = (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();

          isDragging = true;
          startMouseX = e.clientX;
          startMouseY = e.clientY;

          const imgRect = img.getBoundingClientRect();
          startImageWidth = imgRect.width;
          startImageHeight = imgRect.height;
          aspectRatio = startImageWidth / startImageHeight;

          document.addEventListener("mousemove", handleMouseMove);
          document.addEventListener("mouseup", handleMouseUp);
          document.body.style.userSelect = "none";
        };

        const handleMouseMove = (e: MouseEvent) => {
          if (!isDragging) return;

          e.preventDefault();

          const deltaX = e.clientX - startMouseX;
          const deltaY = e.clientY - startMouseY;

          // 리사이즈 민감도 조정 - 큰 이미지일수록 더 빠르게 리사이즈
          const baseSensitivity = 0.5; // 기본 민감도
          const imageSizeBonus =
            Math.max(startImageWidth, startImageHeight) > 400 ? 6.0 : 0.5; // 큰 이미지 보너스
          const sensitivity = baseSensitivity * imageSizeBonus;

          const adjustedDeltaX = deltaX * sensitivity;
          const adjustedDeltaY = deltaY * sensitivity;

          let newWidth = startImageWidth;
          let newHeight = startImageHeight;

          // 세로 긴 이미지 (세로 비율 > 1) 처리
          const isPortraitImage = startImageHeight > startImageWidth;

          // 위치별 리사이즈 로직
          switch (pos.name) {
            case "bottom-right":
              if (isPortraitImage) {
                newHeight = Math.max(50, startImageHeight + adjustedDeltaY);
                newWidth = newHeight * aspectRatio;
              } else {
                newWidth = Math.max(50, startImageWidth + adjustedDeltaX);
                newHeight = newWidth / aspectRatio;
              }
              break;
            case "bottom-left":
              if (isPortraitImage) {
                newHeight = Math.max(50, startImageHeight + adjustedDeltaY);
                newWidth = newHeight * aspectRatio;
              } else {
                newWidth = Math.max(50, startImageWidth - adjustedDeltaX);
                newHeight = newWidth / aspectRatio;
              }
              break;
            case "top-right":
              if (isPortraitImage) {
                newHeight = Math.max(50, startImageHeight - adjustedDeltaY);
                newWidth = newHeight * aspectRatio;
              } else {
                newHeight = Math.max(50, startImageHeight - adjustedDeltaY);
                newWidth = newHeight * aspectRatio;
              }
              break;
            case "top-left":
              if (isPortraitImage) {
                newHeight = Math.max(50, startImageHeight - adjustedDeltaY);
                newWidth = newHeight * aspectRatio;
              } else {
                newWidth = Math.max(50, startImageWidth - adjustedDeltaX);
                newHeight = newWidth / aspectRatio;
              }
              break;
            case "middle-left":
              newWidth = Math.max(50, startImageWidth - adjustedDeltaX);
              newHeight = newWidth / aspectRatio;
              break;
            case "middle-right":
              newWidth = Math.max(50, startImageWidth + adjustedDeltaX);
              newHeight = newWidth / aspectRatio;
              break;
          }

          // 최대 크기 제한 - maxHeight 제한 제거
          const maxWidth = window.innerWidth * 0.9;

          if (newWidth > maxWidth) {
            newWidth = maxWidth;
            newHeight = newWidth / aspectRatio;
          }

          // 이미지 크기 적용
          img.style.setProperty("width", newWidth + "px", "important");
          img.style.setProperty("height", newHeight + "px", "important");
          img.style.setProperty("max-width", "none", "important");
          img.style.setProperty("max-height", "none", "important");

          // 속성으로도 설정
          img.setAttribute("width", Math.round(newWidth).toString());
          img.setAttribute("height", Math.round(newHeight).toString());

          // 핸들 위치 업데이트
          updateHandlePositions();
        };

        const handleMouseUp = () => {
          isDragging = false;
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
          document.body.style.userSelect = "";

          // 리사이즈 완료 시 에디터 상태에 width/height 반영
          if (activeImage && editor) {
            const newWidth = Math.round(activeImage.clientWidth);
            const newHeight = Math.round(activeImage.clientHeight);

            // Tiptap 에디터의 이미지 노드 속성 업데이트
            editor
              .chain()
              .focus()
              .updateAttributes("image", { width: newWidth, height: newHeight })
              .run();
          }
        };

        handle.addEventListener("mousedown", handleMouseDown);
      });

      // 초기 핸들 위치 설정
      updateHandlePositions();

      // 스크롤/리사이즈 시 핸들 위치 동기화
      const syncPositions = () => updateHandlePositions();
      window.addEventListener("scroll", syncPositions);
      window.addEventListener("resize", syncPositions);

      // cleanup 함수를 핸들에 저장
      resizeHandles.forEach((handle) => {
        const handleWithCleanup = handle as HTMLElement & {
          cleanup?: () => void;
        };
        handleWithCleanup.cleanup = () => {
          window.removeEventListener("scroll", syncPositions);
          window.removeEventListener("resize", syncPositions);
        };
      });
    };

    // 이미지 클릭 이벤트 핸들러
    const handleImageClick = (e: Event) => {
      const target = e.target as HTMLElement;

      if (
        target.tagName === "IMG" &&
        target.classList.contains("resizable-image")
      ) {
        e.preventDefault();
        e.stopPropagation();
        addHandlesToImage(target as HTMLImageElement);
      }
    };

    // 외부 클릭 시 핸들 제거
    const handleOutsideClick = (e: Event) => {
      const target = e.target as HTMLElement;

      if (
        !target.closest(".resizable-image") &&
        !target.closest(".image-resize-handle")
      ) {
        removeAllHandles();

        // 모든 이미지의 outline 제거
        editor.view.dom
          .querySelectorAll("img.resizable-image")
          .forEach((img) => {
            (img as HTMLElement).style.outline = "";
            (img as HTMLElement).style.outlineOffset = "";
          });
      }
    };

    // 이벤트 리스너 등록
    editor.view.dom.addEventListener("click", handleImageClick);
    document.addEventListener("click", handleOutsideClick);

    return () => {
      editor.view.dom.removeEventListener("click", handleImageClick);
      document.removeEventListener("click", handleOutsideClick);

      // cleanup 함수 호출
      resizeHandles.forEach((handle) => {
        const handleWithCleanup = handle as HTMLElement & {
          cleanup?: () => void;
        };
        if (handleWithCleanup.cleanup) {
          handleWithCleanup.cleanup();
        }
      });

      removeAllHandles();
    };
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

  // 표 컨텍스트 메뉴 외부 클릭 시 닫기
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tableContextMenuOpen &&
        tableContextRef.current &&
        !tableContextRef.current.contains(event.target as Node)
      ) {
        setTableContextMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [tableContextMenuOpen]);

  // 초기 컨텐츠가 변경되면 에디터 내용 업데이트
  React.useEffect(() => {
    if (editor && contentIntroduction) {
      // 만약 현재 에디터 내용과 다르면 업데이트
      const currentContent = editor.getHTML();
      if (currentContent !== contentIntroduction) {
        editor.commands.setContent(contentIntroduction);

        // 콘텐츠 설정 후 이미지 상태 확인
        setTimeout(() => {
          const images = editor.view.dom.querySelectorAll("img");
        }, 100);
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
            overflow: "visible",
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
              type={mobileView}
              onBack={() => setMobileView("main")}
            />
          )}
        </Toolbar>

        <div className="content-wrapper p-5">
          <EditorContent
            editor={editor}
            role="presentation"
            className="simple-editor-content"
          />
        </div>

        {/* 표 컨텍스트 메뉴 */}
        {tableContextMenuOpen && (
          <div
            ref={tableContextRef}
            className="tiptap-dropdown fixed min-w-[180px] rounded-md border border-gray-200 bg-white shadow-lg"
            style={{
              left: contextMenuPosition.x,
              top: contextMenuPosition.y,
              zIndex: 999999,
            }}
            onMouseLeave={() => setTableContextMenuOpen(false)}
          >
            <div style={{ padding: "4px 0" }}>
              <div className="border-b border-gray-100 bg-gray-50 px-3 py-1 text-xs text-gray-500">
                🏗️ 열 관리
              </div>
              <button
                onClick={() => {
                  editor?.commands.addColumnBefore();
                  setTableContextMenuOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
              >
                ⬅️ 열 앞에 추가
              </button>
              <button
                onClick={() => {
                  editor?.commands.addColumnAfter();
                  setTableContextMenuOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
              >
                ➡️ 열 뒤에 추가
              </button>
              <button
                onClick={() => {
                  editor?.commands.deleteColumn();
                  setTableContextMenuOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
              >
                🗑️ 열 삭제
              </button>

              <div className="border-t border-b border-gray-100 bg-gray-50 px-3 py-1 text-xs text-gray-500">
                📐 행 관리
              </div>
              <button
                onClick={() => {
                  editor?.commands.addRowBefore();
                  setTableContextMenuOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
              >
                ⬆️ 행 위에 추가
              </button>
              <button
                onClick={() => {
                  editor?.commands.addRowAfter();
                  setTableContextMenuOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
              >
                ⬇️ 행 아래에 추가
              </button>
              <button
                onClick={() => {
                  editor?.commands.deleteRow();
                  setTableContextMenuOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
              >
                🗑️ 행 삭제
              </button>

              <button
                onClick={() => {
                  editor?.commands.deleteTable();
                  setTableContextMenuOpen(false);
                }}
                className="w-full border-t-2 border-red-200 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                style={{ marginTop: "8px", fontWeight: "bold" }}
              >
                🗑️ 표 전체 삭제
              </button>
            </div>
          </div>
        )}
      </div>
    </EditorContext.Provider>
  );
}
