import React, { useContext } from "react";
import "../../../styles/landing.css";
import { ThemeContext } from "./theme-context/theme-context";
import moonSVG from "../../../assets/moon-slider.svg";
import sunSVG from "../../../assets/sun-slider.svg";

const ThemeComponent: React.FC = () => {
	const { darkMode, toggleDarkMode } = useContext(ThemeContext);

	return (
		<>
			<div className="theme-container" data-testid="theme-container">
				<div className="theme-inner-container">
					<div className="theme-button-container">
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

export default ThemeComponent;
