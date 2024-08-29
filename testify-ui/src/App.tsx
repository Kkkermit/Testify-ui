import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/landing-page/landing";
import Home from "./components/home/home";

function App() {
	return (
		<>
			<div id="container" data-testid="render-ui">
				<Router>
					<Routes>
						<Route path="/" element={<Landing />} />
						<Route path="/home" element={<Home />} />
					</Routes>
				</Router>
			</div>
		</>
	);
}

export default App;
