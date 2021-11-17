import { combineReducers } from "redux";
import authReducer from './authReducer';
import popularLeagueReducer from "./popularLeagueReducer";

const rootReducer = combineReducers({
    auth : authReducer,
    popularLeague : popularLeagueReducer
})

export default rootReducer;