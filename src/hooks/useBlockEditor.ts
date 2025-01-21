import { useEditor } from '@tiptap/react'
import type { AnyExtension } from '@tiptap/core'
import { ExtensionKit } from '@/extensions'
import { initialContent } from '@/lib/data/initial-content'

export const useBlockEditor = () => {
  const editor = useEditor(
    {
      immediatelyRender: false,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      onCreate: ctx => {
        ctx.editor.commands.setContent(initialContent)
      },
      onUpdate: ctx => {
        console.log('ctx', ctx.editor.getJSON())
      },
      extensions: [
        ...ExtensionKit(),
      ].filter((e): e is AnyExtension => e !== undefined),
      editorProps: {
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          class: 'min-h-full'
        }
      }
    },
  )



  return { editor }
}
