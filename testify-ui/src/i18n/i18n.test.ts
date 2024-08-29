import i18n from "./i18n";
import { translateLandingKey } from "./i18n-test-functions";

describe("i18n translations", () => {
	it("should initialize i18n with default language", () => {
		expect(i18n.language).toBe("en");
	});

	it("should change language to spanish", () => {
		i18n.changeLanguage("es");
		expect(i18n.language).toBe("es");
	});

	it("should be able to change to french", () => {
		i18n.changeLanguage("fr");
		expect(i18n.language).toBe("fr");
	});
});

describe("Landing Page Translations", () => {
	it("should translate the header title", () => {
		i18n.changeLanguage("en");
		const enTitle = translateLandingKey("fullHeading");
		expect(enTitle).toBe("Keep your Discord communities engaged and active with thanks to Testify.");
		i18n.changeLanguage("es");
		const esTitle = translateLandingKey("fullHeading");
		expect(esTitle).toBe("Mantenga sus comunidades de Discord comprometidas y activas gracias a Testify.");
		i18n.changeLanguage("fr");
		const frTitle = translateLandingKey("fullHeading");
		expect(frTitle).toBe("Gardez vos communautés Discord engagées et actives grâce à Testify.");
	});

	it("should translate the paragraph", () => {
		i18n.changeLanguage("en");
		const enParagraph = translateLandingKey("para");
		expect(enParagraph).toBe(
			"The only Discord bot your community will ever need. Testify is a feature-rich bot that will help with moderation, engagement, and more.",
		);
		i18n.changeLanguage("es");
		const esParagraph = translateLandingKey("para");
		expect(esParagraph).toBe(
			"El único bot de Discord que tu comunidad necesitará. Testify es un bot con muchas funciones que te ayudará con la moderación, la participación y más.",
		);
		i18n.changeLanguage("fr");
		const frParagraph = translateLandingKey("para");
		expect(frParagraph).toBe(
			"Le seul bot Discord dont votre communauté aura besoin. Testify est un bot riche en fonctionnalités qui vous aidera à modérer, à engager et bien plus encore.",
		);
	});

	it("should translate the button", () => {
		i18n.changeLanguage("en");
		const enButton = translateLandingKey("button");
		expect(enButton).toBe("Click to enter");
		i18n.changeLanguage("es");
		const esButton = translateLandingKey("button");
		expect(esButton).toBe("Haga clic para entrar");
		i18n.changeLanguage("fr");
		const frButton = translateLandingKey("button");
		expect(frButton).toBe("Cliquez pour entrer");
	});
});
