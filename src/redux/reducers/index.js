import { combineReducers } from "redux";
import userReducer from "./userReducer";
import lessonReducer from "./lessonReducer";

const rootReducer = combineReducers({
  userReducer,
  lessonReducer,
});

export default rootReducer;
