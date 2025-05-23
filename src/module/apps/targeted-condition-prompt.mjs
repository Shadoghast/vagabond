import {systemPath} from "../constants.mjs";

/** @import {ApplicationConfiguration} from "../../../foundry/client-esm/applications/_types.mjs" */

const {HandlebarsApplicationMixin, ApplicationV2} = foundry.applications.api;

/**
 * Prompt application for configuring the actor UUID that is causing a targeted condition
 */
export class TargetedConditionPrompt extends HandlebarsApplicationMixin(ApplicationV2) {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["vagabond", "targeted-condition-prompt"],
    tag: "form",
    form: {
      closeOnSubmit: true
    }
  };

  /** @override */
  static PARTS = {
    content: {
      template: systemPath("templates/active-effect/targeted-condition-prompt.hbs")
    }
  };

  /** @override */
  async _prepareContext(options) {
    const context = {
      ...this.options.context,
      target: this.target,
      condition: this.condition
    };

    return context;
  }

  /** 
   * The first target in the user targets 
   * @type {Token}
   */
  target = game.user.targets.first();

  /**
   * The hook ID for canceling the hook on close
   * @type {number}
   */
  hook;

  /** The condition label for the statusId */
  get condition() {
    return CONFIG.statusEffects.find(condition => condition.id === this.options.context.statusId)?.name ?? "";
  }

  /** @override */
  get title() {
    return game.i18n.format("VAGABOND.Effect.TargetedConditionPrompt.Title", {
      condition: this.condition
    });
  }

  /** @override */
  _onFirstRender(context, options) {
    this.hook = Hooks.on("targetToken", (user, token, active) => {
      if (!active) return;
      
      this.target = token;
      this.render(true);
    });
  }

  /** @override */
  _onClose(options) {
    Hooks.off("targetToken", this.hook);
  }

  /** 
   * Set a final context for resolving the prompt, then close the dialog 
   * @override
   */
  async _onSubmitForm(formConfig, event) {
    this.promptValue = this.target?.actor?.uuid;

    super._onSubmitForm(formConfig, event);
  }

  /**
   * Spawn a TargetedConditionPrompt and wait for and actor to be selected or closed.
   * @param {Partial<ApplicationConfiguration>} [options]
   * @returns {Promise<string | null>}      Resolves to the actor uuid of the actor imposing the condition or null
   */
  static async prompt(options) {
    return new Promise((resolve, reject) => {
      const dialog = new this(options);
      dialog.addEventListener("close", event => resolve(dialog.promptValue), {once: true});

      dialog.render({force: true});
    });
  }
}
