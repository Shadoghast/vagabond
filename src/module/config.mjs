import {preLocalize} from "./helpers/utils.mjs";

/** @import {FormSelectOption} from "../../foundry/client-esm/applications/forms/fields.mjs" */

export const VAGABOND = {};

/**
 * The set of Characteristics used within the system.
 * These have special localization handling that checks for `VAGABOND.Actor.characteristics`.
 * The `label` is the full name (e.g. Might).
 * The `hint` is the short form in all caps (e.g. M).
 * @type {Record<string, {label: string; hint: string; rollKey: string}>}
 */
VAGABOND.characteristics = {
  might: {
    label: "VAGABOND.Actor.characteristics.might.full",
    hint: "VAGABOND.Actor.characteristics.might.abbreviation",
    rollKey: "M"
  },
  agility: {
    label: "VAGABOND.Actor.characteristics.agility.full",
    hint: "VAGABOND.Actor.characteristics.agility.abbreviation",
    rollKey: "A"
  },
  reason: {
    label: "VAGABOND.Actor.characteristics.reason.full",
    hint: "VAGABOND.Actor.characteristics.reason.abbreviation",
    rollKey: "R"
  },
  intuition: {
    label: "VAGABOND.Actor.characteristics.intuition.full",
    hint: "VAGABOND.Actor.characteristics.intuition.abbreviation",
    rollKey: "I"
  },
  presence: {
    label: "VAGABOND.Actor.characteristics.presence.full",
    hint: "VAGABOND.Actor.characteristics.presence.abbreviation",
    rollKey: "P"
  }
};
preLocalize("characteristics", {keys: ["label", "hint"]});

/**
 *
 * @type {Record<number, {label: string, levels: number[]}>}
 */
VAGABOND.echelons = {
  1: {
    label: "VAGABOND.Echelon.1",
    threshold: -Infinity
  },
  2: {
    label: "VAGABOND.Echelon.2",
    threshold: 4
  },
  3: {
    label: "VAGABOND.Echelon.3",
    threshold: 7
  },
  4: {
    label: "VAGABOND.Echelon.4",
    threshold: 10
  }
};
preLocalize("echelons", {key: "label"});

/**
 * Valid letter modifiers for size 1 creatures
 * @enum {{label: string}}
 */
VAGABOND.sizes = {
  T: {
    label: "VAGABOND.Actor.base.sizes.T"
  },
  S: {
    label: "VAGABOND.Actor.base.sizes.S"
  },
  M: {
    label: "VAGABOND.Actor.base.sizes.M"
  },
  L: {
    label: "VAGABOND.Actor.base.sizes.L"
  }
};
preLocalize("sizes", {key: "label"});

/**
 * Configuration information for damage types
 * @type {Record<string, {label: string}>}
 */
VAGABOND.damageTypes = {
  acid: {
    label: "VAGABOND.DamageTypes.Acid"
  },
  cold: {
    label: "VAGABOND.DamageTypes.Cold"
  },
  corruption: {
    label: "VAGABOND.DamageTypes.Corruption"
  },
  fire: {
    label: "VAGABOND.DamageTypes.Fire"
  },
  holy: {
    label: "VAGABOND.DamageTypes.Holy"
  },
  lightning: {
    label: "VAGABOND.DamageTypes.Lightning"
  },
  poison: {
    label: "VAGABOND.DamageTypes.Poison"
  },
  psychic: {
    label: "VAGABOND.DamageTypes.Psychic"
  },
  sonic: {
    label: "VAGABOND.DamageTypes.Sonic"
  }
};
preLocalize("damageTypes", {key: "label"});

/**
 * Condition definitions provided by the system that are merged in during the `init` hook
 * Afterwards all references *should* use the core-provided CONFIG.statusEffects
 * @type {Record<string, {
 *  img: string, 
 *  name: string, 
 *  rule: string, 
 *  targeted? boolean, 
 *  maxSources?: number, 
 *  defaultSpeed?: number, 
 *  restrictions?: Record<string, Set<string>>
 * }>}
 */
VAGABOND.conditions = {
  bleeding: {
    name: "VAGABOND.Effect.Conditions.Bleeding.name",
    img: "icons/svg/blood.svg",
    rule: "Compendium.vagabond.journals.JournalEntry.hDhdILCi65wpBgPZ.JournalEntryPage.YzgERGFhFphgpjKQ"
  },
  dazed: {
    name: "VAGABOND.Effect.Conditions.Dazed.name",
    img: "icons/svg/daze.svg",
    rule: "Compendium.vagabond.journals.JournalEntry.hDhdILCi65wpBgPZ.JournalEntryPage.K2dZpCsAOU7xMpWb",
    restrictions: {
      type: new Set(["freeManeuver", "triggered", "freeTriggered"])
    }
  },
  frightened: {
    name: "VAGABOND.Effect.Conditions.Frightened.name",
    img: "icons/svg/terror.svg",
    rule: "Compendium.vagabond.journals.JournalEntry.hDhdILCi65wpBgPZ.JournalEntryPage.bXiI9vUF3tF78qXg",
    targeted: true,
    maxSources: 1
  },
  grabbed: {
    name: "VAGABOND.Effect.Conditions.Grabbed.name",
    img: "systems/vagabond/assets/icons/hand-grabbing-fill.svg",
    rule: "Compendium.vagabond.journals.JournalEntry.hDhdILCi65wpBgPZ.JournalEntryPage.aWBP2vfXXM3fzuVn",
    targeted: true,
    restrictions: {
      dsid: new Set(["knockback"])
    }
  },
  prone: {
    name: "VAGABOND.Effect.Conditions.Prone.name",
    img: "icons/svg/falling.svg",
    rule: "Compendium.vagabond.journals.JournalEntry.hDhdILCi65wpBgPZ.JournalEntryPage.v11clsSMgoFZm3V8"
  },
  restrained: {
    name: "VAGABOND.Effect.Conditions.Restrained.name",
    img: "icons/svg/net.svg",
    rule: "Compendium.vagabond.journals.JournalEntry.hDhdILCi65wpBgPZ.JournalEntryPage.6IfH6beu8LjK08Oj",
    restrictions: {
      dsid: new Set(["stand-up"])
    }
  },
  slowed: {
    name: "VAGABOND.Effect.Conditions.Slowed.name",
    img: "systems/vagabond/assets/icons/snail.svg",
    rule: "Compendium.vagabond.journals.JournalEntry.hDhdILCi65wpBgPZ.JournalEntryPage.aFEwQG4OcYDNp8DL",
    defaultSpeed: 2
  },
  taunted: {
    name: "VAGABOND.Effect.Conditions.Taunted.name",
    img: "systems/vagabond/assets/icons/flag-banner-fold-fill.svg",
    rule: "Compendium.vagabond.journals.JournalEntry.hDhdILCi65wpBgPZ.JournalEntryPage.9zseFmXdcSw8MuKh",
    targeted: true,
    maxSources: 1
  },
  weakened: {
    name: "VAGABOND.Effect.Conditions.Weakened.name",
    img: "icons/svg/downgrade.svg",
    rule: "Compendium.vagabond.journals.JournalEntry.hDhdILCi65wpBgPZ.JournalEntryPage.QZpLhRT6imKlqZ1n"
  }
};

