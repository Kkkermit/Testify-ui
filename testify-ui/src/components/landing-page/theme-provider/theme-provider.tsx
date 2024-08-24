import React, { useState, useEffect } from "react";
import { ThemeContext } from "./theme-context";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [darkMode, setDarkMode] = useState(false);

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};

	useEffect(() => {
		document.body.className = darkMode ? "dark" : "light";
	}, [darkMode]);

	return <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</ThemeContext.Provider>;
};
