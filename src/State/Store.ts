import { configureStore } from '@reduxjs/toolkit';
import reducers from './Reducers';
import { ActionType } from './Action-Types';

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true // already true by default
        }),
    devTools: true
});
store.dispatch({
    type:ActionType.INSERT_CELL_AFTER,
    payload:{
        id:null
,type:"code"    }
})

store.dispatch({
    type:ActionType.INSERT_CELL_AFTER,
    payload:{
        id:null
,type:"text"    }
})
console.log(store.getState())
export default store;
