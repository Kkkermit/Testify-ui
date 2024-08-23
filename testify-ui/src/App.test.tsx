import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("renders WeatherUi component for root route", () => {
	const renderIt = async () => {
		render(<App />);
	};

	it("should render the main div as a container", async () => {
		const { container } = render(<App />);
		const containerElement = container.querySelector("div")?.classList.contains("container");
		expect(containerElement).toBeTruthy();
	});

	it("should render the App component", async () => {
		await renderIt();
		const weatherUiElement = screen.getByTestId("render-ui");
		expect(weatherUiElement).toBeInTheDocument();
		screen.debug();
	});
});
