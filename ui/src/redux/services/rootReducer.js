import { combineReducers } from "redux";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import postReducer from "../features/post/postSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  post: postReducer,
});

export default rootReducer;
