import { useSelector } from "react-redux";

 import type {TypedUseSelectorHook} from "react-redux"
 import type { RootState } from "../State";


 export const useTypedSelector:TypedUseSelectorHook<RootState>=useSelector