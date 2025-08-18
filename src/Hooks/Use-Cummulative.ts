import { useTypedSelector } from "./Use-TypedSelector";

export const useCumulative = (cellid: string): string => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const showFunction = `
      import _React from "react";
      import _ReactDOM from "react-dom/client";

      var show = (value) => {
        const rootElement = document.querySelector('#root');
        
        if (typeof value === 'object') {
          if (value.$$typeof && value.props) {
            const root = _ReactDOM.createRoot(rootElement);
            root.render(value);
          } else {
            rootElement.innerHTML = '<pre>' + JSON.stringify(value, null, 2) + '</pre>';
          }
        } else {
          rootElement.innerHTML = value;
        }
      };
    `;

    const showNoop = `var show = () => {};`;

    const cumulativeCode: string[] = [];

    for (let c of orderedCells) {
      if (c.type !== "code") continue;

      if (c.id === cellid) {
        // Current cell → real show
        cumulativeCode.push(showFunction);
        cumulativeCode.push(`(function(){ ${c.content} })();`); // wrap current cell
        break; // stop after current cell
      } else {
        // Previous cells → no-op show
        cumulativeCode.push(showNoop);
        cumulativeCode.push(`(function(){ ${c.content} })();`); // wrap previous cells
      }
    }

    console.log("Cumulative Code for cell:", cellid, cumulativeCode);

    return cumulativeCode.join("\n");
  });
};
