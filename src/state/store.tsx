import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from "./reducer";
import { thunkExtraArg } from "./actions";

const thunkMiddleware = thunk.withExtraArgument(thunkExtraArg);
const rootMiddleware = composeWithDevTools(applyMiddleware(thunkMiddleware));

export const store = createStore(rootReducer, undefined, rootMiddleware);