/**
 * Times when an effect can end
 * @enum {{label: string, abbreviation: string}}
 */
VAGABOND.effectEnds = {
  turn: {
    label: "VAGABOND.Effect.Ends.Turn.Label",
    abbreviation: "VAGABOND.Effect.Ends.Turn.Abbr"
  },
  save: {
    label: "VAGABOND.Effect.Ends.Save.Label",
    abbreviation: "VAGABOND.Effect.Ends.Save.Abbr"
  },
  encounter: {
    label: "VAGABOND.Effect.Ends.Encounter.Label",
    abbreviation: "VAGABOND.Effect.Ends.Encounter.Abbr"
  }
};
preLocalize("effectEnds", {keys: ["label", "abbreviation"]});

/**
 * Configuration information for skills
 * @type {{
 *  groups: Record<string, {label: string}>,
 *  list: Record<string, {label: string, group: string}>,
 *  optgroups: FormSelectOption[]
 * }}
 */
VAGABOND.skills = {
  groups: {
    crafting: {
      label: "VAGABOND.Skill.Group.Crafting"
    },
    exploration: {
      label: "VAGABOND.Skill.Group.Exploration"
    },
    interpersonal: {
      label: "VAGABOND.Skill.Group.Interpersonal"
    },
    intrigue: {
      label: "VAGABOND.Skill.Group.Intrigue"
    },
    lore: {
      label: "VAGABOND.Skill.Group.Lore"
    }
  },
  list: {
    alchemy: {
      label: "VAGABOND.Skill.List.Alchemy",
      group: "crafting"
    },
    architecture: {
      label: "VAGABOND.Skill.List.Architecture",
      group: "crafting"
    },
    blacskmithing: {
      label: "VAGABOND.Skill.List.Blacksmithing",
      group: "crafting"
    },
    fletching: {
      label: "VAGABOND.Skill.List.Fletching",
      group: "crafting"
    },
    forgery: {
      label: "VAGABOND.Skill.List.Forgery",
      group: "crafting"
    },
    jewelry: {
      label: "VAGABOND.Skill.List.Jewelry",
      group: "crafting"
    },
    mechanics: {
      label: "VAGABOND.Skill.List.Mechanics",
      group: "crafting"
    },
    tailoring: {
      label: "VAGABOND.Skill.List.Tailoring",
      group: "crafting"
    },
    climb: {
      label: "VAGABOND.Skill.List.Climb",
      group: "exploration"
    },
    drive: {
      label: "VAGABOND.Skill.List.Drive",
      group: "exploration"
    },
    endurance: {
      label: "VAGABOND.Skill.List.Endurance",
      group: "exploration"
    },
    gymnastics: {
      label: "VAGABOND.Skill.List.Gymnastics",
      group: "exploration"
    },
    heal: {
      label: "VAGABOND.Skill.List.Heal",
      group: "exploration"
    },
    jump: {
      label: "VAGABOND.Skill.List.Jump",
      group: "exploration"
    },
    lift: {
      label: "VAGABOND.Skill.List.Lift",
      group: "exploration"
    },
    navigate: {
      label: "VAGABOND.Skill.List.Navigate",
      group: "exploration"
    },
    ride: {
      label: "VAGABOND.Skill.List.Ride",
      group: "exploration"
    },
    swim: {
      label: "VAGABOND.Skill.List.Swim",
      group: "exploration"
    },
    brag: {
      label: "VAGABOND.Skill.List.Brag",
      group: "interpersonal"
    },
    empathize: {
      label: "VAGABOND.Skill.List.Empathize",
      group: "interpersonal"
    },
    flirt: {
      label: "VAGABOND.Skill.List.Flirt",
      group: "interpersonal"
    },
    gamble: {
      label: "VAGABOND.Skill.List.Gamble",
      group: "interpersonal"
    },
    handleAnimals: {
      label: "VAGABOND.Skill.List.HandleAnimals",
      group: "interpersonal"
    },
    interrogate: {
      label: "VAGABOND.Skill.List.Interrogate",
      group: "interpersonal"
    },
    intimidate: {
      label: "VAGABOND.Skill.List.Intimidate",
      group: "interpersonal"
    },
    lead: {
      label: "VAGABOND.Skill.List.Lead",
      group: "interpersonal"
    },
    lie: {
      label: "VAGABOND.Skill.List.Lie",
      group: "interpersonal"
    },
    music: {
      label: "VAGABOND.Skill.List.Music",
      group: "interpersonal"
    },
    perform: {
      label: "VAGABOND.Skill.List.Perform",
      group: "interpersonal"
    },
    persuade: {
      label: "VAGABOND.Skill.List.Persuade",
      group: "interpersonal"
    },
    readPerson: {
      label: "VAGABOND.Skill.List.ReadPerson",
      group: "interpersonal"
    },
    alertness: {
      label: "VAGABOND.Skill.List.Alertness",
      group: "intrigue"
    },
    concealObject: {
      label: "VAGABOND.Skill.List.ConcealObject",
      group: "intrigue"
    },
    disguise: {
      label: "VAGABOND.Skill.List.Disguise",
      group: "intrigue"
    },
    eavesdrop: {
      label: "VAGABOND.Skill.List.Eavesdrop",
      group: "intrigue"
    },
    escapeArtist: {
      label: "VAGABOND.Skill.List.EscapeArtist",
      group: "intrigue"
    },
    hide: {
      label: "VAGABOND.Skill.List.Hide",
      group: "intrigue"
    },
    pickLock: {
      label: "VAGABOND.Skill.List.PickLock",
      group: "intrigue"
    },
    pickPocket: {
      label: "VAGABOND.Skill.List.PickPocket",
      group: "intrigue"
    },
    sabotage: {
      label: "VAGABOND.Skill.List.Sabotage",
      group: "intrigue"
    },
    search: {
      label: "VAGABOND.Skill.List.Search",
      group: "intrigue"
    },
    sneak: {
      label: "VAGABOND.Skill.List.Sneak",
      group: "intrigue"
    },
    track: {
      label: "VAGABOND.Skill.List.Track",
      group: "intrigue"
    },
    culture: {
      label: "VAGABOND.Skill.List.Culture",
      group: "lore"
    },
    criminalUnderworld: {
      label: "VAGABOND.Skill.List.CriminalUnderworld",
      group: "lore"
    },
    history: {
      label: "VAGABOND.Skill.List.History",
      group: "lore"
    },
    magic: {
      label: "VAGABOND.Skill.List.Magic",
      group: "lore"
    },
    monsters: {
      label: "VAGABOND.Skill.List.Monsters",
      group: "lore"
    },
    nature: {
      label: "VAGABOND.Skill.List.Nature",
      group: "lore"
    },
    psionics: {
      label: "VAGABOND.Skill.List.Psionics",
      group: "lore"
    },
    religion: {
      label: "VAGABOND.Skill.List.Religion",
      group: "lore"
    },
    rumors: {
      label: "VAGABOND.Skill.List.Rumors",
      group: "lore"
    },
    society: {
      label: "VAGABOND.Skill.List.Society",
      group: "lore"
    },
    timescape: {
      label: "VAGABOND.Skill.List.Timescape",
      group: "lore"
    }
  }
};
preLocalize("skills.groups", {key: "label"});
preLocalize("skills.list", {key: "label"});

