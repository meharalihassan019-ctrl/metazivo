const fs = require('fs');
let code = fs.readFileSync('src/components/GutenbergEditor.tsx', 'utf8');

const overlayComponent = `
function SlashMenu({ editor, position, query, onClose, onOpenMediaSelector }) {
  if (!position) return null;
  
  const options = [
    { id: 'h1', label: 'Heading 1', icon: <Heading1 className="w-4 h-4 mr-2" />, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
    { id: 'h2', label: 'Heading 2', icon: <Heading2 className="w-4 h-4 mr-2" />, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { id: 'h3', label: 'Heading 3', icon: <Heading3 className="w-4 h-4 mr-2" />, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
    { id: 'bullet', label: 'Bullet List', icon: <List className="w-4 h-4 mr-2" />, action: () => editor.chain().focus().toggleBulletList().run() },
    { id: 'ordered', label: 'Numbered List', icon: <ListOrdered className="w-4 h-4 mr-2" />, action: () => editor.chain().focus().toggleOrderedList().run() },
    { id: 'quote', label: 'Quote', icon: <Quote className="w-4 h-4 mr-2" />, action: () => editor.chain().focus().toggleBlockquote().run() },
    { id: 'image', label: 'Image', icon: <ImageIcon className="w-4 h-4 mr-2" />, action: () => {
        onOpenMediaSelector((url, altText) => {
          editor.chain().focus().setImage({ src: url, alt: altText || '' }).run();
        });
      }
    },
    { id: 'youtube', label: 'YouTube Video', icon: <YoutubeIcon className="w-4 h-4 mr-2" />, action: () => {
        const url = window.prompt("Enter YouTube URL:");
        if (url) {
          editor.chain().focus().setYoutubeVideo({ src: url }).run();
        }
      }
    },
    { id: 'table', label: 'Table', icon: <TableIcon className="w-4 h-4 mr-2" />, action: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
  ];

  const filteredOptions = options.filter(o => o.label.toLowerCase().includes((query || '').toLowerCase()));

  if (filteredOptions.length === 0) return null;

  return (
    <div 
      className="absolute z-50 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden py-1"
      style={{ top: position.top + 24, left: position.left }}
    >
      {filteredOptions.map((opt, idx) => (
        <button
          key={opt.id}
          className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-blue-600 hover:text-white flex items-center transition-colors"
          onClick={() => {
            // Delete the slash command text
            editor.chain().focus().deleteRange({ from: position.from, to: position.to }).run();
            opt.action();
            onClose();
          }}
        >
          {opt.icon}
          {opt.label}
        </button>
      ))}
    </div>
  );
}
`;

// Insert overlay component before GutenbergEditor
code = code.replace('export default function GutenbergEditor', overlayComponent + '\nexport default function GutenbergEditor');

// Add state to GutenbergEditor
const stateToAdd = `
  const [slashPos, setSlashPos] = useState(null);
  const editorRef = useRef(null);
`;
code = code.replace('const [isReady, setIsReady] = useState(false);', 'const [isReady, setIsReady] = useState(false);\n' + stateToAdd);

// Add onUpdate logic
const onUpdateSearch = `onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },`;
const onUpdateReplace = `onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      
      const { state, view } = editor;
      const { selection } = state;
      if (selection.empty) {
        const $pos = selection.$anchor;
        const textBefore = $pos.parent.textContent.substring(0, $pos.parentOffset);
        // Look for a slash at the beginning of a line or after a space
        const match = textBefore.match(/(?:^|\\s)\\/([^\\s]*)$/);
        
        if (match) {
          const query = match[1];
          // Get the start of the match to position the menu
          const matchStartOffset = textBefore.length - match[0].length + (match[0].startsWith(' ') ? 1 : 0);
          const from = $pos.pos - match[1].length - 1; // -1 for the slash
          const coords = view.coordsAtPos(from);
          
          // Get editor container bounding box to calculate relative position
          const containerRect = view.dom.parentElement.getBoundingClientRect();
          
          setSlashPos({
            top: coords.top - containerRect.top + view.dom.parentElement.scrollTop,
            left: coords.left - containerRect.left,
            query,
            from,
            to: $pos.pos
          });
        } else {
          setSlashPos(null);
        }
      } else {
        setSlashPos(null);
      }
    },`;
code = code.replace(onUpdateSearch, onUpdateReplace);

// Render SlashMenu
const renderSearch = `<EditorContent editor={editor} />`;
const renderReplace = `<EditorContent editor={editor} />
        <SlashMenu 
          editor={editor} 
          position={slashPos} 
          query={slashPos?.query} 
          onClose={() => setSlashPos(null)} 
          onOpenMediaSelector={onOpenMediaSelector}
        />`;
code = code.replace(renderSearch, renderReplace);

fs.writeFileSync('src/components/GutenbergEditor.tsx', code);
console.log("Success");
