import { VagabondCombat } from "../../documents/combat.mjs";

declare module "./base.mjs" {
  export default interface BaseCombatModel {
    parent: VagabondCombat;
  }
}
