import React, { Fragment, useMemo } from "react";
import { useTypedSelector } from "../Hooks/Use-TypedSelector";
import CellListItem from "./CellListItem";
import AddCell from "./AddCell";
import './CellList.css'
const CellList: React.FC = () => {
  const { order, data } = useTypedSelector((state) => state.cells);
 

  const cells = useMemo(() => {
    return order.map((id) => data[id]);
  }, [order, data]);

  
  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <AddCell forceVisible={false} previousCellId={cell.id} />
      <CellListItem cell={cell} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell  forceVisible={cells.length===0} previousCellId={null} />
      {renderedCells}
      
    </div>
  );
};

export default CellList;