Object.defineProperty(VAGABOND.skills, "optgroups", {
  /** @type {FormSelectOption[]} */
  get: function() {
    const config = ds.CONFIG.skills;
    return Object.entries(config.list).reduce((arr, [value, {label, group}]) => {
      arr.push({label, group: config.groups[group].label, value});
      return arr;
    }, []);
  }
});

/**
 * Configuration information for languages
 * @type {Record<string, {label: string}>}
 */
VAGABOND.languages = {
  // ancestry languages
  anjali: {
    label: "VAGABOND.Languages.Anjali"
  },
  axiomatic: {
    label: "VAGABOND.Languages.Axiomatic"
  },
  caelian: {
    label: "VAGABOND.Languages.Caelian"
  },
  filliaric: {
    label: "VAGABOND.Languages.Filliaric"
  },
  highKuric: {
    label: "VAGABOND.Languages.HighKuric"
  },
  hyrallic: {
    label: "VAGABOND.Languages.Hyrallic"
  },
  illyvric: {
    label: "VAGABOND.Languages.Illyvric"
  },
  kalliak: {
    label: "VAGABOND.Languages.Kalliak"
  },
  kethaic: {
    label: "VAGABOND.Languages.Kethaic"
  },
  khelt: {
    label: "VAGABOND.Languages.Khelt"
  },
  khoursirian: {
    label: "VAGABOND.Languages.Khoursirian"
  },
  lowKuric: {
    label: "VAGABOND.Languages.LowKuric"
  },
  mindspeech: {
    label: "VAGABOND.Languages.Mindspeech"
  },
  protoCtholl: {
    label: "VAGABOND.Languages.ProtoCtholl"
  },
  szetch: {
    label: "VAGABOND.Languages.Szetch"
  },
  theFirstLanguage: {
    label: "VAGABOND.Languages.TheFirstLanguage"
  },
  tholl: {
    label: "VAGABOND.Languages.Tholl"
  },
  urollialic: {
    label: "VAGABOND.Languages.Urollialic"
  },
  variac: {
    label: "VAGABOND.Languages.Variac"
  },
  vastariax: {
    label: "VAGABOND.Languages.Vastariax"
  },
  vhoric: {
    label: "VAGABOND.Languages.Vhoric"
  },
  voll: {
    label: "VAGABOND.Languages.Voll"
  },
  yllyric: {
    label: "VAGABOND.Languages.Yllyric"
  },
  zahariax: {
    label: "VAGABOND.Languages.Zahariax"
  },
  zaliac: {
    label: "VAGABOND.Languages.Zaliac"
  },
  // Human languages. Khoursirian already covered
  higaran: {
    label: "VAGABOND.Languages.Higaran"
  },
  khemharic: {
    label: "VAGABOND.Languages.Khemharic"
  },
  oaxuatl: {
    label: "VAGABOND.Languages.Oaxuatl"
  },
  phaedran: {
    label: "VAGABOND.Languages.Phaedran"
  },
  riojan: {
    label: "VAGABOND.Languages.Riojan"
  },
  uvalic: {
    label: "VAGABOND.Languages.Uvalic"
  },
  vaniric: {
    label: "VAGABOND.Languages.Vaniric"
  },
  vasloria: {
    label: "VAGABOND.Languages.Vasloria"
  },
  // Dead languages
  highRhyvian: {
    label: "VAGABOND.Languages.HighRhyvian"
  },
  khamish: {
    label: "VAGABOND.Languages.Khamish"
  },
  kheltivari: {
    label: "VAGABOND.Languages.Kheltivari"
  },
  lowRhivian: {
    label: "VAGABOND.Languages.LowRhivian"
  },
  oldVariac: {
    label: "VAGABOND.Languages.OldVariac"
  },
  phorialtic: {
    label: "VAGABOND.Languages.Phorialtic"
  },
  rallarian: {
    label: "VAGABOND.Languages.Rallarian"
  },
  ullorvic: {
    label: "VAGABOND.Languages.Ullorvic"
  }
};
preLocalize("languages", {key: "label"});

