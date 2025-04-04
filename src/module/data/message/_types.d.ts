import { VagabondChatMessage } from "../../documents/chat-message.mjs";

declare module "./base.mjs" {
  export default interface BaseMessageModel {
    parent: VagabondChatMessage;
  }
}

declare module "./ability-use.mjs" {
  export default interface AbilityUseModel {
    uuid: string;
  }
}
