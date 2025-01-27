import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CommandSearch from "./command-search";

describe("CommandSearch", () => {
	const props = [
		{ name: "help", description: "Help Command", category: "Community" },
		{ name: "ban", description: "Ban Command", category: "Moderation" },
		{ name: "test", description: "Test Command" },
	];

	it("renders CommandSearch component", () => {
		render(<CommandSearch commands={props} />);
		expect(screen.getByText("help")).toBeInTheDocument();
		expect(screen.getByText("Help Command")).toBeInTheDocument();
		expect(screen.getAllByText("Community")[1]).toBeInTheDocument();
		expect(screen.getByText("ban")).toBeInTheDocument();
		expect(screen.getByText("Ban Command")).toBeInTheDocument();
		expect(screen.getAllByText("Moderation")[1]).toBeInTheDocument();
		expect(screen.getByText("test")).toBeInTheDocument();
		expect(screen.getByText("Test Command")).toBeInTheDocument();
	});

	it("filters commands based on search term", async () => {
		render(<CommandSearch commands={props} />);
		const searchInput = screen.getByRole("textbox");
		fireEvent.change(searchInput, { target: { value: "help" } });

		await waitFor(() => {
			expect(screen.getByText("help")).toBeInTheDocument();
			expect(screen.queryByText("ban")).not.toBeInTheDocument();
			expect(screen.queryByText("test")).not.toBeInTheDocument();
		});
	});

	it("filters commands based on category", async () => {
		render(<CommandSearch commands={props} />);
		const categorySelect = screen.getByRole("combobox");
		fireEvent.change(categorySelect, { target: { value: "community" } });

		await waitFor(() => {
			expect(screen.getByText("help")).toBeInTheDocument();
			expect(screen.queryByText("ban")).not.toBeInTheDocument();
			expect(screen.queryByText("test")).not.toBeInTheDocument();
		});
	});

	it("paginates commands", () => {
		const newProps = Array.from({ length: 20 }, (_, i) => ({
			name: `Command${i + 1}`,
			description: `Description${i + 1}`,
		}));
		render(<CommandSearch commands={newProps} />);
		expect(screen.getByText("Command1")).toBeInTheDocument();
		expect(screen.getByText("Command9")).toBeInTheDocument();
		expect(screen.queryByText("Command10")).not.toBeInTheDocument();
		const nextPageButton = screen.getByTestId("next-page-button");
		fireEvent.click(nextPageButton);
		expect(screen.getByText("Command10")).toBeInTheDocument();
		expect(screen.getByText("Command18")).toBeInTheDocument();
		expect(screen.queryByText("Command1")).not.toBeInTheDocument();
	});
});