/** @import {AdvancementTypeConfiguration} from "./_types" */

/**
 * Advancement types that can be added to items.
 * @enum {AdvancementTypeConfiguration}
 */
VAGABOND.advancementTypes = {

};

/**
 * Configuration information for negotiations
 */
VAGABOND.negotiation = {
  /** @type {Record<string, {label: string}>} */
  motivations: {
    benevolence: {
      label: "VAGABOND.Actor.NPC.Negotiation.Motivations.Benevolence"
    },
    discovery: {
      label: "VAGABOND.Actor.NPC.Negotiation.Motivations.Discovery"
    },
    freedom: {
      label: "VAGABOND.Actor.NPC.Negotiation.Motivations.Freedom"
    },
    greed: {
      label: "VAGABOND.Actor.NPC.Negotiation.Motivations.Greed"
    },
    authority: {
      label: "VAGABOND.Actor.NPC.Negotiation.Motivations.HigherAuthority"
    },
    justice: {
      label: "VAGABOND.Actor.NPC.Negotiation.Motivations.Justice"
    },
    legacy: {
      label: "VAGABOND.Actor.NPC.Negotiation.Motivations.Legacy"
    },
    peace: {
      label: "VAGABOND.Actor.NPC.Negotiation.Motivations.Peace"
    },
    power: {
      label: "VAGABOND.Actor.NPC.Negotiation.Motivations.Power"
    },
    protection: {
      label: "VAGABOND.Actor.NPC.Negotiation.Motivations.Protection"
    },
    revelry: {
      label: "VAGABOND.Actor.NPC.Negotiation.Motivations.Revelry"
    },
    vengeance: {
      label: "VAGABOND.Actor.NPC.Negotiation.Motivations.Vengeance"
    }
  }
};
preLocalize("negotiation.motivations", {key: "label"});

/**
 * Configuration information for heros
 */
VAGABOND.hero = {
  /**
   * XP progression for heroes
   * @type {number[]}
   */
  xp_track: [0, 16, 32, 48, 64, 80, 96, 112, 128, 144],
  /**
   * Ways to spend hero tokens
   * @type {Record<string, {label: string, tokens: number, messageContent: string}>}
   */
  tokenSpends: {
    gainSurges: {
      label: "VAGABOND.Setting.HeroTokens.GainSurges.label",
      tokens: 1,
      messageContent: "VAGABOND.Setting.HeroTokens.GainSurges.messageContent"
    },
    succeedSave: {
      label: "VAGABOND.Setting.HeroTokens.SucceedSave.label",
      tokens: 1,
      messageContent: "VAGABOND.Setting.HeroTokens.SucceedSave.messageContent"
    },
    improveTest: {
      label: "VAGABOND.Setting.HeroTokens.ImproveTest.label",
      tokens: 1,
      messageContent: "VAGABOND.Setting.HeroTokens.ImproveTest.messageContent"
    },
    regainStamina: {
      label: "VAGABOND.Setting.HeroTokens.RegainStamina.label",
      tokens: 2,
      messageContent: "VAGABOND.Setting.HeroTokens.RegainStamina.messageContent"
    }
  }
};
preLocalize("hero.tokenSpends", {keys: ["label", "messageContent"], sort: true});

/**
 * Configuration information for monsters
 */
