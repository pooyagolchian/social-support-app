import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import familyFinancialReducer from "./slices/familyFinancialSlice";
import personalInfoReducer from "./slices/personalInfoSlice";
import situationDescriptionReducer from "./slices/situationDescriptionSlice";

const persistConfig = {
	key: "root",
	storage,
};

const rootReducer = combineReducers({
	personalInfo: personalInfoReducer,
	familyFinancial: familyFinancialReducer,
	situationDescription: situationDescriptionReducer,
});

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
