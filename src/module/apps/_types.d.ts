import * as documents from "../documents/_module.mjs";
import * as data from "../data/_module.mjs";
declare module "./actor-sheet/base.mjs" {
  export default interface VagabondActorSheet {
    actor: documents.VagabondActor;
  }
}
declare module "./actor-sheet/character.mjs" {
  export default interface VagabondActorSheet {
    actor: documents.VagabondActor & {system: data.Actor.CharacterModel};
  }
}
declare module "./actor-sheet/npc.mjs" {
  export default interface VagabondActorSheet {
    actor: documents.VagabondActor & {system: data.Actor.NPCModel};
  }
}

declare module "./item-sheet.mjs" {
  export interface VagabondItemSheet {
    item: documents.VagabondItem;
  }
}

interface PowerRollDialogModifiers {
  edges: number;
  banes: number;
  bonuses: number;
  ability?: string;
  target?: string;
}

export interface PowerRollDialogPrompt {
  rolls: PowerRollDialogModifiers[];
  rollMode: keyof typeof CONFIG["Dice"]["rollModes"];
  damage?: string;
}

export interface ActorSheetItemContext {
  item: documents.VagabondItem;
  expanded: boolean;
  embed?: HTMLDivElement
}

interface ActorSheetAbilityContext extends ActorSheetItemContext {
  formattedLabels: Record<"keywords" | "distance" | "target", string>;
  order?: number;
}

export interface ActorSheetAbilitiesContext {
  label: string;
  abilities: ActorSheetAbilityContext[]
}

export interface ActorSheetEquipmentContext {
  label: string;
  equipment: ActorSheetItemContext[]
}
