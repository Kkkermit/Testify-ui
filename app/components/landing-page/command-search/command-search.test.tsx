import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CommandSearch from "./command-search";

describe("CommandSearch", () => {
	const props = [
		{ name: "help", description: "Help Command", category: "Community" },
		{ name: "ban", description: "Ban Command", category: "Moderation" },
		{ name: "test", description: "Test Command" },
	];

	it("should render CommandSearch component", () => {
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

	it("should filter commands based on search term", async () => {
		render(<CommandSearch commands={props} />);
		const searchInput = screen.getByRole("textbox");
		fireEvent.change(searchInput, { target: { value: "help" } });

		await waitFor(() => {
			expect(screen.getByText("help")).toBeInTheDocument();
			expect(screen.queryByText("ban")).not.toBeInTheDocument();
			expect(screen.queryByText("test")).not.toBeInTheDocument();
		});
	});

	it("should filter commands based on category", async () => {
		render(<CommandSearch commands={props} />);
		const categorySelect = screen.getByRole("combobox");
		fireEvent.change(categorySelect, { target: { value: "community" } });

		await waitFor(() => {
			expect(screen.getByText("help")).toBeInTheDocument();
			expect(screen.queryByText("ban")).not.toBeInTheDocument();
			expect(screen.queryByText("test")).not.toBeInTheDocument();
		});
	});

	it("should paginate commands to next page", () => {
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

	it("should paginate commands to previous page", () => {
		const newProps = Array.from({ length: 20 }, (_, i) => ({
			name: `Command${i + 1}`,
			description: `Description${i + 1}`,
		}));
		render(<CommandSearch commands={newProps} />);
		const nextPageButton = screen.getByTestId("next-page-button");
		fireEvent.click(nextPageButton);
		expect(screen.getByText("Command10")).toBeInTheDocument();
		expect(screen.getByText("Command18")).toBeInTheDocument();
		expect(screen.queryByText("Command1")).not.toBeInTheDocument();
		const previousPageButton = screen.getByTestId("previous-page-button");
		fireEvent.click(previousPageButton);
		expect(screen.getByText("Command1")).toBeInTheDocument();
		expect(screen.getByText("Command9")).toBeInTheDocument();
		expect(screen.queryByText("Command10")).not.toBeInTheDocument();
	});

	it("should disable next page button on last page", () => {
		const newProps = Array.from({ length: 9 }, (_, i) => ({
			name: `Command${i + 1}`,
			description: `Description${i + 1}`,
		}));
		render(<CommandSearch commands={newProps} />);
		const nextPageButton = screen.queryByTestId("next-page-button");
		expect(nextPageButton).toBeFalsy();
	});

	it("should disable previous page button on first page", () => {
		const newProps = Array.from({ length: 9 }, (_, i) => ({
			name: `Command${i + 1}`,
			description: `Description${i + 1}`,
		}));
		render(<CommandSearch commands={newProps} />);
		const previousPageButton = screen.queryByTestId("previous-page-button");
		expect(previousPageButton).toBeFalsy();
	});

	it("should render no commands found message", async () => {
		render(<CommandSearch commands={props} />);
		const searchInput = screen.getByRole("textbox");
		fireEvent.change(searchInput, { target: { value: "random" } });

		await waitFor(() => {
			expect(screen.getByText("No commands found matching your search")).toBeInTheDocument();
			expect(screen.getByText("Try adjusting your search or filter criteria")).toBeInTheDocument();
		});
	});

	it("should render no commands found message when no commands are available", async () => {
		render(<CommandSearch commands={[]} />);
		await waitFor(() => {
			expect(screen.getByText("No commands found matching your search")).toBeInTheDocument();
			expect(screen.getByText("Try adjusting your search or filter criteria")).toBeInTheDocument();
		});
	});

	it("should render no commands found message when no commands are available after filtering", async () => {
		render(<CommandSearch commands={props} />);
		const searchInput = screen.getByRole("textbox");
		fireEvent.change(searchInput, { target: { value: "help" } });

		await waitFor(() => {
			expect(screen.getByText("help")).toBeInTheDocument();
			expect(screen.queryByText("ban")).not.toBeInTheDocument();
			expect(screen.queryByText("test")).not.toBeInTheDocument();
		});

		fireEvent.change(searchInput, { target: { value: "random" } });

		await waitFor(() => {
			expect(screen.getByText("No commands found matching your search")).toBeInTheDocument();
			expect(screen.getByText("Try adjusting your search or filter criteria")).toBeInTheDocument();
		});
	});

	it("should render no commands found message when no commands are available after filtering by category", async () => {
		render(<CommandSearch commands={props} />);
		const categorySelect = screen.getByRole("combobox");
		fireEvent.change(categorySelect, { target: { value: "community" } });

		await waitFor(() => {
			expect(screen.getByText("help")).toBeInTheDocument();
			expect(screen.queryByText("ban")).not.toBeInTheDocument();
			expect(screen.queryByText("test")).not.toBeInTheDocument();
		});

		fireEvent.change(categorySelect, { target: { value: "SomeCategory" } });

		await waitFor(() => {
			expect(screen.getByText("No commands found matching your search")).toBeInTheDocument();
			expect(screen.getByText("Try adjusting your search or filter criteria")).toBeInTheDocument();
		});
	});

	it("should render no commands found message when no commands are available after filtering by category and search term", async () => {
		render(<CommandSearch commands={props} />);
		const searchInput = screen.getByRole("textbox");
		fireEvent.change(searchInput, { target: { value: "help" } });

		await waitFor(() => {
			expect(screen.getByText("help")).toBeInTheDocument();
			expect(screen.queryByText("ban")).not.toBeInTheDocument();
			expect(screen.queryByText("test")).not.toBeInTheDocument();
		});

		const categorySelect = screen.getByRole("combobox");
		fireEvent.change(categorySelect, { target: { value: "Moderation" } });

		await waitFor(() => {
			expect(screen.getByText("No commands found matching your search")).toBeInTheDocument();
			expect(screen.getByText("Try adjusting your search or filter criteria")).toBeInTheDocument();
		});
	});

	it("should reset page number when search term changes", async () => {
		const newProps = Array.from({ length: 20 }, (_, i) => ({
			name: `Command${i + 1}`,
			description: `Description${i + 1}`,
		}));
		render(<CommandSearch commands={newProps} />);
		const searchInput = screen.getByRole("textbox");
		fireEvent.change(searchInput, { target: { value: "Command10" } });

		await waitFor(() => {
			expect(screen.getByText("Command10")).toBeInTheDocument();
			expect(screen.queryByText("Command1")).not.toBeInTheDocument();
		});
	});

	it("should reset page number when category changes", async () => {
		const newProps = Array.from({ length: 20 }, (_, i) => ({
			name: `Command${i + 1}`,
			description: `Description${i + 1}`,
		}));
		render(<CommandSearch commands={newProps} />);
		const categorySelect = screen.getByRole("combobox");
		fireEvent.change(categorySelect, { target: { value: "SomeCategory" } });

		await waitFor(() => {
			expect(screen.getByText("No commands found matching your search")).toBeInTheDocument();
			expect(screen.getByText("Try adjusting your search or filter criteria")).toBeInTheDocument();
		});
	});
});
