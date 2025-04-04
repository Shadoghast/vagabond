import AdvancementModel from "./advancement.mjs";

/**
 * Culture describes the community that raised a hero
 */
export default class CultureModel extends AdvancementModel {
  /** @override */
  static metadata = Object.freeze({
    ...super.metadata,
    type: "culture",
    invalidActorTypes: ["npc"]
  });

  /** @override */
  static LOCALIZATION_PREFIXES = [
    "VAGABOND.Source",
    "VAGABOND.Item.base",
    "VAGABOND.Item.advancement",
    "VAGABOND.Item.Culture"
  ];
}
