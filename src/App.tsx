import { Toaster } from "sonner";
import Layout from "./components/Layout";
import AppRouter from "./router/AppRouter";

function App() {
	return (
		<>
			<Layout>
				<AppRouter />
			</Layout>
			<Toaster
				position="top-center"
				richColors
				closeButton
				duration={4000}
			/>
		</>
	);
}

export default App;
