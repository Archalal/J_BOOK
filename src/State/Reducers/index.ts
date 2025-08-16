import CellsReducer from './CellsReducer'
import { combineReducers } from 'redux';
import BundleReducer from './BundlesReducer'

const reducers=combineReducers({
    cells:CellsReducer,
    bundle:BundleReducer
})
export default reducers


export type RootState= ReturnType<typeof reducers>