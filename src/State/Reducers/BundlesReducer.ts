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

const reducer= produce((state:bundleState=initialState,action:Action)=>{
    switch(action.type){
        case ActionType.BUNDLE_START:
            state[action.payload.id]={
                loading:true,
                code:"",
                err:""
            }
        break;
        case ActionType.BUNDLE_COMPLETE:
            state[action.payload.id]={
               loading: false,
                    code: action.payload.bundle.code,
                    err: action.payload.bundle.err
            }
             break;
        default:
             break;
        }

    },initialState)
export default reducer