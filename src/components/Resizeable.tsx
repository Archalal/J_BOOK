import './resizeable.css'
import type { ReactNode } from "react";
import { ResizableBox } from "react-resizable";

interface resizableProps {
  direction: "horizontal" | "vertical";
  children: ReactNode;
}

const Resizeable: React.FC<resizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox height={300} width={Infinity}
    resizeHandles={['s']}>
      {children}
      
    </ResizableBox>
  );
};

export default Resizeable;
