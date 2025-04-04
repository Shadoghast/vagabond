import { VagabondCombatant } from "../../documents/combatant.mjs";

declare module "./base.mjs" {
  export default interface BaseCombatantModel {
    parent: VagabondCombatant;
    /** The combatant disposition. If defined, overrides the associated token dispositions */
    disposition: number | undefined;
  }
}
