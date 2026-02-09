// src/Coderunner.js
import { useState } from "react";
import Editor from "@monaco-editor/react";
import api from "../axiosConfig";
import FileBasedIde from "../FileBasedIde";
import SqlRunner from "./SQLRunner";
import '../CodeRunner.css';

const languageConfig = {
  // --- BACKEND LANGUAGES ---
  python: { type: 'backend', editorLanguage: 'python', defaultCode: 'print("Hello, Python!")' },
  javascript: { type: 'backend', editorLanguage: 'javascript', defaultCode: 'console.log("Hello, Node.js!");' },
  java: { type: 'backend', editorLanguage: 'java', defaultCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}' },
  cpp: { type: 'backend', editorLanguage: 'cpp', defaultCode: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, C++!";\n    return 0;\n}' },
  
  // --- SQL ---
  sql: {
    type: 'sql'
  },

  // --- FRONTEND / SERVER ENVIRONMENTS ---
  node: {
    type: 'frontend',
    initialFiles: {
      '/index.js': `const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Hello from Express!</h1><p>Your Node.js server is running inside Sandpack.</p>');
});

app.listen(port, () => {
  console.log('Server listening at http://localhost:' + port);
});`,
      '/package.json': `{
  "name": "node-server",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "latest"
  }
}`,
    },
    dependencies: { "express": "latest" },
    entry: '/index.js',
  },
  react: {
    type: 'frontend',
    initialFiles: {
      '/App.js': `import './styles.css';

export default function App() {
  return (
    <div className="App">
      <h1>Hello, React!</h1>
      <h2>Add new components and files!</h2>
    </div>
  );
}`,
      '/index.js': `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
      '/styles.css': `body { font-family: sans-serif; }`,
      '/public/index.html': `<!DOCTYPE html>
<html><body><div id="root"></div></body></html>`,
    },
    dependencies: { "react": "latest", "react-dom": "latest" },
    entry: '/index.js',
  },
  vanilla: {
    type: 'frontend',
    initialFiles: {
      '/index.html': `<!DOCTYPE html>
<html><body><h1>Hello, Vanilla JS!</h1><script src="index.js"></script></body></html>`,
      '/styles.css': `body { font-family: sans-serif; }`,
      '/index.js': `console.log("Hello from index.js!");`
    },
    dependencies: {},
    entry: '/index.html'
  },
  angular: {
    type: 'frontend',
    initialFiles: {
      '/src/app/app.component.html': `<h1>Hello, {{ name }}!</h1>`,
      '/src/app/app.component.ts': `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  name = 'Angular';
}`,
      '/src/app/app.module.ts': `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}`,
      '/src/main.ts': `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);`,
      '/public/index.html': `<!DOCTYPE html>
<html><head><title>Angular</title></head><body><app-root></app-root></body></html>`,
    },
    dependencies: { "@angular/common": "latest", "@angular/compiler": "latest", "@angular/core": "latest", "@angular/platform-browser": "latest", "rxjs": "latest", "zone.js": "latest" },
    entry: '/src/main.ts',
  },
};

export default function Coderunner() {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [code, setCode] = useState(languageConfig.python.defaultCode);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const currentConfig = languageConfig[selectedLanguage];

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setOutput("");
    if (languageConfig[newLang].type === 'backend') {
      setCode(languageConfig[newLang].defaultCode);
    }
  };

  const runBackendCode = async () => {
    if (!code.trim()) { setOutput("⚠ Please write some code first."); return; }
    setLoading(true); setOutput("");
    try {
      const res = await api.post("/api/problems/run", { code, language: selectedLanguage });
      setOutput(res.data.output || res.data.error || "Code executed successfully");
    } catch (err) {
      console.error(err);
      setOutput("❌ Error running code. " + (err.response?.data?.error || err.message));
    } finally { setLoading(false); }
  };

  return (
    <div className="coderunner-container">
      <header className="coderunner-header">
        <h1>Advanced Code Runner</h1>
        <div className="controls">
          <label>Select Environment: </label>
          <select value={selectedLanguage} onChange={handleLanguageChange}>
            {Object.keys(languageConfig).map(lang => (
              <option key={lang} value={lang}>{lang.charAt(0).toUpperCase() + lang.slice(1)}</option>
            ))}
          </select>
        </div>
      </header>
      
      <main className="editor-container">
        {currentConfig.type === 'backend' ? (
          <>
            <div className="monaco-wrapper">
              <Editor height="50vh" theme="vs-dark" language={currentConfig.editorLanguage} value={code} onChange={(value) => setCode(value || "")} options={{ fontSize: 14, minimap: { enabled: false } }}/>
            </div>
            <button onClick={runBackendCode} disabled={loading} className="run-btn">{loading ? "Running..." : "Run Code"}</button>
            <div className="output-container">
              <h3>Output:</h3>
              <pre className="output-box">{output || "Output will appear here..."}</pre>
            </div>
          </>
        ) : currentConfig.type === 'frontend' ? (
          <FileBasedIde 
            key={selectedLanguage}
            initialFiles={currentConfig.initialFiles} 
            dependencies={currentConfig.dependencies}
            entry={currentConfig.entry}
          />
        ) : (
          <SqlRunner />
        )}
      </main>
    </div>
  );
}
