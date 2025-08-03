'use client';

import type { Editor } from '@tiptap/react';
import * as React from 'react';

// --- Hooks ---
import { useTiptapEditor } from '@/hooks/use-tiptap-editor';

// --- Icons ---
import { HorizontalRuleIcon } from '@/components/(improvement)/editor/tiptap-icons/horizontal-rule-icon';

// --- UI Primitives ---
import type { ButtonProps } from '@/components/(improvement)/editor/tiptap-ui-primitive/button';
import { Button } from '@/components/(improvement)/editor/tiptap-ui-primitive/button';

export interface HorizontalRuleButtonProps extends Omit<ButtonProps, 'type'> {
  editor?: Editor | null;
}

export function HorizontalRuleButton({
  editor: providedEditor,
  ...props
}: HorizontalRuleButtonProps) {
  const editor = useTiptapEditor(providedEditor);

  const isDisabled = React.useMemo(() => {
    if (!editor) return true;

    // Check if the editor is in a context where horizontal rule is not allowed
    const isInCompatibleContext =
      editor.isActive('code') ||
      editor.isActive('codeBlock') ||
      editor.isActive('imageUpload');

    return isInCompatibleContext || !editor.isEditable;
  }, [editor]);

  const handleClick = React.useCallback(() => {
    if (!editor) return;
    editor.chain().focus().setHorizontalRule().run();
  }, [editor]);

  if (!editor) return null;

  return (
    <Button
      type="button"
      data-style="ghost"
      data-appearance="default"
      onClick={handleClick}
      disabled={isDisabled}
      role="button"
      tabIndex={-1}
      aria-label="Insert horizontal rule"
      tooltip="Horizontal rule"
      {...props}
    >
      <HorizontalRuleIcon className="tiptap-button-icon" />
    </Button>
  );
}

export default HorizontalRuleButton;
