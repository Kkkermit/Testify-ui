import React from "react";
import Header from "./header/header";

const Landing: React.FC = () => {
	return (
		<>
			<div className="landing-container" data-testid="landing-container">
				<div className="landing-header-container" data-testid="landing-header-container">
					<Header />
				</div>
			</div>
		</>
	);
};

export default Landing;
