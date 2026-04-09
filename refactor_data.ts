import { Project } from "ts-morph";

const project = new Project({
  tsConfigFilePath: "tsconfig.json",
});

const pageFile = project.getSourceFileOrThrow("app/page.tsx");
const homeDataFile = project.createSourceFile("app/data/homeData.ts", "", { overwrite: true });

// Move variable declarations
const varsToMove = ["projectsData", "capabilitiesData", "toolCategories", "primaryStack"];
const neededImports = new Set<string>();

varsToMove.forEach(varName => {
  const varDecl = pageFile.getVariableStatementOrThrow(varName);
  const text = varDecl.getText();
  
  // Extract icons from the text to add imports to homeDataFile
  const iconMatches = text.match(/\b(Brain|Sparkles|Zap|Network|Monitor|VideoIcon|Database|TrendingUp|Code2|Workflow|Search|Boxes|Bot|Cpu|ImageIcon|Layout|Server|Cloud|BookOpen|Users|Target|Award|GraduationCap|Headphones|ChevronDown)\b/g);
  if (iconMatches) {
    iconMatches.forEach(match => neededImports.add(match));
  }
  
  homeDataFile.addVariableStatement({
    declarationKind: varDecl.getDeclarationKind(),
    declarations: varDecl.getDeclarations().map(d => ({
      name: d.getName(),
      initializer: d.getInitializer()?.getText() || ""
    })),
    isExported: true
  });
  
  varDecl.remove();
});

if (neededImports.size > 0) {
  homeDataFile.addImportDeclaration({
    moduleSpecifier: "lucide-react",
    namedImports: Array.from(neededImports)
  });
}

// Add import to page.tsx
pageFile.addImportDeclaration({
  moduleSpecifier: "@/app/data/homeData",
  namedImports: varsToMove
});

project.saveSync();
console.log("Refactored data to app/data/homeData.ts");
