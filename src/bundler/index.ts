// bundler.ts
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugin/unpkg_path_plugin";
import { fetchPlugin } from "./plugin/fetch-plugin";

// Initialize esbuild once when the module loads
esbuild
  .initialize({
    worker: true,
    wasmURL: "https://unpkg.com/esbuild-wasm@0.25.8/esbuild.wasm",
  })
  .then(() => {
    console.log("Esbuild initialized");
  })
  .catch((err) => {
    console.error("Failed to initialize esbuild", err);
  });

const bundle = async (rawcode: string) => {
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
    });
    return {code:result.outputFiles[0].text,
      err:""
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        code: "",
        err: err.message,
      };
    } else {
      throw err;
    }
  }
};
export default bundle;
