import { ActionType } from "../Action-Types";
import type { CellTypes } from "../Cell";
import type { Action,UpdateCellAction,DeleteCellAction,
    MoveCellAction,InsertCellBeforeAction, 
    Direction} from '../Action'


export const updateCell=(id:string,content:string):UpdateCellAction=>{
        return{
            type:ActionType.UPDATE_CELL,
            payload:{
                id,content
            }
        }
}
export const deleteCell=(id:string):DeleteCellAction=>{
    return{
        type:ActionType.DELETE_CELL,
        payload:id
    }

}
export const moveCell=(id:string,direction:Direction):MoveCellAction=>{
    return{
        type:ActionType.MOVE_CELL,
        payload:{
            id,direction
        }
    }

}
export const insertCellBefore=(  id: string,CellTypes:CellTypes):InsertCellBeforeAction=>{
    return{
        type: ActionType.INSERT_CELL_BEFORE,
          payload: {
          id,type:CellTypes
           
          }
    }

}