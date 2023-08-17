import { createStore } from "redux";
import { appReducer } from "./appRedux";

const store = createStore(appReducer);

export default store;
