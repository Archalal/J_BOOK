import { useState } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import bundle from "../bundler";
import Resizeable from "./Resizeable";




const CodeCell=()=>{
  const [data, setData] = useState<string>("");
  const[code,setCode]=useState("")
 

  

  const CodeChange = async () => {

    const output=await bundle(data)
    setCode(output)
    console.log(output);
    
  };
  
  




  return ( 
    <>
  <Resizeable  direction="vertical">
     <div style={{height:"100%",display:"flex",width:"100%",
        flexDirection:"row"
     }}>
    <CodeEditor initialValue="const a=10"  onChange={(value)=>setData(value)}
    
  />
   <Preview  code={code} />
   </div>

       

  </Resizeable>
  
    </>



  );
}

export default CodeCell;
