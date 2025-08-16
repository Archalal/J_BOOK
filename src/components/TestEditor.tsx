import React, { useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import './TestEditor.css'
import type { Cell } from "../State";
import { useActions } from "../Hooks/UseAction";


interface TestEditorProps{
  cell:Cell
}
const TestEditor: React.FC<TestEditorProps> = ({cell}) => {
  const [editing, setEditing] = useState(false);
  const refDiv = useRef<HTMLDivElement>(null);
  const {updateCell}=useActions();
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
        <MDEditor value={cell.content} onChange={(e)=>updateCell(cell.id,e||"")} />
      ) : (
        <div className="card-content" onClick={() => setEditing(true)}  style={{border:"1px solid grey"}}>
          <MDEditor.Markdown source={cell.content||"Click to edit"} />
        </div>
      )}
    </div>
  );
};

export default TestEditor;
