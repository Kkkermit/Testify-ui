import React from "react";
import "../../../styles/header.css";

const Header: React.FC = () => {
	return (
		<>
			<div className="header-main-container" data-testid="header-main-container">
				<header className="header-container">
					<h1 className="header">Testify</h1>
				</header>
			</div>
		</>
	);
};

export default Header;
