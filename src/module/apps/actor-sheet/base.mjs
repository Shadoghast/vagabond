import AbilityModel from "../../data/item/ability.mjs";
import FeatureModel from "../../data/item/feature.mjs";
import {VagabondChatMessage} from "../../documents/chat-message.mjs";
import {VagabondItem} from "../../documents/item.mjs";
import {VagabondItemSheet} from "../item-sheet.mjs";

/** @import {FormSelectOption} from "../../../../foundry/client-esm/applications/forms/fields.mjs" */
/** @import {ActorSheetItemContext, ActorSheetAbilitiesContext} from "../_types.js" */

const {api, sheets} = foundry.applications;

/**
 * AppV2-based sheet for all actor classes
 */
export default class VagabondActorSheet extends api.HandlebarsApplicationMixin(
  sheets.ActorSheetV2
) {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["vagabond", "actor"],
    position: {
      width: 600,
      height: 600
    },
    actions: {
      toggleMode: this._toggleMode,
      viewDoc: this._viewDoc,
      createDoc: this._createDoc,
      deleteDoc: this._deleteDoc,
      toggleEffect: this._toggleEffect,
      roll: this._onRoll,
      useAbility: this._useAbility,
      toggleItemEmbed: this._toggleItemEmbed
    },
    // Custom property that's merged into `this.options`
    dragDrop: [{dragSelector: ".draggable", dropSelector: null}],
    form: {
      submitOnChange: true
    }
  };

  /** @override */
  static TABS = {
    primary: {
      tabs: [
        {id: "stats"},
        {id: "features"},
        {id: "equipment"},
        {id: "abilities"},
        {id: "effects"},
        {id: "biography"}
      ],
      initial: "stats",
      labelPrefix: "VAGABOND.Actor.Tabs"
    }
  };

  /**
   * Available sheet modes.
   * @enum {number}
   */
  static MODES = Object.freeze({
    PLAY: 1,
    EDIT: 2
  });

  /**
   * The mode the sheet is currently in.
   * @type {VagabondActorSheet.MODES}
   */
  #mode = VagabondActorSheet.MODES.PLAY;

  /**
   * A set of the currently expanded item ids
   * @type {Set<string>}
   */
  #expanded = new Set();

  /**
   * Is this sheet in Play Mode?
   * @returns {boolean}
   */
  get isPlayMode() {
    return this.#mode === VagabondActorSheet.MODES.PLAY;
  }

  /**
   * Is this sheet in Edit Mode?
   * @returns {boolean}
   */
  get isEditMode() {
    return this.#mode === VagabondActorSheet.MODES.EDIT;
  }

  /** @override */
  _configureRenderOptions(options) {
    super._configureRenderOptions(options);
    if (options.mode && this.isEditable) this.#mode = options.mode;
    // TODO: Refactor to use _configureRenderParts in v13
    if (this.document.limited) {
      options.parts = ["header", "tabs", "biography"];
    }
  }

  /* -------------------------------------------- */

  /** @override */
  async _prepareContext(options) {
    const context = Object.assign(await super._prepareContext(options), {
      isPlay: this.isPlayMode,
      // Validates both permissions and compendium status
      owner: this.document.isOwner,
      limited: this.document.limited,
      gm: game.user.isGM,
      // Add the actor document.
      actor: this.actor,
      // Add the actor's data to context.data for easier access, as well as flags.
      system: this.actor.system,
      systemSource: this.actor.system._source,
      flags: this.actor.flags,
      // Adding a pointer to ds.CONFIG
      config: ds.CONFIG,
      // Necessary for formInput and formFields helpers
      systemFields: this.document.system.schema.fields,
      datasets: this._getDatasets()
    });

    return context;
  }

  /** @override */
  async _preparePartContext(partId, context, options) {
    await super._preparePartContext(partId, context, options);
    switch (partId) {
      case "stats":
        context.characteristics = this._getCharacteristics();
        context.movement = this._getMovement();
        break;
      case "features":
        context.features = await this._prepareFeaturesContext();
        context.featureFields = FeatureModel.schema.fields;
        break;
      case "abilities":
        context.abilities = await this._prepareAbilitiesContext();
        context.abilityFields = AbilityModel.schema.fields;
        break;
      case "biography":
        context.languages = this._getLanguages();
        context.enrichedBiography = await TextEditor.enrichHTML(
          this.actor.system.biography.value,
          {
            secrets: this.document.isOwner,
            rollData: this.actor.getRollData(),
            relativeTo: this.actor
          }
        );
        context.enrichedGMNotes = await TextEditor.enrichHTML(
          this.actor.system.biography.gm,
          {
            secrets: this.document.isOwner,
            rollData: this.actor.getRollData(),
            relativeTo: this.actor
          }
        );
        break;
      case "effects":
        context.effects = this.prepareActiveEffectCategories();
        break;
    }
    if (partId in context.tabs) context.tab = context.tabs[partId];
    return context;
  }

  /**
   * @typedef {import("../../../../foundry/common/data/fields.mjs").NumberField} NumberField
   */

  /**
   * Constructs a record of valid characteristics and their associated field
   * @returns {Record<string, {field: NumberField, value: number}>}
   */
  _getCharacteristics() {
    const data = this.isPlayMode ? this.actor : this.actor._source;
    return Object.keys(ds.CONFIG.characteristics).reduce((obj, chc) => {
      obj[chc] = {
        field: this.actor.system.schema.getField(["characteristics", chc, "value"]),
        value: foundry.utils.getProperty(data, `system.characteristics.${chc}.value`)
      };
      return obj;
    }, {});
  }

  /**
   * Constructs a record of valid, non-null movements
   * @returns {Record<string, {field: NumberField, value: number}>}
   */
  _getMovement() {
    return Object.entries(this.actor.system.movement).reduce((obj, [key, mvmt]) => {
      if (mvmt !== null) obj[key] = {
        field: this.actor.system.schema.getField(["movement", key]),
        value: mvmt
      };
      return obj;
    }, {});
  }

  /**
   * Constructs an object with the actor's languages as well as all options available from CONFIG.VAGABOND.languages
   * @returns {{list: string, options: FormSelectOption[]}}
   */
  _getLanguages() {
    if (!this.actor.system.schema.getField("biography.languages")) return {list: "", options: []};
    const formatter = game.i18n.getListFormatter();
    const languageList = Array.from(this.actor.system.biography.languages).map(l => ds.CONFIG.languages[l]?.label ?? l);
    return {
      list: formatter.format(languageList),
      options: Object.entries(ds.CONFIG.languages).map(([value, {label}]) => ({value, label}))
    };
  }

  /**
   * Helper to compose datasets available in the hbs
   * @returns {Record<string, unknown>}
   */
  _getDatasets() {
    return {
      isSource: {source: true},
      notSource: {source: false}
    };
  }

  /**
   * Generate the context data shared between item types
   * @param {VagabondItem} item
   * @returns {ActorSheetItemContext}
   */
  async _prepareItemContext(item) {
    const context = {
      item,
      expanded: this.#expanded.has(item.id)
    };

    // only generate the item embed when it's expanded
    if (context.expanded) context.embed = await item.system.toEmbed({});

    return context;
  }

  /**
   * Prepare the context for features
   * @returns {Array<ActorSheetItemContext>}
   */
  async _prepareFeaturesContext() {
    const features = this.actor.itemTypes.feature.toSorted((a, b) => a.sort - b.sort);
    const context = [];

    for (const feature of features) {
      context.push(await this._prepareItemContext(feature));
    }

    return context;
  }

  /**
   * Prepare the context for ability categories and individual abilities
   * @returns {Record<keyof typeof ds["CONFIG"]["abilities"]["types"] | "other", ActorSheetAbilitiesContext>}
   */
  async _prepareAbilitiesContext() {
    const context = {};
    const abilities = this.actor.itemTypes.ability.toSorted((a, b) => a.sort - b.sort);

    // Prepare ability categories for each ability type
    for (const [type, config] of Object.entries(ds.CONFIG.abilities.types)) {
      // Don't show villain actions on non-NPC sheets
      if ((type === "villain") && (this.actor.type !== "npc")) continue;

      context[type] = {
        label: config.label,
        abilities: []
      };
    }

    // Adding here instead of the initial context declaration so that the "other" category appears last on the character sheet
    context["other"] = {
      label: game.i18n.localize("VAGABOND.Sheet.Other"),
      abilities: []
    };

    // Prepare the context for each individual ability
    for (const ability of abilities) {
      const type = context[ability.system.type] ? ability.system.type : "other";

      const abilityContext = await this._prepareItemContext(ability);
      abilityContext.formattedLabels = ability.system.formattedLabels;

      // add the order to the villain action based on the current # of villain actions in the context
      if (type === "villain") {
        const villainActionCount = context[type].abilities.length;
        abilityContext.order = villainActionCount + 1;
      }

      context[type].abilities.push(abilityContext);
    }

    return context;
  }

  /**
   * @typedef ActiveEffectCategory
   * @property {string} type                 - The type of category
   * @property {string} label                - The localized name of the category
   * @property {Array<ActiveEffect>} effects - The effects in the category
   */

  /**
   * Prepare the data structure for Active Effects which are currently embedded in an Actor or Item.
   * @return {Record<string, ActiveEffectCategory>} Data for rendering
   */
  prepareActiveEffectCategories() {
    /** @type {Record<string, ActiveEffectCategory>} */
    const categories = {
      temporary: {
        type: "temporary",
        label: game.i18n.localize("VAGABOND.Effect.Temporary"),
        effects: []
      },
      passive: {
        type: "passive",
        label: game.i18n.localize("VAGABOND.Effect.Passive"),
        effects: []
      },
      inactive: {
        type: "inactive",
        label: game.i18n.localize("VAGABOND.Effect.Inactive"),
        effects: []
      }
    };

    // Iterate over active effects, classifying them into categories
    for (const e of this.actor.allApplicableEffects()) {
      if (!e.active) categories.inactive.effects.push(e);
      else if (e.isTemporary) categories.temporary.effects.push(e);
      else categories.passive.effects.push(e);
    }

    // Sort each category
    for (const c of Object.values(categories)) {
      c.effects.sort((a, b) => (a.sort || 0) - (b.sort || 0));
    }
    return categories;
  }

  /* -------------------------------------------------- */
  /*   Application Life-Cycle Events                    */
  /* -------------------------------------------------- */

  /**
   * Actions performed after a first render of the Application.
   * Post-render steps are not awaited by the render process.
   * @param {ApplicationRenderContext} context      Prepared context data
   * @param {RenderOptions} options                 Provided render options
   * @protected
   */
  async _onFirstRender(context, options) {
    await super._onFirstRender(context, options);
    foundry.applications.ui.ContextMenu.create(this, this.element, "[data-document-class]", {hookName: "ItemButtonContext", jQuery: false, fixed: true});
  }

  /**
   * Get context menu entries for item buttons.
   * @returns {ContextMenuEntry[]}
   * @protected
   */
  _getItemButtonContextOptions() {
    // name is auto-localized
    return [
      //Ability specific options
      {
        name: "VAGABOND.Item.Ability.SwapUsage.ToMelee",
        icon: "",
        condition: (target) => {
          let item = this._getEmbeddedDocument(target);
          return (item?.type === "ability") && (item?.system.distance.type === "meleeRanged") && (item?.system.damageDisplay === "ranged");
        },
        callback: async (target) => {
          const item = this._getEmbeddedDocument(target);
          if (!item) {
            console.error("Could not find item");
            return;
          }
          await item.update({"system.damageDisplay": "melee"});
          await this.render();
        }
      },
      {
        name: "VAGABOND.Item.Ability.SwapUsage.ToRanged",
        icon: "",
        condition: (target) => {
          let item = this._getEmbeddedDocument(target);
          return (item?.type === "ability") && (item?.system.distance.type === "meleeRanged") && (item?.system.damageDisplay === "melee");
        },
        callback: async (target) => {
          const item = this._getEmbeddedDocument(target);
          if (!item) {
            console.error("Could not find item");
            return;
          }
          await item.update({"system.damageDisplay": "ranged"});
          await this.render();
        }
      },
      // Kit specific options
      {
        name: "VAGABOND.Item.Kit.PreferredKit.MakePreferred",
        icon: "<i class=\"fa-solid fa-star\"></i>",
        condition: (target) => this._getEmbeddedDocument(target)?.type === "kit",
        callback: async (target) => {
          const item = this._getEmbeddedDocument(target);
          if (!item) {
            console.error("Could not find item");
            return;
          }
          await this.actor.update({"system.hero.preferredKit": item.id});
          await this.render();
        }
      },
      // All applicable options
      {
        name: "View",
        icon: "<i class=\"fa-solid fa-fw fa-eye\"></i>",
        condition: () => this.isPlayMode,
        callback: async (target) => {
          const item = this._getEmbeddedDocument(target);
          if (!item) {
            console.error("Could not find item");
            return;
          }
          await item.sheet.render({force: true, mode: VagabondItemSheet.MODES.PLAY});
        }
      },
      {
        name: "Edit",
        icon: "<i class=\"fa-solid fa-fw fa-edit\"></i>",
        condition: () => this.isEditMode,
        callback: async (target) => {
          const item = this._getEmbeddedDocument(target);
          if (!item) {
            console.error("Could not find item");
            return;
          }
          await item.sheet.render({force: true, mode: VagabondItemSheet.MODES.EDIT});
        }
      },
      {
        name: "VAGABOND.Item.base.share",
        icon: "<i class=\"fa-solid fa-fw fa-share-from-square\"></i>",
        callback: async (target) => {
          const item = this._getEmbeddedDocument(target);
          if (!item) {
            console.error("Could not find item");
            return;
          }
          await VagabondChatMessage.create({
            content: `@Embed[${item.uuid} caption=false]`,
            speaker: VagabondChatMessage.getSpeaker({actor: this.actor})
          });
        }
      },
      {
        name: "Delete",
        icon: "<i class=\"fa-solid fa-fw fa-trash\"></i>",
        condition: () => this.actor.isOwner,
        callback: async (target) => {
          const item = this._getEmbeddedDocument(target);
          if (!item) {
            console.error("Could not find item");
            return;
          }
          await item.deleteDialog();
        }
      }
    ];
  }

  /**
   * Actions performed after any render of the Application.
   * Post-render steps are not awaited by the render process.
   * @param {ApplicationRenderContext} context      Prepared context data
   * @param {RenderOptions} options                 Provided render options
   * @protected
   * @override
   */
  _onRender(context, options) {
    this.#dragDrop.forEach((d) => d.bind(this.element));
    this.#disableOverrides();
  }

  /* -------------------------------------------------- */
  /*   Actions                                          */
  /* -------------------------------------------------- */

  /**
   * Toggle Edit vs. Play mode
   *
   * @this VagabondActorSheet
   * @param {PointerEvent} event   The originating click event
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
   */
  static async _toggleMode(event, target) {
    if (!this.isEditable) {
      console.error("You can't switch to Edit mode if the sheet is uneditable");
      return;
    }
    this.#mode = this.isPlayMode ? VagabondActorSheet.MODES.EDIT : VagabondActorSheet.MODES.PLAY;
    this.render();
  }

  /**
   * Renders an embedded document's sheet in play or edit mode based on the actor sheet view mode
   *
   * @this VagabondActorSheet
   * @param {PointerEvent} event   The originating click event
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
   * @protected
   */
  static async _viewDoc(event, target) {
    const doc = this._getEmbeddedDocument(target);
    if (!doc) {
      console.error("Could not find document");
      return;
    }
    await doc.sheet.render({force: true, mode: this.#mode});
  }

  /**
   * Handles item deletion
   *
   * @this VagabondActorSheet
   * @param {PointerEvent} event   The originating click event
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
   * @protected
   */
  static async _deleteDoc(event, target) {
    const doc = this._getEmbeddedDocument(target);
    await doc.deleteDialog();
  }

  /**
   * Handle creating a new Owned Item or ActiveEffect for the actor using initial data defined in the HTML dataset
   *
   * @this VagabondActorSheet
   * @param {PointerEvent} event   The originating click event
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
   * @private
   */
  static async _createDoc(event, target) {
    const docCls = getDocumentClass(target.dataset.documentClass);
    const docData = {
      name: docCls.defaultName({type: target.dataset.type, parent: this.actor})
    };
    // Loop through the dataset and add it to our docData
    for (const [dataKey, value] of Object.entries(target.dataset)) {
      // These data attributes are reserved for the action handling
      if (["action", "documentClass", "renderSheet"].includes(dataKey)) continue;
      // Nested properties use dot notation like `data-system.prop`
      foundry.utils.setProperty(docData, dataKey, value);
    }

    await docCls.create(docData, {parent: this.actor, renderSheet: target.dataset.renderSheet});
  }

  /**
   * Determines effect parent to pass to helper
   *
   * @this VagabondActorSheet
   * @param {PointerEvent} event   The originating click event
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
   * @private
   */
  static async _toggleEffect(event, target) {
    const effect = this._getEmbeddedDocument(target);
    await effect.update({disabled: !effect.disabled});
  }

  /**
   * Handle clickable rolls.
   *
   * @this VagabondActorSheet
   * @param {PointerEvent} event   The originating click event
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
   * @protected
   */
  static async _onRoll(event, target) {
    event.preventDefault();
    const dataset = target.dataset;

    // Handle item rolls.
    switch (dataset.rollType) {
      case "characteristic":
        return this.actor.rollCharacteristic(dataset.characteristic);
    }
  }

  /**
   * Handle clickable rolls.
   *
   * @this VagabondActorSheet
   * @param {PointerEvent} event   The originating click event
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
   * @protected
   */
  static async _useAbility(event, target) {
    const item = this._getEmbeddedDocument(target);
    if (item?.type !== "ability") {
      console.error("This is not an ability!", item);
      return;
    }
    await item.system.use({event});
  }

  /**
   * Toggle the item embed between visible and hidden. Only visible embeds are generated in the HTML
   *
   * @this VagabondActorSheet
   * @param {PointerEvent} event   The originating click event
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
   * @protected
   */
  static async _toggleItemEmbed(event, target) {
    const {itemId} = target.closest(".item").dataset;

    if (this.#expanded.has(itemId)) this.#expanded.delete(itemId);
    else this.#expanded.add(itemId);

    const part = target.closest("[data-application-part]").dataset.applicationPart;
    this.render({parts: [part]});
  }

  /** Helper Functions */

  /**
   * Fetches the embedded document representing the containing HTML element
   *
   * @param {HTMLElement} target    The element subject to search
   * @returns {Item | ActiveEffect} The embedded Item or ActiveEffect
   */
  _getEmbeddedDocument(target) {
    const docRow = target.closest("[data-document-class]");
    if (docRow.dataset.documentClass === "Item") {
      return this.actor.items.get(docRow.dataset.itemId);
    } else if (docRow.dataset.documentClass === "ActiveEffect") {
      const parent =
        docRow.dataset.parentId === this.actor.id
          ? this.actor
          : this.actor.items.get(docRow?.dataset.parentId);
      return parent.effects.get(docRow?.dataset.effectId);
    } else return console.warn("Could not find document class");
  }

  /* -------------------------------------------------- */
  /*   Drag and Drop                                    */
  /* -------------------------------------------------- */

  /**
   * Define whether a user is able to begin a dragstart workflow for a given drag selector
   * @param {string} selector       The candidate HTML selector for dragging
   * @returns {boolean}             Can the current user drag this selector?
   * @protected
   */
  _canDragStart(selector) {
    // game.user fetches the current user
    return this.isEditable;
  }

  /**
   * Define whether a user is able to conclude a drag-and-drop workflow for a given drop selector
   * @param {string} selector       The candidate HTML selector for the drop target
   * @returns {boolean}             Can the current user drop on this selector?
   * @protected
   */
  _canDragDrop(selector) {
    // game.user fetches the current user
    return this.isEditable;
  }

  /**
   * Callback actions which occur at the beginning of a drag start workflow.
   * @param {DragEvent} event       The originating DragEvent
   * @protected
   */
  _onDragStart(event) {
    const docRow = event.currentTarget.closest("[data-document-class]");
    if ("link" in event.target.dataset) return;

    // Chained operation
    let dragData = this._getEmbeddedDocument(docRow)?.toDragData();

    if (!dragData) return;

    // Set data transfer
    event.dataTransfer.setData("text/plain", JSON.stringify(dragData));
  }

  /**
   * Callback actions which occur when a dragged element is over a drop target.
   * @param {DragEvent} event       The originating DragEvent
   * @protected
   */
  _onDragOver(event) {}

  /**
   * Callback actions which occur when a dragged element is dropped on a target.
   * @param {DragEvent} event       The originating DragEvent
   * @protected
   */
  async _onDrop(event) {
    const data = TextEditor.getDragEventData(event);
    const actor = this.actor;
    const allowed = Hooks.call("dropActorSheetData", actor, this, data);
    if (allowed === false) return;

    // Handle different data types
    switch (data.type) {
      case "ActiveEffect":
        return this._onDropActiveEffect(event, data);
      case "Actor":
        return this._onDropActor(event, data);
      case "Item":
        return this._onDropItem(event, data);
      case "Folder":
        return this._onDropFolder(event, data);
    }
  }

  /**
   * Handle the dropping of ActiveEffect data onto an Actor Sheet
   * @param {DragEvent} event                  The concluding DragEvent which contains drop data
   * @param {object} data                      The data transfer extracted from the event
   * @returns {Promise<ActiveEffect|boolean>}  The created ActiveEffect object or false if it couldn't be created.
   * @protected
   */
  async _onDropActiveEffect(event, data) {
    const aeCls = getDocumentClass("ActiveEffect");
    const effect = await aeCls.fromDropData(data);
    if (!this.actor.isOwner || !effect) return false;
    if (effect.target === this.actor)
      return this._onSortActiveEffect(event, effect);
    return aeCls.create(effect, {parent: this.actor});
  }

  /**
   * Handle a drop event for an existing embedded Active Effect to sort that Active Effect relative to its siblings
   *
   * @param {DragEvent} event
   * @param {ActiveEffect} effect
   */
  async _onSortActiveEffect(event, effect) {
    /** @type {HTMLElement} */
    const dropTarget = event.target.closest("[data-effect-id]");
    if (!dropTarget) return;
    const target = this._getEmbeddedDocument(dropTarget);

    // Don't sort on yourself
    if (effect.uuid === target.uuid) return;

    // Identify sibling items based on adjacent HTML elements
    const siblings = [];
    for (const el of dropTarget.parentElement.children) {
      const siblingId = el.dataset.effectId;
      const parentId = el.dataset.parentId;
      if (
        siblingId &&
        parentId &&
        ((siblingId !== effect.id) || (parentId !== effect.parent.id))
      )
        siblings.push(this._getEmbeddedDocument(el));
    }

    // Perform the sort
    const sortUpdates = SortingHelpers.performIntegerSort(effect, {
      target,
      siblings
    });

    // Split the updates up by parent document
    const directUpdates = [];

    const grandchildUpdateData = sortUpdates.reduce((items, u) => {
      const parentId = u.target.parent.id;
      const update = {_id: u.target.id, ...u.update};
      if (parentId === this.actor.id) {
        directUpdates.push(update);
        return items;
      }
      if (items[parentId]) items[parentId].push(update);
      else items[parentId] = [update];
      return items;
    }, {});

    // Effects-on-items updates
    for (const [itemId, updates] of Object.entries(grandchildUpdateData)) {
      await this.actor.items
        .get(itemId)
        .updateEmbeddedDocuments("ActiveEffect", updates);
    }

    // Update on the main actor
    return this.actor.updateEmbeddedDocuments("ActiveEffect", directUpdates);
  }

  /**
   * Handle dropping of an Actor data onto another Actor sheet
   * @param {DragEvent} event            The concluding DragEvent which contains drop data
   * @param {object} data                The data transfer extracted from the event
   * @returns {Promise<object|boolean>}  A data object which describes the result of the drop, or false if the drop was
   *                                     not permitted.
   * @protected
   */
  async _onDropActor(event, data) {
    if (!this.actor.isOwner) return false;
  }

  /* -------------------------------------------- */

  /**
   * Handle dropping of an item reference or item data onto an Actor Sheet
   * @param {DragEvent} event            The concluding DragEvent which contains drop data
   * @param {object} data                The data transfer extracted from the event
   * @returns {Promise<Item[]|boolean>}  The created or updated Item instances, or false if the drop was not permitted.
   * @protected
   */
  async _onDropItem(event, data) {
    if (!this.actor.isOwner) return false;
    const item = await VagabondItem.fromDropData(data);

    // Handle item sorting within the same Actor
    if (this.actor.uuid === item.parent?.uuid)
      return this._onSortItem(event, item);

    // Create the owned item
    return this._onDropItemCreate(item, event);
  }

  /**
   * Handle dropping of a Folder on an Actor Sheet.
   * The core sheet currently supports dropping a Folder of Items to create all items as owned items.
   * @param {DragEvent} event     The concluding DragEvent which contains drop data
   * @param {object} data         The data transfer extracted from the event
   * @returns {Promise<Item[]>}
   * @protected
   */
  async _onDropFolder(event, data) {
    if (!this.actor.isOwner) return [];
    const folder = await Folder.implementation.fromDropData(data);
    if (folder.type !== "Item") return [];
    const droppedItemData = await Promise.all(
      folder.contents.map(async (item) => {
        if (!(document instanceof Item)) item = await fromUuid(item.uuid);
        return item;
      })
    );
    return this._onDropItemCreate(droppedItemData, event);
  }

  /**
   * Handle the final creation of dropped Item data on the Actor.
   * This method is factored out to allow downstream classes the opportunity to override item creation behavior.
   * @param {object[]|object} itemData      The item data requested for creation
   * @param {DragEvent} event               The concluding DragEvent which provided the drop data
   * @returns {Promise<Item[]>}
   * @private
   */
  async _onDropItemCreate(itemData, event) {
    itemData = itemData instanceof Array ? itemData : [itemData];
    return this.actor.createEmbeddedDocuments("Item", itemData);
  }

  /**
   * Handle a drop event for an existing embedded Item to sort that Item relative to its siblings
   * @param {Event} event
   * @param {Item} item
   * @private
   */
  _onSortItem(event, item) {
    // Get the drag source and drop target
    const items = this.actor.items;
    const dropTarget = event.target.closest("[data-item-id]");
    if (!dropTarget) return;
    const target = items.get(dropTarget.dataset.itemId);

    // Don't sort on yourself
    if (item.id === target.id) return;

    // Identify sibling items based on adjacent HTML elements
    const siblings = [];
    for (let el of dropTarget.parentElement.children) {
      const siblingId = el.dataset.itemId;
      if (siblingId && (siblingId !== item.id))
        siblings.push(items.get(el.dataset.itemId));
    }

    // Perform the sort
    const sortUpdates = SortingHelpers.performIntegerSort(item, {
      target,
      siblings
    });
    const updateData = sortUpdates.map((u) => {
      const update = u.update;
      update._id = u.target._id;
      return update;
    });

    // Perform the update
    return this.actor.updateEmbeddedDocuments("Item", updateData);
  }

  /** The following pieces set up drag handling and are unlikely to need modification  */

  /**
   * Returns an array of DragDrop instances
   * @type {DragDrop[]}
   */
  get dragDrop() {
    return this.#dragDrop;
  }

  /**
   * Create drag-and-drop workflow handlers for this Application
   * @returns {DragDrop[]}     An array of DragDrop handlers
   * @private
   */
  #createDragDropHandlers() {
    return this.options.dragDrop.map((d) => {
      d.permissions = {
        dragstart: this._canDragStart.bind(this),
        drop: this._canDragDrop.bind(this)
      };
      d.callbacks = {
        dragstart: this._onDragStart.bind(this),
        dragover: this._onDragOver.bind(this),
        drop: this._onDrop.bind(this)
      };
      return new DragDrop(d);
    });
  }

  // This is marked as private because there's no real need
  // for subclasses or external hooks to mess with it directly
  #dragDrop = this.#createDragDropHandlers();

  /* -------------------------------------------------- */
  /*   Actor Override Handling                         */
  /* -------------------------------------------------- */

  /**
   * Disables inputs subject to active effects
   */
  #disableOverrides() {
    const flatOverrides = foundry.utils.flattenObject(this.actor.overrides);
    for (const override of Object.keys(flatOverrides)) {
      const input = this.element.querySelector(`[name="${override}"][data-source="false"]`);
      if (input) {
        input.disabled = true;
      }
    }
  }
}
