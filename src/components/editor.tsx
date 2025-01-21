"use client"
import '@/styles/index.css'
import { EditorContent } from '@tiptap/react'
import React, { useRef } from 'react'
import { useBlockEditor } from '@/hooks/useBlockEditor'
import ImageBlockMenu from '@/extensions/image-block/image-block-menu'
import LinkMenu from '@/components/menus/link-menu'
import { TextMenu } from '@/components/menus/text-menu'
import { ContentItemMenu } from '@/components/menus'
import { ColumnsMenu , TableColumnMenu , TableRowMenu } from '@/extensions'

export const Editor = ( )=> {
  const menuContainerRef = useRef(null)
  const { editor } = useBlockEditor()

  if (!editor) {
    return null
  }

  return (
    <div className="flex h-full" ref={menuContainerRef}>
      <div className="relative flex flex-col flex-1 h-full overflow-hidden">
        <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
        <ContentItemMenu editor={editor} />
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <TextMenu editor={editor} />
        <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
        <TableRowMenu editor={editor} appendTo={menuContainerRef} />
        <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
        <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
      </div>
    </div>
  )
}

export default Editor
