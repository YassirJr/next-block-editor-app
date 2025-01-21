import { mergeAttributes, Node } from '@tiptap/core'
import { Figure } from '@/extensions'

declare module '@tiptap/core' {
  // eslint-disable-next-line no-unused-vars
  interface Commands<ReturnType> {
    blockquoteFigure: {
      setBlockquote: () => ReturnType
    }
  }
}

export const Quote = Node.create({
  name: 'quote',

  content: 'paragraph+',

  defining: true,

  marks: '',

  parseHTML() {
    return [
      {
        tag: 'blockquote',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['blockquote', HTMLAttributes, 0]
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () => false,
    }
  },
})



export const QuoteCaption = Node.create({
  name: 'quoteCaption',

  group: 'block',

  content: 'text*',

  defining: true,

  isolating: true,

  parseHTML() {
    return [
      {
        tag: 'figcaption',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['figcaption', HTMLAttributes, 0]
  },

  addKeyboardShortcuts() {
    return {
      // On Enter at the end of line, create new paragraph and focus
      Enter: ({ editor }) => {
        const {
          state: {
            selection: { $from, empty },
          },
        } = editor

        if (!empty || $from.parent.type !== this.type) {
          return false
        }

        const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2

        if (!isAtEnd) {
          return false
        }

        const pos = editor.state.selection.$from.end()

        return editor.chain().focus(pos).insertContentAt(pos, { type: 'paragraph' }).run()
      },
    }
  },
})


export const BlockQuoteFigure = Figure.extend({
  name: 'blockquoteFigure',

  group: 'block',

  content: 'quote quoteCaption',

  isolating: true,

  addExtensions() {
    return [Quote, QuoteCaption]
  },

  renderHTML({ HTMLAttributes }) {
    return ['figure', mergeAttributes(HTMLAttributes, { 'data-type': this.name }), ['div', {}, 0]]
  },

  addKeyboardShortcuts() {
    return {
      Enter: () => false
    }
  },

  addAttributes() {
    return {
      ...this.parent?.()
    }
  },

  addCommands() {
    return {
      setBlockquote:
        () =>
          ({ state, chain }) => {
            const position = state.selection.$from.start()
            const selectionContent = state.selection.content()

            return chain()
              .focus()
              .insertContent({
                type: this.name,
                content: [
                  {
                    type: 'quote',
                    content: selectionContent.content.toJSON() || [
                      {
                        type: 'paragraph',
                        attrs: {
                          textAlign: 'left'
                        }
                      }
                    ]
                  },
                  {
                    type: 'quoteCaption'
                  }
                ]
              })
              .focus(position + 1)
              .run()
          }
    }
  }
})

export default BlockQuoteFigure
