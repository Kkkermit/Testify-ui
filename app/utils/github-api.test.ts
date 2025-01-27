import { fetchGitHubVersion } from "./github-api";

describe("fetchGitHubVersion", () => {
	beforeEach(() => {
		global.fetch = jest.fn();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("should return the latest version tag from GitHub", async () => {
		const mockResponse = {
			json: jest.fn().mockResolvedValue({ tag_name: "v2.0.0" }),
		};
		(global.fetch as jest.Mock).mockResolvedValue(mockResponse);

		const version = await fetchGitHubVersion();
		expect(version).toBe("v2.0.0");
		expect(global.fetch).toHaveBeenCalledWith("https://api.github.com/repos/Kkkermit/Testify/releases/latest");
	});

	it('should return "1.0.0" if the fetch fails', async () => {
		(global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

		const version = await fetchGitHubVersion();
		expect(version).toBe("1.0.0");
		expect(global.fetch).toHaveBeenCalledWith("https://api.github.com/repos/Kkkermit/Testify/releases/latest");
	});

	it('should return "1.0.0" if the response does not contain tag_name', async () => {
		const mockResponse = {
			json: jest.fn().mockResolvedValue({}),
		};
		(global.fetch as jest.Mock).mockResolvedValue(mockResponse);

		const version = await fetchGitHubVersion();
		expect(version).toBe("1.0.0");
		expect(global.fetch).toHaveBeenCalledWith("https://api.github.com/repos/Kkkermit/Testify/releases/latest");
	});
});
