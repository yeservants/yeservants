// Run this script from your project root with: node add-logo-script.js

const fs = require('fs');
const path = require('path');

const missionaryDir = path.join(__dirname, 'missionary');
const scriptTag = '\n<script src="http://yeservants.org/js/js-logo.js"></script>\n';

function addScriptToIndexFiles(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      addScriptToIndexFiles(fullPath);
    } else if (entry.isFile() && entry.name === 'index.html') {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (!content.includes('js-logo.js')) {
        content += scriptTag;
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  });
}

addScriptToIndexFiles(missionaryDir);