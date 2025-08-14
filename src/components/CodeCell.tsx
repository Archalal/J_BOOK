import { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import bundle from "../bundler";
import Resizeable from "./Resizeable";




const CodeCell=()=>{
  const [data, setData] = useState<string>("");
  const[code,setCode]=useState("")
  const[error,setError]=useState("")
 

  
  useEffect(() => {
  const timer = setTimeout(async () => {
    const output = await bundle(data);
    setCode(output.code);
    setError(output.err)
    console.log(output);
  }, 1000);

  return () => {
    clearTimeout(timer);
  };
}, [data]);


  
  
  
// console.log(data,"first")



  return ( 
    <>
  <Resizeable  direction="vertical">
     <div style={{height:"100%",display:"flex",width:"100%",
        flexDirection:"row"
     }}>
  <Resizeable direction="horizontal">
      <CodeEditor initialValue="const a=10"  onChange={(value)=>setData(value)}
    
  />
  </Resizeable>
   <Preview  code={code} errorMessage={error} />
   </div>

       

  </Resizeable>
  
    </>



  );
}

export default CodeCell;
