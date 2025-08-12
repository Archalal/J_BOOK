import MonacoEditor, { type OnMount } from "@monaco-editor/react";
import React, { useRef } from "react";
import prettier from "prettier/standalone";
import * as parserBabel from "prettier/plugins/babel";
import * as pluginEstree from "prettier/plugins/estree";
import 'bulmaswatch/superhero/bulmaswatch.min.css'
import './CodeEDitor.css'
interface MonacoEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<MonacoEditorProps> = ({
  onChange,
  initialValue,
}) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const onEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
      // console.log(editor.getValue())
    });
    editor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const onFormatClick = async () => {
    if (!editorRef.current) return;

    // Get current value from editor
    const unformatted = editorRef.current.getModel()?.getValue() || "";

    // Format the value
    const formatted = (await prettier.format(unformatted, {
      parser: "babel",
      plugins: [parserBabel, pluginEstree],
      useTabs: false,
      semi: true,
      singleQuote: true,
    })) .replace(/\n/g,'');
   

    // Set the formatted value back in editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button className="button button-format is-primary is-small" onClick={onFormatClick}>Format</button>
      <MonacoEditor
        onMount={onEditorMount}
        value={initialValue}
        height="100%"
        language="javascript"
        theme="vs-dark"
        options={{
          wordWrap: "on",
          showUnused: false,
          minimap: { enabled: false },
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};

export default CodeEditor;
