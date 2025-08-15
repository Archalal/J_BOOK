import React, { useMemo } from 'react';
import { useTypedSelector } from '../Hooks/Use-TypedSelector';
import CellListItem from './CellListItem';

const CellList: React.FC = () => {
  const { order, data } = useTypedSelector((state) => state.cells);

  const cells = useMemo(() => {
    return order.map((id) => data[id]);
  }, [order, data]);

  console.log(cells);
  const renderedCells=cells.map(cell=> <CellListItem key={cell.id} cell={cell} />)

  return (
    <div>
      {renderedCells}
    </div>
  );
};

export default CellList;
