import { useEffect } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizeable from "./Resizeable";
import type { Cell } from "../State";
import { useActions } from "../Hooks/UseAction";
import { useTypedSelector } from "../Hooks/Use-TypedSelector";
import "./CodeCell.css";
import { useCumulative } from "../Hooks/Use-Cummulative";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();

  const bundle = useTypedSelector((state) => state.bundle[cell.id]);//single code(editor+preview)

  const cumulativeResult = useCumulative(cell.id);
  

  useEffect(() => {
    let isMounted = true;

    const createBundleWithLoading = async () => {
      try {
        await createBundle(cell.id, cumulativeResult || "// Empty cell");
      } finally {
        if (!isMounted) return;
      }
    };

    // Run immediately if no bundle exists
    if (!bundle) {
      createBundleWithLoading();
      return;
    }

    // Debounce: run after 750ms when content changes
    const timer = setTimeout(() => {
      createBundleWithLoading();
    }, 750);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [cumulativeResult, cell.id, createBundle]);

  return (
    <Resizeable direction="vertical">
      <div
        style={{
          height: "100%",
          display: "flex",
          width: "100%",
          flexDirection: "row",
        }}
      >
        <Resizeable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizeable>

        <Preview code={bundle?.code || ""} errorMessage={bundle?.err || ""} />
      </div>
    </Resizeable>
  );
};

export default CodeCell;
