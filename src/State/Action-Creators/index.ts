import { ActionType } from "../Action-Types";
import type { CellTypes } from "../Cell";
import type {
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,
  Direction,

} from "../Action";


import  type{ Dispatch } from "redux";
import bundle from "../../bundler";
import type {Action} from '../Action'


export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};
export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};
export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};
export const insertCellAfter = (
  id: string | null,
  CellTypes: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: CellTypes,
    },
  };
};
export const createBundle = (id: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: { id }
    });
    const result=await bundle(input)
    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: { id ,
        bundle:result
      }
    });
  };
};


