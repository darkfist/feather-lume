import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your project's source code
const sourceDir = path.join(__dirname, "..", "src");

// Output file for the generated imports
const outputFilePath = path.join(__dirname, "ionic.imports.js");

// Find all `ion-*` tags in your source files
async function findUsedComponents(dir) {
  const files = await fs.promises.readdir(dir, { withFileTypes: true });
  let usedComponents = new Set();

  for (const file of files) {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      const subDirComponents = await findUsedComponents(filePath);
      subDirComponents.forEach((c) => usedComponents.add(c));
    } else if (file.name.endsWith(".js") || file.name.endsWith(".html")) {
      const content = await fs.promises.readFile(filePath, "utf-8");

      // Match for 'ion-' elements that are enclosed in < >
      const matches = content.match(/<\s*(ion-[a-z\-]+)\s*[^>]*>/g) || [];

      matches.forEach((match) => {
        // Extract the component name (ignoring extra spaces, attributes)
        const component = match.match(/ion-[a-z\-]+/);
        if (component) {
          usedComponents.add(component[0]);
        }
      });
    }
  }

  return Array.from(usedComponents);
}

// Generate import statements for each used component
function generateImports(components) {
  const imports = components.map((component) => {
    const name = component.replace(/-([a-z])/g, (_, char) => char.toUpperCase()); // Convert kebab-case to camelCase
    const defineName = `defineCustomElement as ${name}`;
    const fileName = `${component}.js`;
    return `import { ${defineName} } from "@ionic/core/components/${fileName}";`;
  });

  const registration = components
    .map((component) => component.replace(/-([a-z])/g, (_, char) => char.toUpperCase()))
    .map((name) => `${name}();`)
    .join("\n");

  return `
${imports.join("\n")}

export function registerIonicComponents() {
  ${registration}
}
  `;
}

// Main script
async function main() {
  console.log("Scanning project for used Ionic components...");
  const usedComponents = await findUsedComponents(sourceDir);

  console.log("Generating import file...");
  const importCode = generateImports(usedComponents);

  await fs.promises.writeFile(outputFilePath, importCode, "utf-8");

  console.log(`Import file generated at ${outputFilePath}`);
}

main().catch((error) => {
  console.error("An error occurred:", error);
});
