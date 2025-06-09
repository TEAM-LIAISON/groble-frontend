"use client";

import * as React from "react";
import { type Editor } from "@tiptap/react";

// --- Hooks ---
import { useMenuNavigation } from "@/hooks/use-menu-navigation";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";

// --- Icons ---
import {
  BanIcon,
  TextColorIcon,
} from "@/components/(improvement)/editor/tiptap-icons";

// --- UI Primitives ---
import type { ButtonProps } from "@/components/(improvement)/editor/tiptap-ui-primitive/button";
import { Button } from "@/components/(improvement)/editor/tiptap-ui-primitive/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/(improvement)/editor/tiptap-ui-primitive/popover";
import { Separator } from "@/components/(improvement)/editor/tiptap-ui-primitive/separator";

export interface TextColorPopoverColor {
  label: string;
  value: string;
}

export interface TextColorPopoverContentProps {
  editor?: Editor | null;
  colors?: TextColorPopoverColor[];
  onClose?: () => void;
}

export interface TextColorPopoverProps extends Omit<ButtonProps, "type"> {
  /** The TipTap editor instance. */
  editor?: Editor | null;
  /** The text colors to display in the popover. */
  colors?: TextColorPopoverColor[];
}

export const DEFAULT_TEXT_COLORS: TextColorPopoverColor[] = [
  // 그레이스케일 색상
  {
    label: "진한 회색",
    value: "#171717",
  },
  {
    label: "중간 회색",
    value: "#878A93",
  },
  {
    label: "연한 회색",
    value: "#C2C4C8",
  },
  // 퍼플 계열 색상
  {
    label: "진한 보라",
    value: "#3A16C9",
  },
  {
    label: "중간 보라",
    value: "#7D5EF7",
  },
  {
    label: "연한 보라",
    value: "#C0B0FF",
  },
  // 그린/틸 계열 색상
  {
    label: "진한 초록",
    value: "#008660",
  },
  {
    label: "중간 초록",
    value: "#03E7A6",
  },
  {
    label: "연한 초록",
    value: "#58FFD0",
  },
];

export const TextColorPopoverButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, children, ...props }, ref) => (
  <Button
    type="button"
    className={className}
    data-style="ghost"
    data-appearance="default"
    role="button"
    tabIndex={-1}
    aria-label="텍스트 색상 변경"
    tooltip="텍스트 색상"
    ref={ref}
    {...props}
  >
    {children || <TextColorIcon className="tiptap-button-icon" />}
  </Button>
));

TextColorPopoverButton.displayName = "TextColorPopoverButton";

// TextColorButton에서 수정
export function TextColorButton({
  editor,
  color,
  onClose,
  ...props
}: ButtonProps & {
  editor?: Editor | null;
  color: string;
  onClose?: () => void;
}) {
  // TextColorButton에서 수정 - HTML 생성 확인
  const handleClick = React.useCallback(() => {
    if (!editor) return;

    try {
      const result = editor.chain().focus().setColor(color).run();

      // HTML 확인 (중요!)
      setTimeout(() => {
        const html = editor.getHTML();

        // DOM에서 실제 스타일 확인
        const styledElements =
          editor.view.dom.querySelectorAll('[style*="color"]');
      }, 200);
    } catch (error) {
      console.error("❌ 색상 적용 오류:", error);
    }
  }, [editor, color, onClose]);

  return (
    <Button
      type="button"
      role="menuitem"
      data-style="ghost"
      onClick={handleClick} // 직접 handleClick 호출
      {...props}
    >
      <span
        className="tiptap-color-button"
        style={{
          backgroundColor: color,
          width: "24px",
          height: "24px",
          borderRadius: "4px",
          display: "block",
        }}
      />
    </Button>
  );
}

export function TextColorPopoverContent({
  editor: providedEditor,
  colors = DEFAULT_TEXT_COLORS,
  onClose,
}: TextColorPopoverContentProps) {
  const editor = useTiptapEditor(providedEditor);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const removeColor = React.useCallback(() => {
    if (!editor) return;
    editor.chain().focus().unsetColor().run();
    onClose?.();
  }, [editor, onClose]);

  const menuItems = React.useMemo(
    () => [...colors, { label: "색상 제거", value: "none" }],
    [colors],
  );

  const { selectedIndex } = useMenuNavigation({
    containerRef,
    items: menuItems,
    orientation: "both",
    onSelect: (item) => {
      if (item.value === "none") {
        removeColor();
      }
      onClose?.();
    },
    onClose,
    autoSelectFirstItem: false,
  });

  return (
    <div
      ref={containerRef}
      className="tiptap-color-content"
      tabIndex={0}
      style={{
        width: "auto",
        minWidth: "200px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "8px",
      }}
    >
      <div
        className="tiptap-button-group"
        data-orientation="horizontal"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "8px",
        }}
      >
        {colors.map((color, index) => (
          <TextColorButton
            key={color.value}
            editor={editor}
            color={color.value}
            onClose={onClose} // onClose 전달
            aria-label={`${color.label} 텍스트 색상`}
            tabIndex={index === selectedIndex ? 0 : -1}
            data-highlighted={selectedIndex === index}
          />
        ))}
      </div>

      <Separator />

      <div className="tiptap-button-group">
        <Button
          onClick={removeColor}
          aria-label="색상 제거"
          tabIndex={selectedIndex === colors.length ? 0 : -1}
          type="button"
          role="menuitem"
          data-style="ghost"
          data-highlighted={selectedIndex === colors.length}
        >
          <BanIcon className="tiptap-button-icon" />
        </Button>
      </div>
    </div>
  );
}

export function TextColorPopover({
  editor: providedEditor,
  colors = DEFAULT_TEXT_COLORS,
  ...props
}: TextColorPopoverProps) {
  const editor = useTiptapEditor(providedEditor);
  const [isOpen, setIsOpen] = React.useState(false);

  if (!editor || !editor.isEditable) {
    return null;
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <TextColorPopoverButton {...props} />
      </PopoverTrigger>

      <PopoverContent
        aria-label="텍스트 색상"
        style={{ width: "auto", minWidth: "200px" }}
      >
        <TextColorPopoverContent
          editor={editor}
          colors={colors}
          onClose={() => setIsOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
}

export default TextColorPopover;
