// scripts/generate-page.ts - Generate a new page structure for a given page name in src/pages
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Shows help information and usage examples
 */
function showHelp() {
  console.log(`
📝 Page Generator Usage:

  npm run generate:page <PageName> [path]

  Arguments:
    <PageName>  Required. The name of the page component (PascalCase)
    [path]      Optional. Subpath under src/pages (e.g., 'user' or 'admin/dashboard')

📋 Examples:
  1. Create page in src/pages/Home:
     npm run generate:page Home

  2. Create page in src/pages/user/Profile:
     npm run generate:page Profile user

  3. Create page in src/pages/admin/dashboard/Analytics:
     npm run generate:page Analytics admin/dashboard

📂 Generated Structure:
  src/pages/[path]/<PageName>/
    ├── index.ts
    └── ui/
        ├── <PageName>.tsx
        └── <PageName>.async.tsx
`)
  process.exit(0)
}

async function generatePage() {
  try {
    if (process.argv.length < 3 || process.argv.includes('--help')) {
      showHelp()
    }

    const pageName = process.argv[2]
    const customPath = process.argv[3]

    if (!pageName) {
      throw new Error('Please provide a page name')
    }

    // Validate page name
    if (!/^[A-Z][a-zA-Z0-9]*$/.test(pageName)) {
      throw new Error(
        'Page name must start with uppercase letter and contain only alphanumeric characters'
      )
    }

    const pagesDir = path.join(__dirname, 'src', 'pages')
    const pageDir = customPath
      ? path.join(pagesDir, customPath, pageName)
      : path.join(pagesDir, pageName)
    const uiDir = path.join(pageDir, 'ui')

    // Create directories
    await fs.mkdir(uiDir, { recursive: true })

    // Create index.ts
    const indexTemplate = `export { ${pageName}Async as ${pageName} } from './ui/${pageName}.async';\n`
    await fs.writeFile(path.join(pageDir, 'index.ts'), indexTemplate)

    // Create regular component
    const componentTemplate = `const ${pageName} = () => {
  return <div>${pageName}</div>
}\n
export default ${pageName}
`

    await fs.writeFile(path.join(uiDir, `${pageName}.tsx`), componentTemplate)

    // Create async component
    const asyncComponentTemplate = `import { lazy } from 'react'

export const ${pageName}Async = lazy(() => import('./${pageName}'))
`

    await fs.writeFile(
      path.join(uiDir, `${pageName}.async.tsx`),
      asyncComponentTemplate
    )

    console.log(
      `✅ Successfully created ${pageName} page structure in ${pageDir}`
    )
    console.log(`├── index.ts`)
    console.log(`└── ui/`)
    console.log(`    ├── ${pageName}.tsx`)
    console.log(`    ├── ${pageName}.async.tsx`)
  } catch (error) {
    console.error(
      '❌ Error generating page:',
      error instanceof Error ? error.message : error
    )
    process.exit(1)
  }
}

generatePage()
