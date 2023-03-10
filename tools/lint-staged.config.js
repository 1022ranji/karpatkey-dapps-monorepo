module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'tsc -p tsconfig.json --noEmit',

  // Lint then format TypeScript and JavaScript files
  '**/*.(ts|tsx|js)': (filenames) => [
    `eslint --fix ${filenames.join(' ')}`,
    `prettier --write ${filenames.join(' ')}`
  ],

  // Format MarkDown and JSON
  '**/*.(md|json)': (filenames) => `prettier --write ${filenames.join(' ')}`
}
