const fs = require('fs');
const path = require('path');

// Fonction pour créer un fichier à partir d'un modèle
const createFile = (filePath, content) => {
  const dirPath = path.dirname(filePath);
  
  // Créer le répertoire si nécessaire
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  // Créer le fichier
  fs.writeFileSync(filePath, content);
  console.log(`Fichier créé: ${filePath}`);
};

// Fonction pour formater le nom d'un module ou composant
const formatName = (name, isComponent = false) => {
  if (isComponent) {
    return name.charAt(0).toUpperCase() + name.slice(1) // Composant avec première lettre en majuscule
  }
  return name.charAt(0).toLowerCase() + name.slice(1) // Module avec première lettre en minuscule
};

// Fonction pour créer un module
const createModule = (moduleName) => {
  const formattedModuleName = formatName(moduleName); // Le nom du module commence par une minuscule
  const modulePath = path.join(__dirname, 'src', 'features', formattedModuleName);
  
  // Contenu du fichier view/[ModuleName].tsx (première lettre majuscule)
  const viewContent = `import {memo} from 'react';

const ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}View = () => {

  return (
    <div>
      <h1>${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)} View</h1>
    </div>
  )
  
};

export default memo(${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}View)
`;
  
  // Contenu du fichier model/[ModuleName].service.ts
  const serviceContent = `// Service ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)} à implémenter
  
// INTERFACES OR TYPES
export interface ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)} {
}
// END INTERFACES OR TYPES

/* ------------------------------------------- */

// INIT
// END INIT

/* ------------------------------------------- */

// EVENTS & FUNCTIONS
// END EVENTS & FUNCTIONS

/* ------------------------------------------- */
`;
  
  const sliceContent = `// Service ${moduleName.charAt(0).toLowerCase() + moduleName.slice(1)} à implémenter
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const ${moduleName.charAt(0).toLowerCase() + moduleName.slice(1)}Slice = createSlice({

  name: '${moduleName.charAt(0).toLowerCase() + moduleName.slice(1)}',
  initialState: { },
  reducers: {

  },
});

export const { } = ${moduleName.charAt(0).toLowerCase() + moduleName.slice(1)}Slice.actions

export default ${moduleName.charAt(0).toLowerCase() + moduleName.slice(1)}Slice.reducer
`;
  
  const apiSliceContent = `// Service ${moduleName.charAt(0).toLowerCase() + moduleName.slice(1)} à implémenter
import {API, API_PATH} from "../../../app/store";

const ${moduleName.charAt(0).toLowerCase() + moduleName.slice(1)}ApiSlice = API.injectEndpoints({

  endpoints: build => ({

  })
  
})

export const { } = ${moduleName.charAt(0).toLowerCase() + moduleName.slice(1)}ApiSlice
`;
  
  // Créer les fichiers dans les sous-dossiers appropriés
  createFile(path.join(modulePath, 'view', `${moduleName.charAt(0).toLowerCase() + moduleName.slice(1)}View.tsx`), viewContent);
  createFile(path.join(modulePath, 'model', `${moduleName.charAt(0).toLowerCase() + moduleName.slice(1)}Service.ts`), serviceContent);
  createFile(path.join(modulePath, 'model', `${moduleName.charAt(0).toLowerCase() + moduleName.slice(1)}.slice.ts`), sliceContent);
  createFile(path.join(modulePath, 'model', `${moduleName.charAt(0).toLowerCase() + moduleName.slice(1)}.api.slice.ts`), apiSliceContent);
};

// Fonction pour créer un composant
const createComponent = (componentName) => {
  const formattedComponentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
  const componentPath = path.join(__dirname, 'src', 'components', `${formattedComponentName}.tsx`);
  
  const componentContent = `const ${formattedComponentName} = () => {

  return (
    <div>
      <h1>${formattedComponentName}</h1>
    </div>
  )
  
};

export default ${formattedComponentName};
`;
  
  createFile(componentPath, componentContent);
};

// Fonction pour créer un hook React avec export default function
const createHook = (hookName) => {
  const hookFunctionName = `use${hookName.charAt(0).toUpperCase() + hookName.slice(1)}`;
  const hookFileName = `${hookFunctionName.charAt(0).toLowerCase() + hookFunctionName.slice(1)}.ts`;
  const hookPath = path.join(__dirname, 'src', 'hooks', hookFileName);
  
  const hookContent = `export default function ${hookFunctionName}() {
  // Ton hook ici
}
`;
  
  createFile(hookPath, hookContent);
};

// Fonction pour créer une interface TypeScript
const createInterface = (interfaceName) => {
  const formattedName = interfaceName.charAt(0).toUpperCase() + interfaceName.slice(1);
  const interfacePath = path.join(__dirname, 'src', 'interfaces', `${formattedName}.ts`);
  
  const interfaceContent = `export interface ${formattedName} {
  // Définir les propriétés ici
}
`;
  
  createFile(interfacePath, interfaceContent);
};

// Récupérer les arguments de la ligne de commande
const [,, command, name] = process.argv;

if (!name) {
  console.log('Veuillez spécifier un nom pour le module, le composant, le hook ou l\'interface.');
  process.exit(1);
}

// Exécuter la commande appropriée
if (command === 'make:mod') {
  createModule(name);
} else if (command === 'make:comp') {
  createComponent(name);
} else if (command === 'make:hook') {
  createHook(name);
} else if (command === 'make:int') {
  createInterface(name);
} else {
  console.log('Commande non reconnue. Utilisez "make:module", "make:comp", "make:hook" ou "make:int".');
  process.exit(1);
}
