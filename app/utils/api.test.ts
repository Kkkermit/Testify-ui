import { fetchBotStats, fetchBotInfo, fetchPopularCommands } from "./api";

describe("API functions", () => {
	beforeEach(() => {
		global.fetch = jest.fn();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("fetchBotStats should return bot stats", async () => {
		const mockStats = { users: 100, messages: 200 };
		const mockResponse = {
			json: jest.fn().mockResolvedValue(mockStats),
		};
		(global.fetch as jest.Mock).mockResolvedValue(mockResponse);

		const stats = await fetchBotStats();
		expect(stats).toEqual(mockStats);
		expect(global.fetch).toHaveBeenCalledWith("http://localhost:3001/api/stats");
	});

	it("fetchBotInfo should return bot info", async () => {
		const mockInfo = { name: "TestBot", version: "1.0.0" };
		const mockResponse = {
			json: jest.fn().mockResolvedValue(mockInfo),
		};
		(global.fetch as jest.Mock).mockResolvedValue(mockResponse);

		const info = await fetchBotInfo();
		expect(info).toEqual(mockInfo);
		expect(global.fetch).toHaveBeenCalledWith("http://localhost:3001/api/bot");
	});

	it("fetchPopularCommands should return popular commands", async () => {
		const mockCommands = [{ name: "Command1" }, { name: "Command2" }];
		const mockResponse = {
			json: jest.fn().mockResolvedValue(mockCommands),
		};
		(global.fetch as jest.Mock).mockResolvedValue(mockResponse);

		const commands = await fetchPopularCommands();
		expect(commands).toEqual(mockCommands);
		expect(global.fetch).toHaveBeenCalledWith("http://localhost:3001/api/popular-commands");
	});
});
