import { createStore, combineReducers } from "redux";
import { globalReducer } from "../reducers/globalReducer";

/* eslint-disable no-underscore-dangle */
export const store = createStore(
    combineReducers({
        globalReducer
    })
);
/* eslint-enable */