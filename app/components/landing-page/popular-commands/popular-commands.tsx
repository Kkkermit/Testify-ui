import React, { useEffect, useState } from "react";
import { PopularCommand } from "../../../types/types";
import { fetchPopularCommands } from "../../../utils/api";

const PopularCommandsSection: React.FC = () => {
	const [commands, setCommands] = useState<PopularCommand[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadCommands = async () => {
			try {
				const data = await fetchPopularCommands();
				setCommands(data);
			} catch (err) {
				setError("Failed to load popular commands");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		loadCommands();
	}, []);

	if (loading) {
		return (
			<div className="flex gap-4 justify-center mb-8 animate-pulse">
				{[...Array(3)].map((_, i) => (
					<div key={i} className="bg-gray-800 rounded-lg p-4 w-64">
						<div className="h-6 bg-gray-700 rounded mb-2"></div>
						<div className="h-4 bg-gray-700 rounded w-3/4"></div>
					</div>
				))}
			</div>
		);
	}

	if (error) {
		return <div className="text-center text-red-400 p-4">{error}</div>;
	}

	return (
		<div className="mt-12 mb-8">
			<h2
				className="text-4xl font-bold mb-12 text-center
                    bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400
                    bg-[size:200%_auto] animate-[gradientMove_3s_ease-in-out_infinite]
                    bg-clip-text text-transparent"
			>
				Most Used Commands
			</h2>
			<div className="flex flex-wrap gap-6 justify-center">
				{commands.slice(0, 3).map((command) => (
					<div
						key={command.name}
						className="bg-gray-800 rounded-lg p-8 w-80 transform hover:scale-105 
                    transition-all duration-300 animate-fade-in"
					>
						<div className="flex items-center mb-4">
							<span className="text-xl font-semibold text-blue-400">/{command.name}</span>
							<span className="ml-auto text-sm text-gray-400">{command.uses.toLocaleString()} uses</span>
						</div>
						<p className="text-gray-300 text-base">{command.description}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default PopularCommandsSection;
