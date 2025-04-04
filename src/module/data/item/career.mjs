import {systemPath} from "../../constants.mjs";
import AdvancementModel from "./advancement.mjs";

/**
 * Careers describe what a hero did for a living before becoming a hero
 */
export default class CareerModel extends AdvancementModel {
  /** @override */
  static metadata = Object.freeze({
    ...super.metadata,
    type: "career",
    invalidActorTypes: ["npc"],
    detailsPartial: [systemPath("templates/item/partials/career.hbs")]
  });

  /** @override */
  static LOCALIZATION_PREFIXES = [
    "VAGABOND.Source",
    "VAGABOND.Item.base",
    "VAGABOND.Item.advancement",
    "VAGABOND.Item.Career"
  ];

  /** @override */
  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.renown = new fields.NumberField({integer: true});
    schema.projectPoints = new fields.NumberField({integer: true});

    return schema;
  }
}
