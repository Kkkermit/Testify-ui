import { i18n } from "./index";

export function translateLandingKey(key: string) {
	return i18n.t(`landing.${key}`);
}
