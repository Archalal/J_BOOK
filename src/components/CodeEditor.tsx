import MonacoEditor from '@monaco-editor/react'
import React from 'react'


const CodeEditor = () => {
  return (
    <div>
        <MonacoEditor  height={"500px"} language='javascript' theme="vs-dark"/>
    </div>
  )
}

export default CodeEditor