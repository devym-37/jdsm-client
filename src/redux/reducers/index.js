import { combineReducers } from "redux";
import userReducer from "./userReducer";
import lessonReducer from "./lessonReducer";
import coachReducer from "./coachReducer";

const rootReducer = combineReducers({
  userReducer,
  lessonReducer,
  coachReducer,
});

export default rootReducer;
