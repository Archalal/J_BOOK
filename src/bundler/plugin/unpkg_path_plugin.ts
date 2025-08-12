
import * as esbuild from "esbuild-wasm";




export const unpkgPathPlugin = () => {
  //that returns an obj
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /(index\.js$)/ }, () => {
        return { path: "index.js", namespace: "a" };
        
      });
      
      

      build.onResolve({ filter: /^\.+\// }, async (args: any) => {
        return {
          path: new URL(args.path, "http://unpkg.com" + args.resolveDir + "/")
            .href,
          namespace: "a",
        };
      });

      //any string

      build.onResolve({ filter: /.*/ }, async (args: any) => {
      

        return { path: `https://unpkg.com/${args.path}`, namespace: "a" };
      });

      
    },
  };
};
