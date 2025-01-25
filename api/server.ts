import express from "express";
import { Client, GatewayIntentBits } from "discord.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const startTime = Date.now();

const app = express();
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

app.use(cors());
app.use(express.json());

let cachedStats = {
	servers: 0,
	users: 0,
	lastUpdated: Date.now(),
};

const updateCache = async () => {
	if (client.isReady()) {
		const guilds = await client.guilds.fetch();
		let totalUsers = 0;

		for (const guild of guilds.values()) {
			const fullGuild = await guild.fetch();
			totalUsers += fullGuild.memberCount;
		}

		cachedStats = {
			servers: guilds.size,
			users: totalUsers,
			lastUpdated: Date.now(),
		};
	}
};

app.get("/api/stats", async (_, res) => {
	res.json(cachedStats);
});

app.get("/api/bot", async (_, res) => {
	if (!client.user) return res.status(500).json({ error: "Bot not ready" });

	const commands = await client.application?.commands.fetch();

	res.json({
		name: client.user.username,
		tag: `${client.user.username}#${client.user.discriminator}`,
		avatar: client.user.displayAvatarURL(),
		verified: client.user.verified,
		createdAt: client.user.createdAt,
		commandCount: commands?.size || 0,
		clientId: client.user.id,
	});
});

const loadTime = Date.now() - startTime;
console.log(`                                                                                              `);
console.log(`  \x1b[1m\x1b[32mSERVER\x1b[0m \x1b[32mAPI server\x1b[0m ready in \x1b[1m${loadTime}\x1b[0m ms`);
console.log(`                                                                                              `);

client.once("ready", () => {
	console.log("  \x1b[1m\x1b[32m➜ \x1b[0m\x1b[1m Bot\x1b[0m:     bot has connected!");
	client.user?.setStatus("dnd");
	updateCache();
	setInterval(updateCache, 300000);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`  \x1b[1m\x1b[32m➜ \x1b[0m\x1b[1m Server\x1b[0m:  API running on port \x1b[0m\x1b[1m${PORT}\x1b[0m`);
	client.login(process.env.DISCORD_TOKEN);
});
