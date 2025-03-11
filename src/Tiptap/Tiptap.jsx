import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";

const TextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "<p>Hello <strong>world!</strong></p>",
  });

  if (!editor) return null; // Prevents errors before the editor is initialized

  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-md bg-base-200">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-2 p-2 border-b">
        {/* Formatting */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded ${editor.isActive("bold") ? "bg-gray-200" : "bg-gray-100"}`}
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("italic") ? "bg-gray-200" : "bg-gray-100"
          }`}
        >
          <em>I</em>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("strike") ? "bg-gray-200" : "bg-gray-100"
          }`}
        >
          <s>S</s>
        </button>

        {/* Headings */}
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("heading", { level: 1 }) ? "bg-gray-200" : "bg-gray-100"
          }`}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : "bg-gray-100"
          }`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("heading", { level: 3 }) ? "bg-gray-200" : "bg-gray-100"
          }`}
        >
          H3
        </button>

        {/* Alignment */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className="px-3 py-1 rounded bg-gray-100"
        >
          ⬅️
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className="px-3 py-1 rounded bg-gray-100"
        >
          ⏺️
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className="px-3 py-1 rounded bg-gray-100"
        >
          ➡️
        </button>

        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("bulletList") ? "bg-gray-200" : "bg-gray-100"
          }`}
        >
          • List
        </button>

        {/* Text Colors */}
        <button
          onClick={() => editor.chain().focus().setColor("#FF5733").run()}
          className="px-3 py-1 rounded bg-red-500 text-white"
        >
          Red
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#3388FF").run()}
          className="px-3 py-1 rounded bg-blue-500 text-white"
        >
          Blue
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#28A745").run()}
          className="px-3 py-1 rounded bg-green-500 text-white"
        >
          Green
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#FFD700").run()}
          className="px-3 py-1 rounded bg-yellow-500 text-white"
        >
          Yellow
        </button>

        {/* Background Colors */}
        <button
          onClick={() => editor.chain().focus().setColor("#FFFFFF").run()}
          className="px-3 py-1 rounded bg-white border"
        >
          BG White
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#F8F9FA").run()}
          className="px-3 py-1 rounded bg-gray-200 border"
        >
          BG Gray
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="border p-2 min-h-[150px] rounded" />
    </div>
  );
};

export default TextEditor;
