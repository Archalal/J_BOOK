import React, { useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import './TestEditor.css'


const TestEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const refDiv = useRef<HTMLDivElement>(null);
  const [value,setValue]=useState<string>("# Header")
  useEffect(() => {
    const listener = (event: PointerEvent) => {
      if (refDiv.current && refDiv.current.contains(event.target as Node)) {
        return;
      }
      console.log(event.target);
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);
  
  
  return (
     <div ref={refDiv}>
      {editing ? (
        <MDEditor value={value} onChange={(e)=>setValue(e  ||"")} />
      ) : (
        <div className="card-content" onClick={() => setEditing(true)}>
          <MDEditor.Markdown source={value} />
        </div>
      )}
    </div>
  );
};

export default TestEditor;
