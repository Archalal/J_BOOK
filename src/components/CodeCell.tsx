import { useEffect } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizeable from "./Resizeable";
import type { Cell } from "../State";
import { useActions } from "../Hooks/UseAction";
import { useTypedSelector } from "../Hooks/Use-TypedSelector";




interface CodeCellProps{
  cell:Cell
}

const CodeCell:React.FC<CodeCellProps>=({cell})=>{
  
  const{updateCell,createBundle}=useActions()
  const bundle=useTypedSelector((state)=>state.bundle[cell.id])
  
  console.log(bundle);
  
 

  
  useEffect(() => {
  const timer = setTimeout(async () => {
    // console.log("hello",cell.content)
    // const output = await bundle(cell.content);
    createBundle(cell.id,cell.content)
   
   
  }, 1000);

  return () => {
    clearTimeout(timer);
  };
}, [cell.content,cell.id,createBundle]);


  
  
  
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
 <Preview
  code={bundle?.code || ""}
  errorMessage={bundle?.err || ""}
/>

   </div>

       

  </Resizeable>
  
    </>



  );
}

export default CodeCell;
