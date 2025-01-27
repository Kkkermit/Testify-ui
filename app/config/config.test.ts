import { fetchGitHubVersion } from "../utils/github-api";
import botConfig from "./json/config.json";

jest.mock("../utils/github-api", () => ({
	fetchGitHubVersion: jest.fn(),
}));

describe("config", () => {
	let originalFetch: typeof global.fetch;

	beforeAll(() => {
		originalFetch = global.fetch;
	});

	beforeEach(() => {
		global.fetch = jest.fn();
		(fetchGitHubVersion as jest.Mock).mockResolvedValue("1.0.0");
		jest.resetModules();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	afterAll(() => {
		global.fetch = originalFetch;
	});

	it("should fetch bot info and update botInfo object", async () => {
		const mockBotResponse = {
			json: jest.fn().mockResolvedValue({
				name: "Testify",
				tag: "Testify#0000",
				clientId: "",
				commandCount: 0,
			}),
		};
		(global.fetch as jest.Mock).mockResolvedValue(mockBotResponse);

		const { botInfo, generateInviteUrl, config } = await import("./config");

		expect(global.fetch).toHaveBeenCalledWith("http://localhost:3001/api/bot");

		expect(botInfo).toEqual({
			name: "Testify",
			tag: "Testify#0000",
			clientId: "",
			commandCount: 0,
			version: "1.0.0",
		});

		expect(config).toEqual({
			name: "Testify",
			description: "A powerful Discord bot with moderation and fun features",
			tag: "Testify#0000",
			clientId: "",
			version: "1.0.0",
			urls: {
				invite: generateInviteUrl(""),
				support: botConfig.botSupportServer,
				github: botConfig.botGithubRepo,
				website: botConfig.websiteUrl,
			},
			social: {
				discord: botConfig.ownerDiscordProfile,
				github: botConfig.ownerGithubProfile,
			},
			stats: {
				commands: 0,
			},
			popularCommands: [],
		});
	});

	it("should log an error if fetching bot info fails", async () => {
		const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
		(global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

		await import("./config");

		await new Promise((resolve) => setTimeout(resolve, 0));

		expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to fetch bot info:", expect.any(Error));

		consoleErrorSpy.mockRestore();
	});
});
