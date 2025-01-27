export interface PopularCommand {
	name: string;
	uses: number;
	description: string;
}

export interface BotConfig {
	name: string;
	description: string;
	tag: string;
	clientId: string;
	version: string;
	urls: {
		invite: string;
		support: string;
		github: string;
		website: string;
	};
	social: {
		discord: string;
		twitter?: string;
		github?: string;
	};
	stats: {
		commands: number;
	};
	popularCommands: PopularCommand[];
}
