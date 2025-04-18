export default class BaseCombatModel extends foundry.abstract.TypeDataModel {
  /**
   * Key information about this Combat subtype
   */
  static metadata = Object.freeze({
    type: "base"
  });

  /** @override */
  static LOCALIZATION_PREFIXES = ["VAGABOND.Combat.base"];

  /** @override */
  static defineSchema() {
    return {};
  }
}