VAGABOND.monsters = {
  /** @type {Record<string, {label: string, group: string}>} */
  keywords: {
    abyssal: {
      label: "VAGABOND.Actor.NPC.KEYWORDS.Abyssal",
      group: "VAGABOND.Actor.NPC.KeywordGroups.General"
    },
    accursed: {
      label: "VAGABOND.Actor.NPC.KEYWORDS.Accursed",
      group: "VAGABOND.Actor.NPC.KeywordGroups.General"
    },
    animal: {
      label: "VAGABOND.Actor.NPC.KEYWORDS.Animal",
      group: "VAGABOND.Actor.NPC.KeywordGroups.General"
    },
    beast: {
      label: "VAGABOND.Actor.NPC.KEYWORDS.Beast",
      group: "VAGABOND.Actor.NPC.KeywordGroups.General"
    },
    construct: {
      label: "VAGABOND.Actor.NPC.KEYWORDS.Construct",
      group: "VAGABOND.Actor.NPC.KeywordGroups.General"
    },
    dragon: {
      label: "VAGABOND.Actor.NPC.KEYWORDS.Dragon",
      group: "VAGABOND.Actor.NPC.KeywordGroups.General"
    },
    elemental: {
      label: "VAGABOND.Actor.NPC.KEYWORDS.Elemental",
      group: "VAGABOND.Actor.NPC.KeywordGroups.General"
    },
    fey: {
      label: "VAGABOND.Actor.NPC.KEYWORDS.Fey",
      group: "VAGABOND.Actor.NPC.KeywordGroups.General"
    },
    giant: {
      label: "VAGABOND.Actor.NPC.KEYWORDS.Giant",
      group: "VAGABOND.Actor.NPC.KeywordGroups.General"
    },
    horror: {
      label: "VAGABOND.Actor.NPC.KEYWORDS.Horror",
      group: "VAGABOND.Actor.NPC.KeywordGroups.General"
    },
    humanoid: {
      label: "VAGABOND.Actor.NPC.KEYWORDS.Humanoid",
      group: "VAGABOND.Actor.NPC.KeywordGroups.General"
    },
    infernal: {
      label: "VAGABOND.Actor.NPC.KEYWORDS.Infernal",
      group: "VAGABOND.Actor.NPC.KeywordGroups.General"
    },
    plant: {
      label: "VAGABOND.Actor.NPC.KEYWORDS.Plant",
      group: "VAGABOND.Actor.NPC.KeywordGroups.General"
    },
    swarm: {
      label: "VAGABOND.Actor.NPC.KEYWORDS.Swarm",
      group: "VAGABOND.Actor.NPC.KeywordGroups.General"
    },
    undead: {
      label: "VAGABOND.Actor.NPC.KEYWORDS.Undead",
      group: "VAGABOND.Actor.NPC.KeywordGroups.General"
    }
  },
  /** @type {Record<string, {label: string}>} */
  roles: {
    ambusher: {
      label: "VAGABOND.Actor.NPC.ROLES.Ambusher"
    },
    artillery: {
      label: "VAGABOND.Actor.NPC.ROLES.Artillery"
    },
    brute: {
      label: "VAGABOND.Actor.NPC.ROLES.Brute"
    },
    controller: {
      label: "VAGABOND.Actor.NPC.ROLES.Controller"
    },
    defender: {
      label: "VAGABOND.Actor.NPC.ROLES.Defender"
    },
    harrier: {
      label: "VAGABOND.Actor.NPC.ROLES.Harrier"
    },
    hexer: {
      label: "VAGABOND.Actor.NPC.ROLES.Hexer"
    },
    mount: {
      label: "VAGABOND.Actor.NPC.ROLES.Mount"
    },
    support: {
      label: "VAGABOND.Actor.NPC.ROLES.Support"
    }
  },
  /** @type {Record<string, {label: string}>} */
  organizations: {
    minion: {
      label: "VAGABOND.Actor.NPC.ORGANIZATIONS.Minion"
    },
    band: {
      label: "VAGABOND.Actor.NPC.ORGANIZATIONS.Band"
    },
    platoon: {
      label: "VAGABOND.Actor.NPC.ORGANIZATIONS.Platoon"
    },
    troop: {
      label: "VAGABOND.Actor.NPC.ORGANIZATIONS.Troop"
    },
    leader: {
      label: "VAGABOND.Actor.NPC.ORGANIZATIONS.Leader"
    },
    solo: {
      label: "VAGABOND.Actor.NPC.ORGANIZATIONS.Solo"
    }
  }
};
preLocalize("monsters.keywords", {keys: ["label", "group"]});
preLocalize("monsters.roles", {key: "label"});
preLocalize("monsters.organizations", {key: "label"});

/**
 * Configuration information for Ability items
 */
