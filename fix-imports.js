const fs = require('fs');
const path = require('path');

function fixImports(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      fixImports(filePath);
    } else if (file.endsWith('.jsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      // Remove duplicate React imports
      const imports = content.match(/^import React from ['"]react['"];?\r?\n/gm);
      if (imports && imports.length > 1) {
        content = content.replace(/^import React from ['"]react['"];?\r?\n/gm, '');
        content = "import React from 'react';\n" + content;
        fs.writeFileSync(filePath, content);
        console.log(`Fixed duplicate React imports in ${filePath}`);
      }
    }
  });
}

fixImports(path.join(__dirname, 'src'));
