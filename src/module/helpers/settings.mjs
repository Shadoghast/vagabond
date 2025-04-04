import {systemID} from "../constants.mjs";
import {HeroTokenModel, MaliceModel} from "../data/settings/_module.mjs";

/** @import {SettingConfig} from "../../../foundry/common/types.mjs" */

const fields = foundry.data.fields;

/**
 * Helper class for setting registration
 */
export default class VagabondSettingsHandler {
  /**
   * @type {Record<string, SettingConfig>}
   */
  static get systemSettings() {
    return {
      migrationVersion: {
        name: "VAGABOND.Setting.MigrationVersion.Label",
        hint: "VAGABOND.Setting.MigrationVersion.Hint",
        type: new fields.StringField({required: true}),
        default: "",
        scope: "world"
      },
      initiativeMode: {
        name: "VAGABOND.Combat.Initiative.Modes.Label",
        hint: "VAGABOND.Combat.Initiative.Modes.Hint",
        type: new fields.StringField({choices: ds.CONST.initiativeModes, initial: "default", required: true}),
        config: true,
        scope: "world"
      },
      heroTokens: {
        name: HeroTokenModel.label,
        hint: HeroTokenModel.hint,
        type: HeroTokenModel,
        scope: "world",
        default: {value: 0}
      },
      malice: {
        name: MaliceModel.label,
        hint: MaliceModel.hint,
        type: MaliceModel,
        scope: "world",
        default: {value: 0},
        onChange: MaliceModel.onChange
      }
    };
  }

  static registerSettings() {
    for (const [key, value] of Object.entries(this.systemSettings)) {
      game.settings.register(systemID, key, value);
    }
  }
}
