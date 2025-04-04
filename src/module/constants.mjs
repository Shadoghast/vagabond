export const systemID = "vagabond";
/**
 * Translates repository paths to Foundry Data paths
 * @param {string} path - A path relative to the root of this repository
 * @returns {string} The path relative to the Foundry data folder
 */
export const systemPath = (path) => `systems/${systemID}/${path}`;
export const ASCII = `
______                      _____ _            _
|  _  \\                    /  ___| |          | |
| | | |_ __ __ ___      __ \\ \`--.| |_ ___  ___| |
| | | | '__/ _\` \\ \\ /\\ / /  \`--. \\ __/ _ \\/ _ \\ |
| |/ /| | | (_| |\\ V  V /  /\\__/ / ||  __/  __/ |
|___/ |_|  \\__,_| \\_/\\_/   \\____/ \\__\\___|\\___|_|
`;

export const initiativeModes = Object.freeze({
  /** Players and Enemies alternate */
  default: "VAGABOND.Combat.Initiative.Modes.Default",
  /** Traditional "roll a die and go in roll order" */
  alternative: "VAGABOND.Combat.Initiative.Modes.Alternative"
});

/**
 * Effects that apply based on stamina value
 * @type {Record<string, {img: string, name: string, threshold: string | number}>}
 */
export const staminaEffects = Object.freeze({
  dying: {
    name: "VAGABOND.Effect.StaminaEffects.Dying",
    img: "icons/svg/stoned.svg",
    threshold: 0
  },
  winded: {
    name: "VAGABOND.Effect.StaminaEffects.Winded",
    img: "icons/svg/windmill.svg",
    threshold: "system.stamina.winded"
  }
});
