import { VagabondActiveEffect } from "../../documents/active-effect.mjs";
import { VagabondCombat } from "../../documents/combat.mjs";

declare module "./base.mjs" {
  export default interface BaseEffectModel {
    parent: VagabondActiveEffect;
    end: {
      type: keyof typeof ds["CONFIG"]["effectEnds"] | "";
      roll: string;
    }
  }
}

/**
 * Duration interfaces
 * The foundry provided ones aren't as accurate as these
 */

export interface EffectDurationData {
  /** The world time when the active effect first started */
  startTime: number | null;
  /** The maximum duration of the effect, in seconds */
  seconds: number | null;
  /** The Combat in which the effect first started */
  combat: VagabondCombat | undefined;
  /** The maximum duration of the effect, in combat rounds */
  rounds: number | null;
  /** The maximum duration of the effect, in combat turns */
  turns: number | null;
  /** The round of the Combat in which the effect first started */
  startRound: number | null;
  /** The turn of the Combat in which the effect first started */
  startTurn: number | null;
}

export interface ActiveEffectDuration extends EffectDurationData {
  /**
   * The duration type, either "seconds", "turns", "none", or "vagabond"
   */
  type: "seconds" | "turns" | "none" | "vagabond";

  /**
   * The total effect duration, in seconds of world time or as a decimal
   * number with the format `{rounds}.{turns}`
   */
  duration: number | null;

  /**
   * The remaining effect duration, in seconds of world time or as a decimal
   * number with the format `{rounds}.{turns}`
   */
  remaining: number | null;

  /**
   * A formatted string label that represents the remaining duration
   */
  label: string;

  /**
   * An internal flag used determine when to recompute seconds-based duration
   */
  _worldTime: number;

  /**
   * An internal flag used determine when to recompute turns-based duration
   */
  _combatTime: number;
}
