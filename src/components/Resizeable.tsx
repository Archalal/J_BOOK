import './resizeable.css'
import { useEffect, useState, type ReactNode } from "react";
import { ResizableBox } from "react-resizable";
import type { ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children: ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  const[innerHeight,setHeight]=useState(window.innerHeight)
    const[innerWidth,setWidth]=useState(window.innerWidth)
    const[width,setWidthh]=useState(window.innerWidth*0.75)


  useEffect(()=>{
    let timer:any;
    const listener=()=>{
      if(timer){
        clearTimeout(timer)
      }
     timer= setTimeout(() => {
        setHeight(window.innerHeight);
      setWidth(window.innerWidth)
      if(window.innerWidth*0.75<width){
        setWidthh(window.innerWidth*0.75)
      }
        
      }, 100);
      
    }
    window.addEventListener('resize',listener)
    return()=>{
      window.removeEventListener('resize',listener)
    }
  },[])
  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      width: innerWidth * 0.75,
      height: Infinity,
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.9, Infinity],
      resizeHandles: ['e'],
      axis: 'x',
      onResizeStop:(event,data)=>{
        setWidthh(data.size.width)

      }
    };
  } else {
    resizableProps = {
      width: Infinity,
      height: 300,
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, innerHeight * 0.9],
      resizeHandles: ['s'],
      axis: 'y'
    };
  }

  return (
    <ResizableBox {...resizableProps}>
      <div style={{ width: '100%', height: '100%' }}>
        {children}
      </div>
    </ResizableBox>
  );
};

export default Resizable;