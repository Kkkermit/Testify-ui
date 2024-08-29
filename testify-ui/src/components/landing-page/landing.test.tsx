import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Landing from "./landing";
import { i18n } from "../../i18n/index";

describe("Landing Page", () => {
	const renderIt = async () => {
		render(
			<Router>
				<Landing />
			</Router>,
		);
	};

	it("should render the landing page", async () => {
		await renderIt();
		const landingPage = screen.getByTestId("landing-page");
		expect(landingPage).toBeInTheDocument();
	});

	it("should render the heading element", async () => {
		await renderIt();
		const heading = screen.getByRole("heading", { name: i18n.t("landing.fullHeading") });
		expect(heading).toBeInTheDocument();
	});

	it("should render the paragraph element", async () => {
		await renderIt();
		const paragraph = screen.getByRole("paragraph", { name: "" });
		expect(paragraph).toBeInTheDocument();
	});

	it("should render the button element", async () => {
		await renderIt();
		const link = screen.getByRole("link", { name: i18n.t("landing.button") });
		expect(link).toBeInTheDocument();
		fireEvent.click(link);
		expect(link).toHaveAttribute("href", "/home");
	});

	it("should render the svg element", () => {
		const { container } = render(
			<Router>
				<Landing />
			</Router>,
		);
		const allSvg = container.querySelectorAll("svg");
		const svg = container.querySelector("svg");
		expect(allSvg).toHaveLength(1);
		expect(svg).toBeInTheDocument();
	});
});
