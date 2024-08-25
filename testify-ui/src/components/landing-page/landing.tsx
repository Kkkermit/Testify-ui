import React from "react";
import "../../styles/landing.css";
import Header from "./header/header";
import ThemeComponent from "./theme-provider/theme-checkbox";

const Landing: React.FC = () => {
	return (
		<>
			<div className="landing-container" data-testid="landing-container">
				<div className="landing-theme-button-container">
					<ThemeComponent />
				</div>
				<div className="landing-header-container" data-testid="landing-header-container">
					<Header />
				</div>
			</div>
		</>
	);
};

export default Landing;
