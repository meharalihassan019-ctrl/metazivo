import { Node, mergeAttributes } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    faqBlock: {
      insertFaq: () => ReturnType;
    }
  }
}

export const FaqBlock = Node.create({
  name: 'faqBlock',
  group: 'block',
  content: 'faqItem+',
  addAttributes() {
    return {
      itemscope: { default: '' },
      itemtype: { default: 'https://schema.org/FAQPage' }
    };
  },
  parseHTML() {
    return [{ tag: 'div[data-type="faq-block"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'faq-block', class: 'faq-block my-8 border border-slate-700/50 rounded-xl overflow-hidden shadow-sm bg-slate-800/20' }), 0];
  },
  addCommands() {
    return {
      insertFaq: () => ({ tr, dispatch, editor }) => {
        if (dispatch) {
          const faqNode = this.type.create(null, [
            editor.schema.nodes.faqItem.create(null, [
              editor.schema.nodes.faqQuestion.create(null, [editor.schema.text("Question?")]),
              editor.schema.nodes.faqAnswer.create(null, [editor.schema.nodes.paragraph.create(null, [editor.schema.text("Answer goes here.")])])
            ])
          ]);
          tr.replaceSelectionWith(faqNode);
        }
        return true;
      },
    };
  }
});

export const FaqItem = Node.create({
  name: 'faqItem',
  group: 'block',
  content: 'faqQuestion faqAnswer',
  addAttributes() {
    return {
      itemscope: { default: '' },
      itemprop: { default: 'mainEntity' },
      itemtype: { default: 'https://schema.org/Question' }
    };
  },
  parseHTML() {
    return [{ tag: 'div[data-type="faq-item"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'faq-item', class: 'faq-item border-b border-slate-700/50 last:border-b-0' }), 0];
  },
});

export const FaqQuestion = Node.create({
  name: 'faqQuestion',
  group: 'block',
  content: 'inline*',
  addAttributes() {
    return {
      itemprop: { default: 'name' }
    };
  },
  parseHTML() {
    return [{ tag: 'h3[data-type="faq-question"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['h3', mergeAttributes(HTMLAttributes, { 'data-type': 'faq-question', class: 'faq-question text-lg font-bold p-5 m-0 cursor-text flex items-center bg-slate-800/40 text-slate-100 hover:bg-slate-800/60 transition-colors' }), 0];
  },
});

export const FaqAnswer = Node.create({
  name: 'faqAnswer',
  group: 'block',
  content: 'block+',
  addAttributes() {
    return {
      itemscope: { default: '' },
      itemprop: { default: 'acceptedAnswer' },
      itemtype: { default: 'https://schema.org/Answer' }
    };
  },
  parseHTML() {
    return [{ tag: 'div[data-type="faq-answer"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'faq-answer', class: 'faq-answer p-5 pt-4 bg-slate-900/50 text-slate-300 cursor-text' }), 0];
  },
});
