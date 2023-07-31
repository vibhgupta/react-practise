import { combineReducers, applyMiddleware } from "redux";
import { todosReducer, isLoadingReducer } from "./reducers";
import { createStore } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = { todosReducer, isLoadingReducer };
const persistConfig = {
	key: "root",
	storage,
	stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const configureStore = () =>
	createStore(
		persistedReducer,
		// window.__REDUX_DEVTOOLS_EXTENSION__ &&
		// window.__REDUX_DEVTOOLS_EXTENSION__()
		composeWithDevTools(applyMiddleware(thunk))
	);
