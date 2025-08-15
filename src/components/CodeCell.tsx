import { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import bundle from "../bundler";
import Resizeable from "./Resizeable";
import type { Cell } from "../State";
import { useActions } from "../Hooks/UseAction";



interface CodeCellProps{
  cell:Cell
}

const CodeCell:React.FC<CodeCellProps>=({cell})=>{
  
  const[code,setCode]=useState("")
  const[error,setError]=useState("")

  const{updateCell}=useActions()
 

  
  useEffect(() => {
  const timer = setTimeout(async () => {
    const output = await bundle(cell.content);
    setCode(output.code);
    setError(output.err)
    console.log(output);
  }, 1000);

  return () => {
    clearTimeout(timer);
  };
}, [cell.content]);


  
  
  
// console.log(data,"first")



  return ( 
    <>
  <Resizeable  direction="vertical">
     <div style={{height:"100%",display:"flex",width:"100%",
        flexDirection:"row"
     }}>
  <Resizeable direction="horizontal">
      <CodeEditor initialValue={cell.content}  onChange={(value)=>updateCell(cell.id,value)}
    
  />
  </Resizeable>
   <Preview  code={code} errorMessage={error} />
   </div>

       

  </Resizeable>
  
    </>



  );
}

export default CodeCell;
