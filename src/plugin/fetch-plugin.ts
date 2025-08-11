import axios from "axios";
import * as esbuild from "esbuild-wasm";
import localforage from "localforage";

const fileCache = localforage.createInstance({
  //db name
  name: "filecache",
});

export const fetchPlugin = (input: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {


      build.onLoad({ filter: /(^index\.js$)/ },async (args:any) => {
         const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        if (cachedResult) {
          return cachedResult;
        }
        return {
          loader: "jsx",
          contents: input,
        };
        
      });



      build.onLoad({ filter: /.css$/ }, async (args: any) => {
       

        const { data, request } = await axios.get(args.path);
      

        const escape = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents =
          ` const style=document.createElement("style");
        style.innerText='${escape}';document.head.appendChild(style)`
            ;

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);
        return result;
      });



      build.onLoad({ filter: /.*/ }, async (args: any) => {
      
        const { data, request } = await axios.get(args.path);
       
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents:data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
