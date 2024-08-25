import React, { useContext } from "react";
import "../../styles/landing.css";
import { ThemeContext } from "./theme-provider/theme-context";
import moonSVG from "../../assets/moon-slider.svg";
import sunSVG from "../../assets/sun-slider.svg";

const Landing: React.FC = () => {
	const { darkMode, toggleDarkMode } = useContext(ThemeContext);

	return (
		<>
			<div className="landing-container" data-testid="landing-container">
				<div className="landing-inner-container">
					<div className="landing-theme-button-container">
						<label className="switch">
							<input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
							<span className="slider round">
								<span className="sun" style={{ backgroundImage: `url(${sunSVG})` }}></span>
								<span className="moon" style={{ backgroundImage: `url(${moonSVG})` }}></span>
							</span>
						</label>
					</div>
				</div>
			</div>
		</>
	);
};

export default Landing;
