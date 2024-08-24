import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/index.css";
import Landing from "./components/landing-page/landing";
import { ThemeProvider } from "./components/landing-page/theme-provider/theme-provider";

function App() {
	return (
		<>
			<ThemeProvider>
				<div className="container" data-testid="render-ui">
					<Router>
						<Routes>
							<Route path="/" element={<Landing />} />
						</Routes>
					</Router>
				</div>
			</ThemeProvider>
		</>
	);
}

export default App;
