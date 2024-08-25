import { screen, render } from "@testing-library/react";
import Landing from "./landing";

describe("Landing Page", () => {
	const renderIt = async () => {
		render(<Landing />);
	};

	it("should render the landing page", async () => {
		await renderIt();
		const landingPage = screen.getByTestId("landing-container");
		expect(landingPage).toBeInTheDocument();
	});
});
