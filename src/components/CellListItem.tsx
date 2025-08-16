import React from 'react'
import type { Cell } from '../State'
import CodeCell from './CodeCell'
import  TextEditor from './TestEditor'
import ActionBar from './ActionBar'
import './CellListItem.css'

interface CellListItemProps{
  cell:Cell
}

const CellListItem:React.FC <CellListItemProps> = ({cell}) => {
  console.log("celllist item",cell.id)
  let child;
  if(cell.type==="code"){
    child=
   <> <div className='action-bar-wrapper'>
      <ActionBar id={cell.id }/>
   </div>
   <CodeCell  cell={cell}/></>
  }else{
    child=<>
  
      <ActionBar id={cell.id }/>
   
    <TextEditor cell={cell} />
  </>}
  return (
     <div className='cell-list-item'>
   {child}
  </div>
  )
}


export default CellListItem 