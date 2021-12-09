import { combineReducers } from "redux";
import authReducer from "./authReducer";
import leagueReducer from "./leagueReducer";
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from "redux-firestore";
import storingReducer from "./storingReducer";

const rootReducer = combineReducers({
    auth : authReducer,
    league: leagueReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    store:storingReducer,
})

export default rootReducer;