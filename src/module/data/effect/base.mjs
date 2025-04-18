import FormulaField from "../fields/formula-field.mjs";

/**
 * A data model used by default effects with properties to control the expiration behavior
 */
export default class BaseEffectModel extends foundry.abstract.TypeDataModel {
  /**
   * Key information about this ActiveEffect subtype
   */
  static metadata = Object.freeze({
    type: "base"
  });

  /** @override */
  static LOCALIZATION_PREFIXES = ["VAGABOND.Effect.base"];

  /** @override */
  static defineSchema() {
    const fields = foundry.data.fields;
    const config = ds.CONFIG;
    return {
      end: new fields.SchemaField({
        type: new fields.StringField({choices: Object.keys(config.effectEnds), blank: true, required: true}),
        roll: new FormulaField({initial: "1d10"})
      })
    };
  }

  /**
   * An effect is also temporary if it has the `end` property set even though they have indeterminate lengths
   * @returns {boolean | null}
   * @internal
   */
  get _isTemporary() {
    if (this.end.type) return true;
    else return null;
  }

  /**
   * Returns the duration label appropriate to this model's `end` property
   * @returns {string}
   */
  get durationLabel() {
    return ds.CONFIG.effectEnds[this.end.type]?.abbreviation ?? "";
  }

  /** @import {ActiveEffectDuration, EffectDurationData} from "./_types" */

  /**
   * Subtype specific duration calculations
   * @returns {Omit<ActiveEffectDuration, keyof EffectDurationData> | null}
   * @internal
   */
  get _prepareDuration() {
    if (!this.end.type) return null;
    return {
      type: "vagabond",
      duration: null,
      remaining: null,
      label: this.durationLabel
    };
  }
}
