"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useIsClient } from "@/lib/utils/hydration-safe";

// Dynamically import MDEditor to avoid SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[200px] bg-gray-800 border border-gray-600 rounded-md flex items-center justify-center">
      <div className="text-gray-400">Loading editor...</div>
    </div>
  )
});

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Enter your message...",
  className = "",
}) => {
  const isClient = useIsClient();
  const [isEditorReady, setIsEditorReady] = useState(false);

  // Additional check for editor readiness
  useEffect(() => {
    if (isClient) {
      // Small delay to ensure DOM is fully ready
      const timer = setTimeout(() => {
        setIsEditorReady(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isClient]);

  const handleChange = (val?: string) => {
    onChange(val || "");
  };

  // Show loading state during SSR and initial client render
  if (!isClient || !isEditorReady) {
    return (
      <div className="w-full h-[200px] bg-gray-800 border border-gray-600 rounded-md flex items-center justify-center">
        <div className="text-gray-400">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className={`rich-text-editor ${className}`} suppressHydrationWarning>
      <MDEditor
        value={value}
        onChange={handleChange}
        preview="edit"
        hideToolbar={false}
        visibleDragbar={false}
        textareaProps={{
          placeholder,
          style: {
            fontSize: 14,
            lineHeight: 1.5,
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          },
        }}
        height={200}
        data-color-mode="dark"
        style={{
          backgroundColor: '#1f2937',
        }}
      />

      <style jsx global>{`
        .w-md-editor {
          background-color: #1f2937 !important;
          border: 1px solid #4b5563 !important;
        }

        .w-md-editor-text-pre,
        .w-md-editor-text-input,
        .w-md-editor-text,
        .w-md-editor-text-area {
          background-color: #1f2937 !important;
          color: #f9fafb !important;
          border: 1px solid #4b5563 !important;
          font-size: 14px !important;
          line-height: 1.5 !important;
        }

        .w-md-editor-text-input,
        .w-md-editor-text-area {
          color: #f9fafb !important;
          caret-color: #f9fafb !important;
        }

        .w-md-editor-text-input::placeholder,
        .w-md-editor-text-area::placeholder {
          color: #9ca3af !important;
        }

        .w-md-editor-toolbar {
          background-color: #374151 !important;
          border-bottom: 1px solid #4b5563 !important;
        }

        .w-md-editor-toolbar ul > li button {
          color: #d1d5db !important;
        }

        .w-md-editor-toolbar ul > li button:hover {
          background-color: #4b5563 !important;
          color: #f9fafb !important;
        }

        .w-md-editor-focus {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 1px #3b82f6 !important;
        }

        .w-md-editor-text-pre .token.title {
          color: #60a5fa !important;
        }

        .w-md-editor-text-pre .token.bold {
          color: #fbbf24 !important;
          font-weight: bold;
        }

        .w-md-editor-text-pre .token.code {
          color: #34d399 !important;
        }

        .w-md-editor-text-pre .token.italic {
          color: #a78bfa !important;
          font-style: italic;
        }

        /* Ensure text is visible in all states */
        .w-md-editor * {
          color: inherit !important;
        }

        .w-md-editor textarea {
          color: #f9fafb !important;
          background-color: #1f2937 !important;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