VAGABOND.abilities = {
  /** @type {Record<string, {label: string, group?: string}>} */
  keywords: {
    animal: {
      label: "VAGABOND.Item.Ability.Keywords.Animal",
      group: "VAGABOND.Item.Ability.KeywordGroups.Fury"
    },
    animapathy: {
      label: "VAGABOND.Item.Ability.Keywords.Animapathy",
      group: "VAGABOND.Item.Ability.KeywordGroups.Talent"
    },
    area: {
      label: "VAGABOND.Item.Ability.Keywords.Area"
    },
    charge: {
      label: "VAGABOND.Item.Ability.Keywords.Charge"
    },
    chronopathy: {
      label: "VAGABOND.Item.Ability.Keywords.Chronopathy",
      group: "VAGABOND.Item.Ability.KeywordGroups.Talent"
    },
    cryokinesis: {
      label: "VAGABOND.Item.Ability.Keywords.Cryokinesis",
      group: "VAGABOND.Item.Ability.KeywordGroups.Talent"
    },
    earth: {
      label: "VAGABOND.Item.Ability.Keywords.Earth",
      group: "VAGABOND.Item.Ability.KeywordGroups.Elementalist"
    },
    fire: {
      label: "VAGABOND.Item.Ability.Keywords.Fire",
      group: "VAGABOND.Item.Ability.KeywordGroups.Elementalist"
    },
    green: {
      label: "VAGABOND.Item.Ability.Keywords.Green",
      group: "VAGABOND.Item.Ability.KeywordGroups.Elementalist"
    },
    magic: {
      label: "VAGABOND.Item.Ability.Keywords.Magic"
    },
    melee: {
      label: "VAGABOND.Item.Ability.Keywords.Melee"
    },
    metamorphosis: {
      label: "VAGABOND.Item.Ability.Keywords.Metamorphosis",
      group: "VAGABOND.Item.Ability.KeywordGroups.Talent"
    },
    psionic: {
      label: "VAGABOND.Item.Ability.Keywords.Psionic"
    },
    pyrokinesis: {
      label: "VAGABOND.Item.Ability.Keywords.Pyrokinesis",
      group: "VAGABOND.Item.Ability.KeywordGroups.Talent"
    },
    ranged: {
      label: "VAGABOND.Item.Ability.Keywords.Ranged"
    },
    resopathy: {
      label: "VAGABOND.Item.Ability.Keywords.Resopathy",
      group: "VAGABOND.Item.Ability.KeywordGroups.Talent"
    },
    rot: {
      label: "VAGABOND.Item.Ability.Keywords.Rot",
      group: "VAGABOND.Item.Ability.KeywordGroups.Elementalist"
    },
    routine: {
      label: "VAGABOND.Item.Ability.Keywords.Routine",
      group: "VAGABOND.Item.Ability.KeywordGroups.Troubador"
    },
    strike: {
      label: "VAGABOND.Item.Ability.Keywords.Strike"
    },
    telekinesis: {
      label: "VAGABOND.Item.Ability.Keywords.Telekinesis",
      group: "VAGABOND.Item.Ability.KeywordGroups.Talent"
    },
    telepathy: {
      label: "VAGABOND.Item.Ability.Keywords.Telepathy",
      group: "VAGABOND.Item.Ability.KeywordGroups.Talent"
    },
    void: {
      label: "VAGABOND.Item.Ability.Keywords.Void",
      group: "VAGABOND.Item.Ability.KeywordGroups.Elementalist"
    },
    weapon: {
      label: "VAGABOND.Item.Ability.Keywords.Weapon"
    }
  },
  /**
   * Action types
   * @type {Record<string, {label: string, triggered?: boolean}>}
   */
  types: {
    action: {
      label: "VAGABOND.Item.Ability.Type.Action"
    },
    maneuver: {
      label: "VAGABOND.Item.Ability.Type.Maneuver"
    },
    freeManeuver: {
      label: "VAGABOND.Item.Ability.Type.FreeManeuver"
    },
    triggered: {
      label: "VAGABOND.Item.Ability.Type.Triggered",
      triggered: true
    },
    freeTriggered: {
      label: "VAGABOND.Item.Ability.Type.FreeTriggered",
      triggered: true
    },
    villain: {
      label: "VAGABOND.Item.Ability.Type.Villain"
    }
  },
  /**
   * Ability category, e.g. "Villain Action"
   * @type {Record<string, {label: string}>}
   */
  categories: {
    heroic: {
      label: "VAGABOND.Item.Ability.Category.Heroic"
    },
    freeStrike: {
      label: "VAGABOND.Item.Ability.Category.FreeStrike"
    },
    signature: {
      label: "VAGABOND.Item.Ability.Category.Signature"
    },
    villain: {
      label: "VAGABOND.Item.Ability.Category.Villain"
    }
  },
  /**
   * Valid distances in Vagabond
   * `primary` and `secondary`, if present represent additional measures/dimensions that are valid for this type
   * The string values are the labels for those properties
   * @type {Record<string, {label: string; primary?: string; secondary?: string; tertiary?: string; area?: boolean; embedLabel: string}>}
   */
  distances: {
    melee: {
      label: "VAGABOND.Item.Ability.Distance.Melee",
      primary: "VAGABOND.Item.Ability.Distance.Melee",
      embedLabel: "VAGABOND.Item.Ability.DistanceEmbed.Melee"
    },
    ranged: {
      label: "VAGABOND.Item.Ability.Distance.Ranged",
      primary: "VAGABOND.Item.Ability.Distance.Ranged",
      embedLabel: "VAGABOND.Item.Ability.DistanceEmbed.Ranged"
    },
    meleeRanged: {
      label: "VAGABOND.Item.Ability.Distance.MeleeRanged",
      primary: "VAGABOND.Item.Ability.Distance.Melee",
      secondary: "VAGABOND.Item.Ability.Distance.Ranged",
      embedLabel: "VAGABOND.Item.Ability.DistanceEmbed.MeleeRanged"
    },
    aura: {
      label: "VAGABOND.Item.Ability.Distance.Aura",
      primary: "VAGABOND.Item.Ability.Distance.Aura",
      area: true,
      embedLabel: "VAGABOND.Item.Ability.DistanceEmbed.Aura"
    },
    burst: {
      label: "VAGABOND.Item.Ability.Distance.Burst",
      primary: "VAGABOND.Item.Ability.Distance.Burst",
      area: true,
      embedLabel: "VAGABOND.Item.Ability.DistanceEmbed.Burst"
    },
    cube: {
      label: "VAGABOND.Item.Ability.Distance.Cube",
      primary: "VAGABOND.Item.Ability.Distance.Length",
      secondary: "VAGABOND.Item.Ability.Distance.Ranged",
      area: true,
      embedLabel: "VAGABOND.Item.Ability.DistanceEmbed.Cube"
    },
    line: {
      label: "VAGABOND.Item.Ability.Distance.Line",
      primary: "VAGABOND.Item.Ability.Distance.Length",
      secondary: "VAGABOND.Item.Ability.Distance.Width",
      tertiary: "VAGABOND.Item.Ability.Distance.Ranged",
      area: true,
      embedLabel: "VAGABOND.Item.Ability.DistanceEmbed.Line"
    },
    wall: {
      label: "VAGABOND.Item.Ability.Distance.Wall",
      primary: "VAGABOND.Item.Ability.Distance.Squares",
      secondary: "VAGABOND.Item.Ability.Distance.Ranged",
      area: true,
      embedLabel: "VAGABOND.Item.Ability.DistanceEmbed.Wall"
    },
    special: {
      label: "VAGABOND.Item.Ability.Distance.Special",
      area: true,
      embedLabel: "VAGABOND.Item.Ability.Distance.Special"
    },
    self: {
      label: "VAGABOND.Item.Ability.Distance.Self",
      embedLabel: "VAGABOND.Item.Ability.Distance.Self"
    }
  },
  /** @type {Record<string, {label: string; all?: string; embedLabel: string}>} */
  targets: {
    creature: {
      label: "VAGABOND.Item.Ability.Target.Creature",
      all: "VAGABOND.Item.Ability.Target.AllCreatures",
      embedLabel: "VAGABOND.Item.Ability.Target.CreatureEmbed"
    },
    object: {
      label: "VAGABOND.Item.Ability.Target.Object",
      all: "VAGABOND.Item.Ability.Target.AllObjects",
      embedLabel: "VAGABOND.Item.Ability.Target.ObjectEmbed"
    },
    creatureObject: {
      label: "VAGABOND.Item.Ability.Target.CreatureObject",
      all: "VAGABOND.Item.Ability.Target.AllCreatureObject",
      embedLabel: "VAGABOND.Item.Ability.Target.CreatureObjectEmbed"
    },
    enemy: {
      label: "VAGABOND.Item.Ability.Target.Enemy",
      all: "VAGABOND.Item.Ability.Target.AllEnemies",
      embedLabel: "VAGABOND.Item.Ability.Target.EnemyEmbed"
    },
    ally: {
      label: "VAGABOND.Item.Ability.Target.Ally",
      all: "VAGABOND.Item.Ability.Target.AllAllies",
      embedLabel: "VAGABOND.Item.Ability.Target.AllyEmbed"
    },
    self: {
      label: "VAGABOND.Item.Ability.Target.Self",
      embedLabel: "VAGABOND.Item.Ability.Target.Self"
    }
  },
  forcedMovement: {
    push: {
      label: "VAGABOND.Item.Ability.ForcedMovement.Push"
    },
    pull: {
      label: "VAGABOND.Item.Ability.ForcedMovement.Pull"
    },
    slide: {
      label: "VAGABOND.Item.Ability.ForcedMovement.Slide"
    }
  }
};
preLocalize("abilities.keywords", {keys: ["label", "group"]});
preLocalize("abilities.types", {key: "label"});
preLocalize("abilities.categories", {key: "label"});
// Embed labels intentionally not pre-localized because they rely on `format` instead of `localize`
preLocalize("abilities.distances", {keys: ["label", "primary", "secondary", "tertiary"]});
preLocalize("abilities.targets", {keys: ["label", "all"]});
preLocalize("abilities.forcedMovement", {key: "label"});

