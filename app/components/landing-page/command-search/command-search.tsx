import React, { useState, useMemo } from "react";
import { debounce } from "lodash";
import "../../../styles/index.css";

interface Command {
	name: string;
	description: string;
	category?: string;
}

interface CommandSearchProps {
	commands: Command[];
}

const CommandCard: React.FC<Command> = ({ name, description, category }) => (
	<div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-all duration-300 transform hover:scale-[1.02] animate-fade-in">
		<h3 className="text-lg font-semibold text-blue-400 mb-2">{name}</h3>
		<p className="text-gray-300 text-sm">{description}</p>
		{category && (
			<span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-blue-600/20 text-blue-400">{category}</span>
		)}
	</div>
);

const CommandSearch: React.FC<CommandSearchProps> = ({ commands }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const [currentPage, setCurrentPage] = useState(1);
	const commandsPerPage = 9;

	const categories = useMemo(() => {
		const cats = new Set(commands.map((cmd) => cmd.category || "Uncategorized"));
		return ["all", ...Array.from(cats)];
	}, [commands]);

	const debouncedSearch = useMemo(
		() =>
			debounce((term: string) => {
				setSearchTerm(term);
				setCurrentPage(1);
			}, 300),
		[],
	);

	const filteredCommands = useMemo(() => {
		const term = searchTerm.toLowerCase();
		return commands.filter((command) => {
			const matchesSearch =
				command.name.toLowerCase().includes(term) || command.description.toLowerCase().includes(term);

			const matchesCategory =
				selectedCategory === "all" || command.category?.toLowerCase() === selectedCategory.toLowerCase();

			return matchesSearch && matchesCategory;
		});
	}, [commands, searchTerm, selectedCategory]);

	const totalPages = Math.ceil(filteredCommands.length / commandsPerPage);

	const handlePageChange = (pageNumber: number) => {
		const newPage = Math.max(1, Math.min(pageNumber, totalPages));
		setCurrentPage(newPage);
	};

	const currentCommands = useMemo(() => {
		const startIndex = (currentPage - 1) * commandsPerPage;
		const endIndex = Math.min(startIndex + commandsPerPage, filteredCommands.length);
		return filteredCommands.slice(startIndex, endIndex);
	}, [filteredCommands, currentPage]);

	return (
		<div className="w-full max-w-6xl mx-auto px-4 py-12">
			<div className="flex gap-4 mb-8">
				<div className="relative flex-1">
					<input
						type="text"
						placeholder="Search commands..."
						onChange={(e) => debouncedSearch(e.target.value)}
						className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white placeholder-gray-400 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
					/>
					<div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
				</div>
				<select
					value={selectedCategory}
					onChange={(e) => {
						setSelectedCategory(e.target.value);
						setCurrentPage(1);
					}}
					className="px-4 py-3 bg-gray-800 rounded-lg text-white border-none 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
                            cursor-pointer hover:bg-gray-700"
				>
					{categories.map((category) => (
						<option key={category} value={category.toLowerCase()}>
							{category.charAt(0).toUpperCase() + category.slice(1)}
						</option>
					))}
				</select>
			</div>

			{filteredCommands.length === 0 && (
				<div className="mt-4 mb-8 p-6 bg-gray-800 rounded-lg border border-gray-700 animate-fade-in">
					<div className="flex flex-col items-center justify-center">
						<svg className="w-12 h-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
						<p className="text-lg text-gray-400">No commands found matching your search</p>
						<p className="text-sm text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
					</div>
				</div>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[450px]">
				{currentCommands.map((command) => (
					<div key={command.name}>
						<CommandCard name={command.name} description={command.description} category={command.category} />
					</div>
				))}
			</div>

			{totalPages > 1 && (
				<div className="flex justify-center items-center gap-2 mt-8">
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
						aria-label="Previous page"
						className="px-4 py-2 rounded-lg bg-gray-800 text-white disabled:opacity-50 
                    disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path
								fillRule="evenodd"
								d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
					<span className="text-gray-400">
						Page {currentPage} of {totalPages}
					</span>
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						aria-label="Next page"
						className="px-4 py-2 rounded-lg bg-gray-800 text-white disabled:opacity-50 
                    disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path
								fillRule="evenodd"
								d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</div>
			)}
		</div>
	);
};

export default CommandSearch;
