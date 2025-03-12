import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import HardBreak from "@tiptap/extension-hard-break";
import { FaAlignCenter } from "react-icons/fa";
import { FaAlignLeft } from "react-icons/fa";
import { FaAlignRight } from "react-icons/fa";

const TextEditor = ({ content, handleContentChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      HardBreak.configure({
        keepMarks: true, // Keeps formatting like bold/italic when breaking a line
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      handleContentChange(editor.getHTML());
    },
  });

  if (!editor) return null; // Prevents errors before the editor is initialized

  return (
    <div className="border border-base-100 p-4 rounded-lg shadow-lg">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-2 p-2 border-b">
        {/* Formatting */}
        <div className="flex flex-wrap gap-2 mb-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-3 py-1 rounded ${
              editor.isActive("bold")
                ? "bg-base-300 border-2 border-base-00"
                : "px-3 bg-base-200 hover:bg-base-300 hover:shadow-md"
            }`}
          >
            <strong>B</strong>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-3 py-1 rounded ${
              editor.isActive("italic")
                ? "bg-base-300 border-2 border-base-00"
                : "px-3 bg-base-200 hover:bg-base-300 hover:shadow-md"
            }`}
          >
            <em>I</em>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`px-3 py-1 rounded ${
              editor.isActive("strike")
                ? "bg-base-300 border-2 border-base-00"
                : "px-3 bg-base-200 hover:bg-base-300 hover:shadow-md"
            }`}
          >
            <s>S</s>
          </button>

          {/* Headings */}
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`px-3 py-1 rounded ${
              editor.isActive("heading", { level: 1 })
                ? "bg-base-300 border-2 border-base-00"
                : "px-3 bg-base-200 hover:bg-base-300 hover:shadow-md"
            }`}
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-3 py-1 rounded ${
              editor.isActive("heading", { level: 2 })
                ? "bg-base-300 border-2 border-base-00"
                : "px-3 bg-base-200 hover:bg-base-300 hover:shadow-md"
            }`}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`px-3 py-1 rounded ${
              editor.isActive("heading", { level: 3 })
                ? "bg-base-300 border-2 border-base-00"
                : "px-3 bg-base-200 hover:bg-base-300 hover:shadow-md"
            }`}
          >
            H3
          </button>

          {/* Alignment */}
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className="px-3 bg-base-200 hover:bg-base-300 hover:shadow-md"
          >
            <FaAlignLeft />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className="px-3 bg-base-200 hover:bg-base-300 hover:shadow-md"
          >
            <FaAlignCenter />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className="px-3 bg-base-200 hover:bg-base-300 hover:shadow-md"
          >
            <FaAlignRight />
          </button>

          {/* Lists */}
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-3 py-1 rounded p-2 ${
              editor.isActive("bulletList")
                ? "bg-base-300 border-2 border-base-00"
                : "bg-base-200 hover:bg-base-300 hover:shadow-md"
            }`}
          >
            • List
          </button>
        </div>
        {/* Text Colors */}
        <div className="flex gap-2">
          <button
            onClick={() => editor.chain().focus().setColor("#FF5733").run()}
            className="px-3 py-1 rounded bg-red-500 text-white hover:shadow-md"
          >
            Red
          </button>
          <button
            onClick={() => editor.chain().focus().setColor("#3388FF").run()}
            className="px-3 py-1 rounded bg-blue-500 text-white hover:shadow-md"
          >
            Blue
          </button>
          <button
            onClick={() => editor.chain().focus().setColor("#28A745").run()}
            className="px-3 py-1 rounded bg-green-500 text-white hover:shadow-md"
          >
            Green
          </button>
          <button
            onClick={() => editor.chain().focus().setColor("#FFD700").run()}
            className="px-3 py-1 rounded bg-yellow-500 text-white hover:shadow-md"
          >
            Yellow
          </button>

          {/* Background Colors */}
          <button
            onClick={() =>
              editor.chain().focus().toggleHighlight({ color: "rgb(252, 177, 3)" }).run()
            }
            className="px-3 py-1 rounded bg-yellow-500 text-white border hover:shadow-md"
          >
            BG Yellow
          </button>
        </div>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="border-2 border-base-300 p-4 min-h-[150px] rounded list-inside"
      />
    </div>
  );
};

export default TextEditor;
