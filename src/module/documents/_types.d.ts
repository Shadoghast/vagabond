import { ActiveEffectData, ActorData, ChatMessageData, CombatantData, CombatData, ItemData, JournalEntryPageData } from "../../../foundry/common/types.mjs"
import Collection from "../../../foundry/common/utils/collection.mjs"
import { ActiveEffect as ActiveEffectModels, Actor as ActorModels, ChatMessage as ChatMessageModels, Combat as CombatModels, Combatant as CombatantModels, Item as ItemModels } from "../data/_module.mjs"
import { VagabondActiveEffect } from "./active-effect.mjs"
import { VagabondCombatant } from "./combatant.mjs"
import { VagabondItem } from "./item.mjs"

// Collator for the types
type ActorModel = typeof ActorModels[Exclude<keyof typeof ActorModels, "BaseActorModel">];
type ItemModel = typeof ItemModels[Exclude<keyof typeof ItemModels, "BaseItemModel" | "AdvancementModel">];

declare global {
  interface Actor<Model extends ActorModel = ActorModel> extends ActorData {
    type: Model["metadata"]["type"];
    system: InstanceType<Model>;
    items: Collection<string, VagabondItem>;
    effects: Collection<string, VagabondActiveEffect>;
  }

  interface Item<Model extends ItemModel = ItemModel> extends ItemData {
    type: Model["metadata"]["type"];
    system: InstanceType<Model>;
    effects: Collection<string, VagabondActiveEffect>;
  }

  interface ActiveEffect extends ActiveEffectData {
    type: "base";
    system: ActiveEffectModels.BaseEffectModel;
  }
  interface ChatMessage extends ChatMessageData {
    type: "base" | "abilityUse";
    system: ChatMessageModels.BaseMessageModel | ChatMessageModels.AbilityUseModel;
  }

  interface Combat extends CombatData {
    type: "base";
    system: CombatModels.BaseCombatModel;
    combatants: Collection<string, VagabondCombatant>;
  }

  interface Combatant extends CombatantData {
    type: "base";
    system: CombatantModels.BaseCombatantModel;
  }

  interface JournalEntryPage extends JournalEntryPageData {
    type: "text" | "image" | "pdf" | "video";
    system: Record<string, unknown>;
  }
}
