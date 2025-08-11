import { useEffect, useRef, useState } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugin/unpkg_path_plugin";
import { fetchPlugin } from "./plugin/fetch-plugin";
import CodeEditor from "./components/CodeEditor";


function App() {
  const [data, setData] = useState<string>("");
  const serviceRef = useRef(false);
  const iframe = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    startService();
  }, []);

  const startService = async () => {
    if (serviceRef.current) return;
    serviceRef.current = true;

    await esbuild.initialize({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.25.8/esbuild.wasm",
    });

    console.log("Esbuild initialized");
  };

  const CodeChange = async () => {
    if (!serviceRef.current) return;
    if (iframe.current) {
    iframe.current.srcdoc = html; 
}

   
    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(data)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });
  


    // Send compiled JS to iframe
    iframe.current?.contentWindow?.postMessage(result.outputFiles[0].text, "*");
  };

  const html = `
<html>
  <head></head>
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



  return ( 
    <>
   <div>
    <CodeEditor />
   </div>
      <textarea
        value={data}
       onChange={(e) => 
       
        setData(e.target.value)
      }

        placeholder="Write JS code here"
      ></textarea>
      <div>
        <button onClick={CodeChange}>Submit</button>
      </div>
        <iframe
    ref={iframe}
    sandbox="allow-scripts"
    srcDoc={html}
  
    title="preview"
  />

    </>
  );
}

export default App;
