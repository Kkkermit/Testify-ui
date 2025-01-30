import { fetchGitHubVersion } from "../utils/github-api";
import botConfig from "./json/config.json" assert { type: "json" };
import { BotConfig } from "../types/types";

let botInfo = {
	name: "Testify",
	tag: "Testify#0000",
	commandCount: 0,
	version: "1.0.0",
	clientId: "",
};

(async () => {
	try {
		const [botResponse, version] = await Promise.all([fetch("http://localhost:3001/api/bot"), fetchGitHubVersion()]);

		const botData = await botResponse.json();
		botInfo = {
			...botData,
			version,
		};
	} catch (error) {
		console.error("Failed to fetch bot info:", error);
	}
})();

export const generateInviteUrl = (clientId: string) =>
	`https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=8&scope=applications.commands+bot`;

export const config: BotConfig = {
	name: botInfo.name,
	description: "A powerful Discord bot with moderation and fun features",
	tag: botInfo.tag,
	clientId: botInfo.clientId,
	version: botInfo.version,
	urls: {
		invite: generateInviteUrl(botInfo.clientId),
		support: botConfig.botSupportServer,
		github: botConfig.botGithubRepo,
		website: botConfig.websiteUrl,
	},
	social: {
		discord: botConfig.ownerDiscordProfile,
		github: botConfig.ownerGithubProfile,
	},
	stats: {
		commands: botInfo.commandCount,
	},
	popularCommands: [],
};

export default config;
