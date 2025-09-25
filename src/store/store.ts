import { combineReducers, configureStore, createAction } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import familyFinancialReducer from "./slices/familyFinancialSlice";
import personalInfoReducer from "./slices/personalInfoSlice";
import situationDescriptionReducer from "./slices/situationDescriptionSlice";

export const resetAllForms = createAction("RESET_ALL_FORMS");

const persistConfig = {
	key: "root",
	storage,
};

const appReducer = combineReducers({
	personalInfo: personalInfoReducer,
	familyFinancial: familyFinancialReducer,
	situationDescription: situationDescriptionReducer,
});

const rootReducer = (state: any, action: any) => {
	if (action.type === resetAllForms.type) {
		state = undefined;
	}
	return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
