import { produce } from "immer";
import { ActionType } from "../Action-Types";

import type {Action} from '../Action'


interface bundleState{
    [key:string]:{
        loading:boolean,
        code:string,
        err:string
    }|undefined
}   

const initialState:bundleState={}

const reducer= produce((state:bundleState=initialState,action:Action):bundleState=>{
    switch(action.type){
        case ActionType.BUNDLE_START:
            state[action.payload.id]={
                loading:true,
                code:"",
                err:""
            }
        return state;
        case ActionType.BUNDLE_COMPLETE:
            state[action.payload.id]={
                loading:false,
                code:action.payload.bundle.code,
                err:action.payload.bundle.err
            }
            return state
        default:
            return state
        }

    },initialState)
export default reducer