Object.defineProperty(VAGABOND.abilities.keywords, "optgroups", {
  /** @type {FormSelectOption[]} */
  get: function() {
    const sortedKeywords = Object.entries(ds.CONFIG.abilities.keywords).sort(([keyA, valueA], [keyB, valueB]) => {
      // When no group, sort between their keys
      if ((valueA.group === undefined) && (valueB.group === undefined)) return keyA.localeCompare(keyB);

      // When or the other, but not both have a group, the one without a group comes first
      if ((valueA.group === undefined) && (valueB.group !== undefined)) return -1;
      if ((valueA.group !== undefined) && (valueB.group === undefined)) return 1;

      // When they both have a group and they are equal, sort between their keys
      if (valueA.group === valueB.group) return keyA.localeCompare(keyB);

      // When they both have a group and are not equal, sort between their groups
      return valueA.group.localeCompare(valueB.group);
    });
    return sortedKeywords.reduce((arr, [value, {label, group}]) => {
      arr.push({label, group, value});
      return arr;
    }, []);
  }
});

/**
 * Configuration details for Culture items
 * @type {Record<string, Record<string, {label: string, skillOpts: Set<string>}>>}
 */
VAGABOND.culture = {
  environments: {
    nomadic: {
      label: "VAGABOND.Item.Culture.Environments.Nomadic",
      skillOpts: new Set()
    },
    rural: {
      label: "VAGABOND.Item.Culture.Environments.Rural",
      skillOpts: new Set()
    },
    secluded: {
      label: "VAGABOND.Item.Culture.Environments.Secluded",
      skillOpts: new Set()
    },
    urban: {
      label: "VAGABOND.Item.Culture.Environments.Urban",
      skillOpts: new Set()
    },
    wilderness: {
      label: "VAGABOND.Item.Culture.Environments.Wilderness",
      skillOpts: new Set()
    }
  },
  organization: {
    anarchic: {
      label: "VAGABOND.Item.Culture.Organization.Anarchic",
      skillOpts: new Set()
    },
    bureaucratic: {
      label: "VAGABOND.Item.Culture.Organization.Bureaucratic",
      skillOpts: new Set()
    },
    communal: {
      label: "VAGABOND.Item.Culture.Organization.Communal",
      skillOpts: new Set()
    }
  },
  upbringing: {
    academic: {
      label: "VAGABOND.Item.Culture.Upbringing.Academic",
      skillOpts: new Set()
    },
    creative: {
      label: "VAGABOND.Item.Culture.Upbringing.Creative",
      skillOpts: new Set()
    },
    illegal: {
      label: "VAGABOND.Item.Culture.Upbringing.Illegal",
      skillOpts: new Set()
    },
    labor: {
      label: "VAGABOND.Item.Culture.Upbringing.Labor",
      skillOpts: new Set()
    },
    martial: {
      label: "VAGABOND.Item.Culture.Upbringing.Martial",
      skillOpts: new Set()
    },
    noble: {
      label: "VAGABOND.Item.Culture.Upbringing.Noble",
      skillOpts: new Set()
    }
  }
};
preLocalize("culture.environments", {key: "label"});
preLocalize("culture.organization", {key: "label"});
preLocalize("culture.upbringing", {key: "label"});

/**
 * Configuration details for Kit items
 * @type {Record<string,  Record<string, {label: string}>>}
 */
