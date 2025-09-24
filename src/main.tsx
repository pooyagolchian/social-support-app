import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { persistor, store } from "./store/store";
import "./index.css";
import "./App.css";
import "./i18n/config";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";

const rootElement = document.getElementById("root");
if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<ErrorBoundary>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<BrowserRouter>
							<App />
						</BrowserRouter>
					</PersistGate>
				</Provider>
			</ErrorBoundary>
		</React.StrictMode>,
	);
}
