import { render, screen } from "@testing-library/react";
import App from "./App";

describe("renders WeatherUi component for root route", () => {
	const renderIt = async () => {
		render(<App />);
	};

	it("should render the main div with id 'container'", async () => {
		const { container } = render(<App />);
		const containerElement = container.querySelector("#container");
		expect(containerElement).toBeInTheDocument();
	});

	it("should render the App component", async () => {
		await renderIt();
		const renderUi = screen.getByTestId("render-ui");
		expect(renderUi).toBeInTheDocument();
	});
});
