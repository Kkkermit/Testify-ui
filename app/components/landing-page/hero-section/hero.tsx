import React, { useEffect, useState } from "react";
import { fetchBotStats } from "../../../utils/api";
import config from "../../../config/config";
import "../../../styles/index.css";
import CommandSearch from "../command-search/command-search";

interface BotStats {
	servers: number;
	users: number;
	lastUpdated: number;
}

const LoadingStats = () => (
	<div className="flex gap-8 justify-center mb-8 animate-pulse">
		<div className="text-white">
			<div className="h-8 w-20 bg-gray-700 rounded mb-2"></div>
			<span className="text-gray-400">Servers</span>
		</div>
		<div className="text-white">
			<div className="h-8 w-20 bg-gray-700 rounded mb-2"></div>
			<span className="text-gray-400">Users</span>
		</div>
		<div className="text-white">
			<div className="h-8 w-20 bg-gray-700 rounded mb-2"></div>
			<span className="text-gray-400">Commands</span>
		</div>
	</div>
);

const HeroSection: React.FC = () => {
	const [stats, setStats] = useState<BotStats | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadStats = async () => {
			try {
				const data = await fetchBotStats();
				if (data.servers > 0 || data.users > 0) {
					setStats(data);
					setLoading(false);
				}
			} catch (error) {
				console.error("Failed to fetch stats:", error);
			}
		};

		loadStats();
		const interval = setInterval(loadStats, 5000);
		return () => clearInterval(interval);
	}, []);

	const isLoading = loading || !stats || (stats.servers === 0 && stats.users === 0);

	return (
		<div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-32 text-center px-4">
			<div className="animate-fade-in-up">
				<h1
					className="
						relative
						text-6xl md:text-7xl lg:text-8xl 
						font-bold 
						animate-bounce-in-down
						mb-6
						bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400
						bg-[size:200%_auto]
						animate-[gradientMove_3s_ease-in-out_infinite]
						bg-clip-text 
						text-transparent
						hover:scale-105
						transition-transform
						duration-300
						cursor-default
					"
				>
					{config.name}
				</h1>
				<p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">{config.description}</p>
				<p className="text-sm text-gray-400 mb-4">Version {config.version}</p>

				{isLoading ? (
					<LoadingStats />
				) : (
					<div className="flex gap-8 justify-center mb-8 animate-fade-in">
						<div className="text-white">
							<span className="block text-2xl font-bold">{stats?.servers.toLocaleString()}</span>
							<span className="text-gray-400">Servers</span>
						</div>
						<div className="text-white">
							<span className="block text-2xl font-bold">{stats?.users.toLocaleString()}</span>
							<span className="text-gray-400">Users</span>
						</div>
						<div className="text-white">
							<span className="block text-2xl font-bold">{config.stats.commands}</span>
							<span className="text-gray-400">Commands</span>
						</div>
					</div>
				)}

				<div className="flex gap-4 justify-center">
					<a
						href={config.urls.invite}
						target="_blank"
						rel="noopener noreferrer"
						className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all transform hover:scale-105"
					>
						Add to Discord
					</a>
					<a
						href={config.urls.support}
						target="_blank"
						rel="noopener noreferrer"
						className="px-8 py-3 rounded-full bg-transparent border-2 border-blue-600 text-blue-400 hover:bg-blue-600/10 font-medium transition-all transform hover:scale-105"
					>
						Support Server
					</a>
				</div>

				<div className="flex gap-4 justify-center mt-4">
					<a
						href={config.urls.github}
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-400 hover:text-white transition-colors"
					>
						GitHub
					</a>
					<a
						href={config.urls.website}
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-400 hover:text-white transition-colors"
					>
						Website
					</a>
					<a
						href={config.social.discord}
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-400 hover:text-white transition-colors"
					>
						Discord
					</a>
				</div>
			</div>
			<div className="mt-16 w-full">
				<CommandSearch
					commands={[
						{
							name: "/help",
							description: "Shows all available commands",
							category: "Utility",
						},
						{
							name: "/ping",
							description: "Check the bot's latency",
							category: "Utility",
						},
						{
							name: "/server",
							description: "Shows server information",
							category: "Utility",
						},
						{
							name: "/gelp",
							description: "Shows all available commands",
							category: "Utility",
						},
						{
							name: "/aing",
							description: "Check the bot's latency",
							category: "Utility",
						},
						{
							name: "/nerver",
							description: "Shows server information",
							category: "Utility",
						},
						{
							name: "/kelp",
							description: "Shows all available commands",
							category: "Utility",
						},
						{
							name: "/ning",
							description: "Check the bot's latency",
							category: "Utility",
						},
						{
							name: "/cerver",
							description: "Shows server information",
							category: "Utility",
						},
						{
							name: "/melp",
							description: "Shows all available commands",
							category: "Utility",
						},
						{
							name: "/qing",
							description: "Check the bot's latency",
							category: "Utility",
						},
						{
							name: "/merver",
							description: "Shows server information",
							category: "Moderation",
						},
						{
							name: "/lelp",
							description: "Shows all available commands",
							category: "Community",
						},
						{
							name: "/ging",
							description: "Check the bot's latency",
							category: "Utility",
						},
						{
							name: "/yerver",
							description: "Shows server information",
							category: "Utility",
						},
						{
							name: "/kkelp",
							description: "Shows all available commands",
							category: "Utility",
						},
						{
							name: "/uing",
							description: "Check the bot's latency",
							category: "Utility",
						},
						{
							name: "/berver",
							description: "Shows server information",
							category: "Utility",
						},
						{
							name: "/erelp",
							description: "Shows all available commands",
							category: "Utility",
						},
						{
							name: "/sding",
							description: "Check the bot's latency",
							category: "Utility",
						},
						{
							name: "/seasdrver",
							description: "Shows server information",
							category: "Utility",
						},
						{
							name: "/hsgelp",
							description: "Shows all available commands",
							category: "Utility",
						},
						{
							name: "/pidrgtng",
							description: "Check the bot's latency",
							category: "Utility",
						},
						{
							name: "/serawdver",
							description: "Shows server information",
							category: "Utility",
						},
					]}
				/>
			</div>
		</div>
	);
};

export default HeroSection;
