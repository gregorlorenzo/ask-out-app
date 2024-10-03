import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import HardBreak from '@tiptap/extension-hard-break'
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  UnderlineIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  WrapText
} from 'lucide-react'

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${editor.isActive('bold') ? 'bg-primary text-primary-foreground' : ''}`}
        size="icon"
        variant={editor.isActive('bold') ? "default" : "outline"}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${editor.isActive('italic') ? 'bg-primary text-primary-foreground' : ''}`}
        size="icon"
        variant={editor.isActive('italic') ? "default" : "outline"}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`${editor.isActive('underline') ? 'bg-primary text-primary-foreground' : ''}`}
        size="icon"
        variant={editor.isActive('underline') ? "default" : "outline"}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${editor.isActive('bulletList') ? 'bg-primary text-primary-foreground' : ''}`}
        size="icon"
        variant={editor.isActive('bulletList') ? "default" : "outline"}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${editor.isActive('orderedList') ? 'bg-primary text-primary-foreground' : ''}`}
        size="icon"
        variant={editor.isActive('orderedList') ? "default" : "outline"}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`${editor.isActive({ textAlign: 'left' }) ? 'bg-primary text-primary-foreground' : ''}`}
        size="icon"
        variant={editor.isActive({ textAlign: 'left' }) ? "default" : "outline"}
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`${editor.isActive({ textAlign: 'center' }) ? 'bg-primary text-primary-foreground' : ''}`}
        size="icon"
        variant={editor.isActive({ textAlign: 'center' }) ? "default" : "outline"}
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`${editor.isActive({ textAlign: 'right' }) ? 'bg-primary text-primary-foreground' : ''}`}
        size="icon"
        variant={editor.isActive({ textAlign: 'right' }) ? "default" : "outline"}
      >
        <AlignRight className="h-4 w-4" />
      </Button>
      {/* Add HardBreak Button */}
      <Button
        type="button"
        onClick={() => editor.chain().focus().setHardBreak().run()}
        size="icon"
        variant="outline"
      >
        <WrapText className="h-4 w-4" />
      </Button>
    </div>
  )
}

const TiptapEditor = ({ content, onChange, className }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      HardBreak.configure({
        keepMarks: true,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none min-h-[200px] focus:outline-none',
      },
    },
  })

  return (
    <div className={`border rounded-md p-2 ${className}`}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="prose max-w-none" />
    </div>
  )
}

export default TiptapEditor
