// src/SqlRunner.js
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

// Helper function to render query results as an HTML table
const ResultsTable = ({ columns, values }) => (
  <table>
    <thead>
      <tr>
        {columns.map(column => <th key={column}>{column}</th>)}
      </tr>
    </thead>
    <tbody>
      {values.map((row, i) => (
        <tr key={i}>
          {row.map((value, j) => <td key={j}>{value}</td>)}
        </tr>
      ))}
    </tbody>
  </table>
);

export default function SqlRunner() {
  const [db, setDb] = useState(null);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState(
    "CREATE TABLE students (name TEXT, grade INTEGER);\nINSERT INTO students VALUES ('Alice', 95), ('Bob', 88);\nSELECT * FROM students;"
  );

  useEffect(() => {
    // Load SQL.js from CDN via script tag
    async function initDb() {
      try {
        // Check if already loaded
        if (window.initSqlJs) {
          const SQL = await window.initSqlJs({
            locateFile: file => `https://sql.js.org/dist/${file}`
          });
          setDb(new SQL.Database());
          return;
        }

        // Load the script
        const script = document.createElement('script');
        script.src = 'https://sql.js.org/dist/sql-wasm.js';
        script.onload = async () => {
          const SQL = await window.initSqlJs({
            locateFile: file => `https://sql.js.org/dist/${file}`
          });
          setDb(new SQL.Database());
        };
        script.onerror = (err) => {
          setError(new Error('Failed to load SQL.js from CDN'));
        };
        document.head.appendChild(script);
      } catch (err) {
        console.error('Failed to initialize SQL.js:', err);
        setError(err);
      }
    }
    initDb();
  }, []);

  const handleRunQuery = () => {
    if (!db) return;
    try {
      // db.exec returns an array of results for each statement
      const queryResults = db.exec(query);
      setResults(queryResults);
      setError(null);
    } catch (err) {
      setError(err);
      setResults([]);
    }
  };

  return (
    <div className="sql-runner-container">
      <div className="monaco-wrapper">
        <Editor
          height="30vh"
          theme="vs-dark"
          language="sql"
          value={query}
          onChange={(value) => setQuery(value || "")}
          options={{ fontSize: 14, minimap: { enabled: false } }}
        />
      </div>
      <button onClick={handleRunQuery} disabled={!db} className="run-btn">
        {db ? "Run Query" : "Loading DB..."}
      </button>
      <div className="output-container">
        <h3>Results:</h3>
        <div className="sql-output-box">
          {error && <pre className="sql-error">{error.toString()}</pre>}
          {results.length > 0 ? (
            results.map((result, i) => (
              <ResultsTable key={i} columns={result.columns} values={result.values} />
            ))
          ) : (
            !error && <p>Query executed with no results to display.</p>
          )}
        </div>
      </div>
    </div>
  );
}