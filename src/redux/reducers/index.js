import { combineReducers } from "redux";
import memberReducer from "./memberReducer";
import lessonReducer from "./lessonReducer";
import coachReducer from "./coachReducer";

const rootReducer = combineReducers({
  memberReducer,
  lessonReducer,
  coachReducer,
});

export default rootReducer;
