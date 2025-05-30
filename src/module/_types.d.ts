import "./apps/_types";
import "./data/_types";
import "./documents/_types";
import { VagabondActor } from "./documents/actor.mjs";

import Advancement from "./documents/advancement/advancement.mjs";
import { VagabondChatMessage } from "./documents/chat-message.mjs";
import { PowerRoll } from "./rolls/power.mjs";

export interface AdvancementTypeConfiguration {
  /**
   * The advancement's document class.
   */
  dataModel: typeof Advancement;

  /**
   * What item types this advancement can be used with.
   */
  validItemTypes: Set<string>;

  /**
   * Should this advancement type be hidden in the selection dialog?
   */
  hidden?: boolean;
}

export interface PowerRollModifiers {
  edges: number;
  banes: number;
  bonuses: number;
}

export interface PowerRollTargets {
  uuid: string;
  modifiers: PowerRollModifiers;
}

export interface PowerRollPromptOptions {
  type: "ability" | "test";
  evaluation: "none" | "evaluate" | "message";
  modifiers: PowerRollModifiers;
  formula: string;
  actor: VagabondActor;
  data: Record<string, unknown>;
  skills: string[];
  targets: PowerRollTargets[],
  ability?: string,
  characteristic?: string
}

export interface PowerRollPrompt {
  rollMode: keyof typeof CONFIG["Dice"]["rollModes"];
  powerRolls: Array<PowerRoll | VagabondChatMessage | object>;
}
