import { useEffect, useRef } from "react";
import './preview.css'

interface previewProps {
  code: string;
}

const html = `
<html>
  <head>
  <style>html{background-color:white}</style></head>
  <body>
    <div id="root"></div>
    <script>
      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
          
        
        } catch (err) {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color:red;">' + err + '</div>';
          console.log(err)
        }
      }, false);
    </script>
  </body>
</html>
`;
const Preview: React.FC<previewProps> = ({code}) => {
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
  return <div className="iframe-wrapper">
    <iframe 
  style={{height:"100%",width:"100%"}}
    ref={iframe}
    sandbox="allow-scripts"
    srcDoc={html}
    title="preview"/></div>;
};

export default Preview;
