import * as documents from "./src/module/documents/_module.mjs";
import * as applications from "./src/module/apps/_module.mjs";
import * as helpers from "./src/module/helpers/_module.mjs";
import * as rolls from "./src/module/rolls/_module.mjs";
import * as data from "./src/module/data/_module.mjs";
import {VAGABOND} from "./src/module/config.mjs";
import * as DS_CONST from "./src/module/constants.mjs";

globalThis.ds = {
  documents,
  applications,
  helpers,
  rolls,
  data,
  CONST: DS_CONST,
  CONFIG: VAGABOND
};

Hooks.once("init", function () {
  CONFIG.VAGABOND = VAGABOND;
  game.system.socketHandler = new helpers.VagabondSocketHandler();
  helpers.VagabondSettingsHandler.registerSettings();

  // Assign document classes
  for (const docCls of Object.values(documents)) {
    if (!foundry.utils.isSubclass(docCls, foundry.abstract.Document)) continue;
    CONFIG[docCls.documentName].documentClass = docCls;
  }

  helpers.registerHandlebars();
  const templates = ["templates/item/embeds/ability.hbs", "templates/item/embeds/kit.hbs", "templates/item/embeds/project.hbs"].map(t => DS_CONST.systemPath(t));

  // Assign data models & setup templates
  for (const [doc, models] of Object.entries(data)) {
    if (!CONST.ALL_DOCUMENT_TYPES.includes(doc)) continue;
    for (const modelCls of Object.values(models)) {
      if (modelCls.metadata?.type) CONFIG[doc].dataModels[modelCls.metadata.type] = modelCls;
      if (modelCls.metadata?.detailsPartial) templates.push(...modelCls.metadata.detailsPartial);
    }
  }

  loadTemplates(templates);

  //Remove Status Effects Not Available in Vagabond
  const toRemove = ["bleeding", "bless", "burrow", "corrode", "curse", "degen", "disease", "upgrade", "fireShield", "fear", "holyShield", "hover", "coldShield", "magicShield", "paralysis", "poison", "prone", "regen", "restrain", "shock", "silence", "stun", "unconscious", "downgrade"];
  CONFIG.statusEffects = CONFIG.statusEffects.filter(effect => !toRemove.includes(effect.id));
  // Status Effect Transfer
  for (const [id, value] of Object.entries(VAGABOND.conditions)) {
    CONFIG.statusEffects.push({id, ...value});
  }
  for (const [id, value] of Object.entries(DS_CONST.staminaEffects)) {
    CONFIG.statusEffects.push({id, ...value});
  }

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet(DS_CONST.systemID, applications.VagabondCharacterSheet, {
    types: ["character"],
    makeDefault: true,
    label: "VAGABOND.Sheet.Labels.Character"
  });
  Actors.registerSheet(DS_CONST.systemID, applications.VagabondNPCSheet, {
    types: ["npc"],
    makeDefault: true,
    label: "VAGABOND.Sheet.Labels.NPC"
  });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet(DS_CONST.systemID, applications.VagabondItemSheet, {
    makeDefault: true,
    label: "VAGABOND.Sheet.Labels.Item"
  });
  foundry.applications.apps.DocumentSheetConfig.unregisterSheet(ActiveEffect, "core", foundry.applications.sheets.ActiveEffectConfig);
  foundry.applications.apps.DocumentSheetConfig.registerSheet(ActiveEffect, DS_CONST.systemID, applications.VagabondActiveEffectConfig, {
    makeDefault: true,
    label: "VAGABOND.Sheet.Labels.ActiveEffect"
  });

  // Register replacements for core UI elements
  Object.assign(CONFIG.ui, {
    combat: applications.VagabondCombatTracker
  });

  // Register dice rolls
  CONFIG.Dice.rolls = [rolls.DSRoll, rolls.PowerRoll, rolls.ProjectRoll, rolls.DamageRoll, rolls.SavingThrowRoll];
});

/**
 * Perform one-time pre-localization and sorting of some configuration objects
 */
Hooks.once("i18nInit", () => {
  helpers.utils.performPreLocalization(CONFIG.VAGABOND);
  // These fields are not auto-localized due to having a different location in en.json
  for (const model of Object.values(CONFIG.Actor.dataModels)) {
    /** @type {InstanceType<foundry["data"]["fields"]["SchemaField"]>} */
    const characteristicSchema = model.schema.getField("characteristics");
    if (characteristicSchema) {
      for (const [characteristic, {label, hint}] of Object.entries(ds.CONFIG.characteristics)) {
        const field = characteristicSchema.getField(`${characteristic}.value`);
        if (!field) continue;
        field.label = label;
        field.hint = hint;
      }
    }
    // Allows CONFIG.damageTypes to only have to define the name of the damage type once
    /** @type {InstanceType<foundry["data"]["fields"]["SchemaField"]>} */
    const damageSchema = model.schema.getField("damage");
    if (damageSchema) {
      for (const field of Object.values(damageSchema.fields.immunities.fields)) {
        if (field.label) {
          field.label = game.i18n.format("VAGABOND.Actor.base.FIELDS.damage.immunities.format", {type: game.i18n.localize(field.label)});
        }
      }
      for (const field of Object.values(damageSchema.fields.weaknesses.fields)) {
        if (field.label) {
          field.label = game.i18n.format("VAGABOND.Actor.base.FIELDS.damage.weaknesses.format", {type: game.i18n.localize(field.label)});
        }
      }
    }
  }
});

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once("ready", async function () {
  await data.migrations.migrateWorld();
  // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
  // Hooks.on("hotbarDrop", (bar, data, slot) => helpers.macros.createDocMacro(data, slot));
  Hooks.callAll("ds.ready");
  console.log(DS_CONST.ASCII);
});

/**
 * Render hooks
 */
Hooks.on("renderChatMessage", applications.hooks.renderChatMessage);
Hooks.on("renderCombatantConfig", applications.hooks.renderCombatantConfig);
Hooks.on("renderTokenConfig", applications.hooks.renderTokenConfig);

/**
 * Other hooks
 */
Hooks.on("diceSoNiceRollStart", helpers.diceSoNiceRollStart);
Hooks.on("hotReload", helpers.hotReload);
