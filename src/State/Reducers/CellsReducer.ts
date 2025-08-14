import { ActionType } from "../Action-Types";

import { Action } from "../Action";
import type { CellTypes } from "../Cell";
import { act } from "react";


interface CellsState{
    loading:boolean;
    error:string|null;
    order:string[]
    data:{
        [key:string]:CellTypes
    }
}

const initialState:CellsState={
    loading:false,
    error:null,
    order:[],
    data:{}
}

const reducer=(state:CellsState=initialState,action:Action):CellsState=>{
   switch(action.type){
    case ActionType.UPDATE_CELL:
    return state;
    case ActionType.DELETE_CELL:
    return state
    case ActionType.MOVE_CELL:
    return state
    case ActionType.INSERT_CELL_BEFORE:
    return state
    default:
        return state
   }
}

export default reducer