const fs = require('fs');
let code = fs.readFileSync('src/components/GutenbergEditor.tsx', 'utf8');

code = code.replace(
  'function SlashMenu({ editor, position, query, onClose, onOpenMediaSelector })',
  'function SlashMenu({ editor, position, query, onClose, onOpenMediaSelector }: { editor: any, position: any, query: string, onClose: () => void, onOpenMediaSelector: (onSelect: (url: string, altText?: string) => void) => void })'
);

code = code.replace(
  'const [slashPos, setSlashPos] = useState(null);',
  'const [slashPos, setSlashPos] = useState<any>(null);'
);

fs.writeFileSync('src/components/GutenbergEditor.tsx', code);
