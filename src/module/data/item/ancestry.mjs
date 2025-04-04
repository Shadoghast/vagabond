import AdvancementModel from "./advancement.mjs";

/**
 * Ancestries describe how a hero was born and grant benefits from their anatomy and physiology
 */
export default class AncestryModel extends AdvancementModel {
  /** @override */
  static metadata = Object.freeze({
    ...super.metadata,
    type: "ancestry",
    invalidActorTypes: ["npc"]
  });

  /** @override */
  static LOCALIZATION_PREFIXES = [
    "VAGABOND.Source",
    "VAGABOND.Item.base",
    "VAGABOND.Item.advancement",
    "VAGABOND.Item.Ancestry"
  ];
}
