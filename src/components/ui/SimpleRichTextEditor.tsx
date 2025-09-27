"use client";

import React, { useRef, useCallback, useState, useEffect } from "react";
import { useIsClient } from "@/lib/utils/hydration-safe";

interface SimpleRichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SimpleRichTextEditor: React.FC<SimpleRichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Enter your message...",
  className = "",
}) => {
  const isClient = useIsClient();
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Update editor content when value prop changes
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onChange(content);
    }
  }, [onChange]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const execCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    handleInput();
  }, [handleInput]);

  const ToolbarButton = ({
    command,
    icon,
    title,
    value
  }: {
    command: string;
    icon: string;
    title: string;
    value?: string;
  }) => (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => execCommand(command, value)}
      className="p-2 text-gray-400 transition-colors rounded hover:text-white hover:bg-gray-700"
      title={title}
    >
      {icon}
    </button>
  );

  if (!isClient) {
    return (
      <div className="w-full h-[200px] bg-gray-800 border border-gray-600 rounded-md flex items-center justify-center">
        <div className="text-gray-400">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className={`simple-rich-text-editor ${className}`} suppressHydrationWarning>
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 bg-gray-800 border border-b-0 border-gray-600 rounded-t-md">
        <ToolbarButton command="bold" icon="B" title="Bold" />
        <ToolbarButton command="italic" icon="I" title="Italic" />
        <ToolbarButton command="underline" icon="U" title="Underline" />
        <div className="w-px h-6 mx-1 bg-gray-600" />
        <ToolbarButton command="formatBlock" icon="H1" title="Heading 1" value="h1" />
        <ToolbarButton command="formatBlock" icon="H2" title="Heading 2" value="h2" />
        <ToolbarButton command="formatBlock" icon="P" title="Paragraph" value="p" />
        <div className="w-px h-6 mx-1 bg-gray-600" />
        <ToolbarButton command="insertUnorderedList" icon="•" title="Bullet List" />
        <ToolbarButton command="insertOrderedList" icon="1." title="Numbered List" />
        <div className="w-px h-6 mx-1 bg-gray-600" />
        <ToolbarButton command="justifyLeft" icon="⇤" title="Align Left" />
        <ToolbarButton command="justifyCenter" icon="⇔" title="Align Center" />
        <ToolbarButton command="justifyRight" icon="⇥" title="Align Right" />
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`
          w-full min-h-[150px] p-3 bg-gray-800 border border-gray-600 rounded-b-md
          text-white placeholder-gray-400 focus:outline-none focus:border-blue-500
          ${isFocused ? 'border-blue-500' : ''}
        `}
        style={{
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
        }}
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />

      <style jsx>{`
        .simple-rich-text-editor [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }

        .simple-rich-text-editor h1 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0.5rem 0;
        }

        .simple-rich-text-editor h2 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0.5rem 0;
        }

        .simple-rich-text-editor p {
          margin: 0.5rem 0;
        }

        .simple-rich-text-editor ul,
        .simple-rich-text-editor ol {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
        }

        .simple-rich-text-editor strong {
          font-weight: bold;
        }

        .simple-rich-text-editor em {
          font-style: italic;
        }

        .simple-rich-text-editor u {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default SimpleRichTextEditor;