VAGABOND.kits = {};
// preLocalize("kits.types", {key: "label"});

/**
 * Configuration details for Equipment items
 * Also used by Kits
 */
VAGABOND.equipment = {
  /** @type {Record<string, {label: string, readonly keywords: FormSelectOption[]}>} */
  categories: {
    consumable: {
      label: "VAGABOND.Item.Equipment.Categories.Consumable",
      get keywords() {
        return [];
      }
    },
    trinket: {
      label: "VAGABOND.Item.Equipment.Categories.Trinket",
      get keywords() {
        return [];
      }
    },
    leveled: {
      label: "VAGABOND.Item.Equipment.Categories.Leveled",
      get keywords() {
        return [];
      }
    },
    artifact: {
      label: "VAGABOND.Item.Equipment.Categories.Artifact",
      get keywords() {
        return [];
      }
    }
  },
  /** @type {Record<string, {label: string}>} */
  kinds: {
    other: {
      label: "VAGABOND.Item.Equipment.Kinds.Other"
    },
    armor: {
      label: "VAGABOND.Item.Equipment.Kinds.Armor"
    },
    implement: {
      label: "VAGABOND.Item.Equipment.Kinds.Implement"
    },
    weapon: {
      label: "VAGABOND.Item.Equipment.Kinds.Weapon"
    }
  },
  /** @type {Record<string, {label: string, kitEquipment: boolean}>} */
  armor: {
    none: {
      label: "VAGABOND.Item.Equipment.Armor.None",
      kitEquipment: true
    },
    light: {
      label: "VAGABOND.Item.Equipment.Armor.Light",
      kitEquipment: true
    },
    medium: {
      label: "VAGABOND.Item.Equipment.Armor.Medium",
      kitEquipment: true
    },
    heavy: {
      label: "VAGABOND.Item.Equipment.Armor.Heavy",
      kitEquipment: true
    },
    shield: {
      label: "VAGABOND.Item.Equipment.Armor.Shield",
      kitEquipment: false
    }
  },
  /** @type {Record<string, {label: string}>} */
  weapon: {
    none: {
      label: "VAGABOND.Item.Equipment.Weapons.None"
    },
    bow: {
      label: "VAGABOND.Item.Equipment.Weapons.Bow"
    },
    ensnaring: {
      label: "VAGABOND.Item.Equipment.Weapons.Ensnaring"
    },
    heavy: {
      label: "VAGABOND.Item.Equipment.Weapons.Heavy"
    },
    light: {
      label: "VAGABOND.Item.Equipment.Weapons.Light"
    },
    medium: {
      label: "VAGABOND.Item.Equipment.Weapons.Medium"
    },
    polearm: {
      label: "VAGABOND.Item.Equipment.Weapons.Polearm"
    },
    unarmed: {
      label: "VAGABOND.Item.Equipment.Weapons.Unarmed"
    },
    whip: {
      label: "VAGABOND.Item.Equipment.Weapons.Whip"
    }
  },
  /** @type {Record<string, {label: string}>} */
  implement: {
    bone: {
      label: "VAGABOND.Item.Equipment.Implements.Bone"
    },
    crystal: {
      label: "VAGABOND.Item.Equipment.Implements.Crystal"
    },
    glass: {
      label: "VAGABOND.Item.Equipment.Implements.Glass"
    },
    metal: {
      label: "VAGABOND.Item.Equipment.Implements.Metal"
    },
    stone: {
      label: "VAGABOND.Item.Equipment.Implements.Stone"
    },
    wood: {
      label: "VAGABOND.Item.Equipment.Implements.Wood"
    }
  },
  /** @type {Record<string, {label: string}>} */
  other: {
    feet: {
      label: "VAGABOND.Item.Equipment.Other.Feet"
    },
    hands: {
      label: "VAGABOND.Item.Equipment.Other.Hands"
    },
    neck: {
      label: "VAGABOND.Item.Equipment.Other.Neck"
    },
    ring: {
      label: "VAGABOND.Item.Equipment.Other.Ring"
    }
  }
};
preLocalize("equipment.categories", {key: "label"});
preLocalize("equipment.kinds", {key: "label"});
preLocalize("equipment.armor", {key: "label"});
preLocalize("equipment.weapon", {key: "label"});
preLocalize("equipment.implement", {key: "label"});
preLocalize("equipment.other", {key: "label"});

VAGABOND.features = {
  /** @type {Record<string, {label: string, subtypes?: Record<string, {label: string}>}>} */
  types: {
    perk: {
      label: "VAGABOND.Item.Feature.Types.Perk.Label",
      subtypes: {
        crafting: {
          label: "VAGABOND.Item.Feature.Types.Perk.Crafting"
        },
        exploration: {
          label: "VAGABOND.Item.Feature.Types.Perk.Exploration"
        },
        interpersonal: {
          label: "VAGABOND.Item.Feature.Types.Perk.Interpersonal"
        },
        intrigue: {
          label: "VAGABOND.Item.Feature.Types.Perk.Intrigue"
        },
        lore: {
          label: "VAGABOND.Item.Feature.Types.Perk.Lore"
        },
        supernatural: {
          label: "VAGABOND.Item.Feature.Types.Perk.Supernatural"
        }
      }
    },
    title: {
      label: "VAGABOND.Item.Feature.Types.Title.Label",
      subtypes: {
        1: {
          label: "VAGABOND.Echelon.1"
        },
        2: {
          label: "VAGABOND.Echelon.2"
        },
        3: {
          label: "VAGABOND.Echelon.3"
        },
        4: {
          label: "VAGABOND.Echelon.4"
        }
      }
    }
  }
};
preLocalize("features.types", {key: "label"});
preLocalize("features.types.perk.subtypes", {key: "label"});
preLocalize("features.types.title.subtypes", {key: "label"});
