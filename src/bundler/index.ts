import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugin/unpkg_path_plugin";
import { fetchPlugin } from "./plugin/fetch-plugin";

let isInitialized = false;

const bundle = async (rawcode: string) => {
  if (!isInitialized) {
    await esbuild.initialize({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.25.8/esbuild.wasm",
    });
    isInitialized = true;
    console.log("Esbuild initialized");
  }

  try {
    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawcode)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
      jsxFactory:"_React.createElement",
      jsxFragment:"_React.Fragment"
    });

    return {
      code: result.outputFiles[0].text,
      err: "",
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        code: "",
        err: err.message,
      };
    }
    throw err;
  }
};

export default bundle;
