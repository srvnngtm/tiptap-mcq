import { mergeAttributes, Node } from '@tiptap/core'

export interface ListItemOptions {
  HTMLAttributes: Record<string, any>,
  bulletListTypeName: string
  orderedListTypeName: string
}

export const ListSaran = Node.create<ListItemOptions>({
  name: 'listItem',

  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: 'bulletList',
      orderedListTypeName: 'orderedList',
    }
  },

  content: 'paragraph block*',

  defining: true,

  parseHTML() {
    return [
      {
        tag: 'li',
        getAttrs: node => node.tagName.toLowerCase() === 'li' && node.querySelector('input[type="radio"]') ? {} : false
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    // add argument as type = "radio"

    return ['li', mergeAttributes(this.options.HTMLAttributes, {...HTMLAttributes, type: 'radio' }),0]
  },

  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      'Shift-Tab': () => this.editor.commands.liftListItem(this.name),
    }
  },
})
