import { useEffect, useRef } from "react";
import './preview.css'

interface previewProps {
  code: string;
  errorMessage:string;
}

const html = `
<html>
  <head>
  <style>html{background-color:white}</style></head>
  <body>
    <div id="root"></div>
    <script>
    const errorHandler=(err)=>{

    const root=document.querySelector('#root');
    root.innerHTML='<div style="color:red;">'+err+'</div>' ;
    }
    window.addEventListener('error',(event)=>{
    event.prevetDefault()
    errorHandler(event.error)})

      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
          
        
        } catch (err) {
         errorHandler(err)
         
          console.error(err)
        }
      }, false);
    </script>
  </body>
</html>
`;
const Preview: React.FC<previewProps> = ({code,errorMessage}) => {
    // console.log(code);
    
  const iframe = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    if (iframe.current) {
      iframe.current.srcdoc = html;
   setTimeout(() => {
       iframe.current?.contentWindow?.postMessage(code, "*");
   }, 50);
    }
  },[code]);
  return(
     <>
     <div className="iframe-wrapper">
    <iframe 
  style={{height:"100%",width:"100%"}}
    ref={iframe}
    sandbox="allow-scripts"
    srcDoc={html}
    title="preview"/>
    </div>
    {
      errorMessage&&<div className="preview-err">{errorMessage}</div>
    }
    </>
  )
};

export default Preview;
