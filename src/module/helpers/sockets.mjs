import {systemID} from "../constants.mjs";
import {VagabondChatMessage} from "../documents/chat-message.mjs";

export default class VagabondSocketHandler {
  constructor() {
    this.identifier = "system.vagabond";
    this.registerSocketHandlers();
  }

  /* -------------------------------------------------- */

  /**
   * Sets up socket reception
   */
  registerSocketHandlers() {
    game.socket.on(this.identifier, ({type, payload}) => {
      switch (type) {
        case "spendHeroToken":
          this.spendHeroToken(payload);
          break;
        default:
          throw new Error("Unknown type");
      }
    });
  }

  /* -------------------------------------------------- */

  /**
   * Emits a socket message to all other connected clients
   * @param {string} type
   * @param {object} payload
   */
  emit(type, payload) {
    game.socket.emit(this.identifier, {type, payload});
  }

  /**
   * Tell the GM to spend a hero token
   * @param {object} payload
   * @param {string} payload.userId
   * @param {string} payload.spendType
   * @param {string} payload.flavor
   */
  async spendHeroToken({userId, spendType, flavor}) {
    if (!game.user.isActiveGM) return;
    const sendingUser = game.users.get(userId);
    const sendingUsername = sendingUser?.name ?? userId;
    const tokenSpendConfiguration = ds.CONFIG.hero.tokenSpends[spendType];
    if (!tokenSpendConfiguration) {
      console.error(`Invalid spendType ${spendType} send by ${sendingUsername}`);
      return;
    }
    const settingName = "heroTokens";
    const heroTokens = game.settings.get(systemID, settingName).value;
    if (heroTokens < tokenSpendConfiguration.tokens) {
      ui.notifications.error("VAGABOND.Setting.HeroTokens.WarnDirectorBadSpend", {format: {name: sendingUsername}});
      return;
    }
    await game.settings.set(systemID, settingName, {value: heroTokens - tokenSpendConfiguration.tokens});
    await VagabondChatMessage.create({
      author: userId,
      content: tokenSpendConfiguration.messageContent,
      flavor: flavor ?? sendingUser?.character?.name
    });
  }
}
