import SourceModel from "../models/source.mjs";

const fields = foundry.data.fields;

/**
 * A base item model that provides basic description and source metadata for an item instance
 */
export default class BaseItemModel extends foundry.abstract.TypeDataModel {
  /**
   * Key information about this item subtype
   * @type {import("./_types").ItemMetaData}
   */
  static metadata = Object.freeze({
    type: "base",
    invalidActorTypes: []
  });

  /** @override */
  static defineSchema() {
    const schema = {};

    schema.description = new fields.SchemaField(this.itemDescription());

    schema.source = new fields.EmbeddedDataField(SourceModel);

    /**
     * The Vagabond ID, indicating a unique game rules element
     */
    schema._dsid = new fields.StringField({blank: false});

    return schema;
  }

  /**
   * Helper function to fill in the `description` property
   * @protected
   * @returns {Record<string, fields["DataField"]}
   */
  static itemDescription() {
    return {
      value: new foundry.data.fields.HTMLField(),
      gm: new foundry.data.fields.HTMLField()
    };
  }

  /**
   * Convenient access to the item's actor.
   * @returns {import("../../documents/actor.mjs").VagabondActor}
   */
  get actor() {
    return this.parent.actor;
  }

  /** @override */
  prepareDerivedData() {
    this.source.prepareData(this.parent._stats?.compendiumSource ?? this.parent.uuid);
  }

  /**
   * Prepare derived item data that requires actor derived actor data to be available
   */
  preparePostActorPrepData() {}

  /** @override */
  async _preCreate(data, options, user) {
    const allowed = await super._preCreate(data, options, user);
    if (allowed === false) return false;

    if (this.constructor.metadata.invalidActorTypes?.includes(this.parent.actor?.type)) return false;

    if (!this._dsid) this.updateSource({_dsid: data.name.slugify({strict: true})});
  }

  /**
   * @override
   * @param {DocumentHTMLEmbedConfig} config
   * @param {EnrichmentOptions} options
   */
  async toEmbed(config, options = {}) {

    options.rollData ??= this.parent.getRollData();
    const enriched = await TextEditor.enrichHTML(this.description.value, options);

    const embed = document.createElement("div");
    embed.classList.add(this.parent.type);
    embed.innerHTML = enriched;

    return embed;
  }

  /**
   * Prepare type-specific data for the Item sheet.
   * @param {Record<string, unknown>} context  Sheet context data.
   * @returns {Promise<void>}
   */
  async getSheetContext(context) {}

  /**
   * Attach type-specific event listeners to details tab of the Item sheet.
   * @param {HTMLElement} htmlElement             The rendered HTML element for the part
   * @param {ApplicationRenderOptions} options    Rendering options passed to the render method
   * @protected
   */
  _attachPartListeners(htmlElement, options) {}

  /**
   * Perform item subtype specific modifications to the actor roll data
   * @param {object} rollData   Pointer to the roll data object
   */
  modifyRollData(rollData) {}
}
