import {systemPath} from "../../constants.mjs";
import AdvancementModel from "./advancement.mjs";

/**
 * A complication is an optional feature that provides both a positive benefit and a negative drawback
 */
export default class ComplicationModel extends AdvancementModel {
  /** @override */
  static metadata = Object.freeze({
    ...super.metadata,
    type: "complication",
    invalidActorTypes: ["npc"]
  });

  /** @override */
  static LOCALIZATION_PREFIXES = [
    "VAGABOND.Source",
    "VAGABOND.Item.base",
    "VAGABOND.Item.advancement",
    "VAGABOND.Item.Complication"
  ];
}
