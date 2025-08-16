import React, { Fragment, useMemo } from "react";
import { useTypedSelector } from "../Hooks/Use-TypedSelector";
import CellListItem from "./CellListItem";
import AddCell from "./AddCell";

const CellList: React.FC = () => {
  const { order, data } = useTypedSelector((state) => state.cells);
  console.log("order,data", order, data);

  const cells = useMemo(() => {
    return order.map((id) => data[id]);
  }, [order, data]);

  // console.log("cellll",cells);  //array of object [{data}]
  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <AddCell forceVisible={false} previousCellId={cell.id} />
      <CellListItem cell={cell} />
    </Fragment>
  ));

  return (
    <div>
      <AddCell  forceVisible={cells.length===0} previousCellId={null} />
      {renderedCells}
      
    </div>
  );
};

export default CellList;
