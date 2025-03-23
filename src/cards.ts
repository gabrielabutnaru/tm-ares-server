type CardColor = 'green' | 'red' | 'blue';
type CardTag =
  | 'steel'
  | 'titanium'
  | 'science'
  | 'energy'
  | 'jovian'
  | 'event'
  | 'microbes'
  | 'animals'
  | 'earth'
  | 'plant';
type ProductionType = 'mc' | 'card' | 'heat' | 'plant';
type ResourceType = 'mc' | 'heat' | 'plants';
type CapabilityType = 'steel' | 'titanium';
type SpecialResource = 'animals' | 'microbes' | 'science';
type Track = 'tr' | 'oxygen' | 'temperature';

type CardAction =
  | { type: 'gain'; resource: ResourceType; count: number }
  | {
      type: 'spend';
      resource: ResourceType;
      count: number;
      reducedBy?: { capability: CapabilityType; multiplier: number };
    }
  | { type: 'draw'; count: number }
  | { type: 'add'; count: number; resource: SpecialResource }
  | { type: 'raise'; track: Track; by: number; multipliedByTagCount?: CardTag }
  | { type: 'flip-ocean'; count: number }
  | { type: 'play-card'; cardColor: CardColor; costMax: number }
  | { type: 'spend-x-gain-y'; x: ResourceType; y: ResourceType }
  | { type: 'discard-up-to-3-cards-gain-same-amount' }
  | { type: 'gain-forest'; count: number };

type CardRequirement =
  | { type: 'ocean-min'; count: number }
  | { type: 'ocean-max'; count: number }
  | { type: 'tag'; tag: CardTag; count: number }
  | { type: 'spend-tr'; count: number }
  | { type: 'oxygen-min'; color: 'white' | 'red' | 'yellow' }
  | { type: 'temperature-min'; color: 'white' | 'red' | 'yellow' }
  | { type: 'spend-resource'; resource: ResourceType; count: number };

type CardEffect =
  | { type: 'standard-effect-reduction'; by: number }
  | { type: 'titanium-capability-reduction'; by: number }
  | { type: 'steel-capability-reduction'; by: number }
  | { type: 'on-card-sell-gain-extra-mc'; by: number }
  | { type: 'on-gain-forest-vp'; countOfResourcesToAddOnThisCard: number }
  | { type: 'on-research-draw'; more: number; keep: number }
  | { type: 'card-cost-reduction'; by: number }
  | { type: 'on-event-play'; actions: CardAction[] };

type CardVP = { type: 'flat'; count: number } | { type: 'ratio'; ratio: number };

type CardProduction = {
  production: ProductionType;
  count: number;
  multipliedByTagCount?: CardTag;
};

type CardCapability = {
  capability: CapabilityType;
  count: number;
};

interface ICard {
  name: string;
  cost: number;
  requirement: CardRequirement[];
  tags: CardTag[];
  color: CardColor;
  effect: CardEffect[];
  production: CardProduction[];
  capability: CardCapability[];
  action: CardAction[];
  activePhases: (1 | 2 | 3 | 4 | 5)[];
  ability: CardAction[];
  vp: CardVP;
  cardNumber: number;
}

export const Cards: Record<number, ICard> = {
  64: {
    name: 'Wood Burning Stoves',
    cost: 13,
    requirement: [],
    tags: ['steel'],
    color: 'blue',
    effect: [],
    production: [],
    capability: [],
    action: [{ type: 'spend', resource: 'plants', count: 4 }],
    activePhases: [3],
    ability: [{ type: 'gain', resource: 'plants', count: 4 }],
    vp: { type: 'flat', count: 0 },
    cardNumber: 64,
  },
  192: {
    name: 'Surface Mines',
    cost: 13,
    requirement: [],
    tags: ['steel'],
    color: 'green',
    effect: [],
    production: [],
    capability: [
      { capability: 'steel', count: 1 },
      { capability: 'titanium', count: 1 },
    ],
    action: [],
    activePhases: [1, 2],
    ability: [],
    vp: { type: 'flat', count: 0 },
    cardNumber: 192,
  },
  55: {
    name: 'Standard Technology',
    cost: 15,
    requirement: [],
    tags: ['science'],
    color: 'blue',
    effect: [{ type: 'standard-effect-reduction', by: 4 }],
    production: [],
    capability: [],
    action: [],
    activePhases: [3],
    ability: [],
    vp: { type: 'flat', count: 1 },
    cardNumber: 55,
  },
  15: {
    name: 'Circuit Board Factory',
    cost: 14,
    requirement: [],
    tags: ['steel'],
    color: 'blue',
    effect: [],
    production: [],
    capability: [],
    action: [{ type: 'draw', count: 1 }],
    activePhases: [3],
    ability: [],
    vp: { type: 'flat', count: 0 },
    cardNumber: 15,
  },
  141: {
    name: 'Giant Space Mirror',
    cost: 13,
    requirement: [],
    tags: ['titanium', 'energy'],
    color: 'green',
    effect: [],
    production: [{ production: 'heat', count: 3 }],
    capability: [],
    action: [],
    activePhases: [4],
    ability: [],
    vp: { type: 'flat', count: 0 },
    cardNumber: 141,
  },
  189: {
    name: 'Space Station',
    cost: 14,
    requirement: [],
    tags: ['titanium'],
    color: 'green',
    effect: [],
    production: [],
    capability: [{ capability: 'titanium', count: 1 }],
    action: [],
    activePhases: [1, 2],
    ability: [],
    vp: { type: 'flat', count: 1 },
    cardNumber: 189,
  },
  143: {
    name: 'Great Dam',
    cost: 12,
    requirement: [{ type: 'ocean-min', count: 2 }],
    tags: ['steel', 'energy'],
    color: 'green',
    effect: [],
    production: [{ production: 'heat', count: 2 }],
    capability: [],
    action: [],
    activePhases: [4],
    ability: [],
    vp: { type: 'flat', count: 1 },
    cardNumber: 143,
  },
  112: {
    name: 'Astrofarm',
    cost: 21,
    requirement: [],
    tags: ['steel'],
    color: 'green',
    effect: [],
    production: [
      { production: 'heat', count: 3 },
      { production: 'plant', count: 1 },
    ],
    capability: [],
    action: [],
    activePhases: [4],
    ability: [{ type: 'add', count: 2, resource: 'microbes' }],
    vp: { type: 'flat', count: 0 },
    cardNumber: 112,
  },
  159: {
    name: 'Mass Converter',
    cost: 20,
    requirement: [{ type: 'tag', tag: 'science', count: 4 }],
    tags: ['science', 'steel', 'energy'],
    color: 'green',
    effect: [],
    production: [{ production: 'heat', count: 3 }],
    capability: [{ capability: 'titanium', count: 1 }],
    action: [],
    activePhases: [1, 2, 4],
    ability: [],
    vp: { type: 'flat', count: 2 },
    cardNumber: 159,
  },
  115: {
    name: 'Balanced Portfolios',
    cost: 8,
    requirement: [{ type: 'spend-tr', count: 1 }],
    tags: ['science'],
    color: 'green',
    effect: [],
    production: [{ production: 'mc', count: 3 }],
    capability: [],
    action: [],
    activePhases: [4],
    ability: [],
    vp: { type: 'flat', count: 1 },
    cardNumber: 115,
  },
  161: {
    name: 'Methane from Titan',
    cost: 35,
    requirement: [{ type: 'oxygen-min', color: 'red' }],
    tags: ['titanium', 'jovian'],
    color: 'green',
    effect: [],
    production: [
      { production: 'heat', count: 2 },
      { production: 'plant', count: 2 },
    ],
    capability: [],
    action: [],
    activePhases: [4],
    ability: [],
    vp: { type: 'flat', count: 2 },
    cardNumber: 161,
  },
  2: {
    name: 'Advanced Alloys',
    cost: 9,
    requirement: [],
    tags: ['steel'],
    color: 'blue',
    effect: [
      { type: 'titanium-capability-reduction', by: 1 },
      { type: 'steel-capability-reduction', by: 1 },
    ],
    production: [],
    capability: [],
    action: [],
    activePhases: [1, 2],
    ability: [],
    vp: { type: 'flat', count: 0 },
    cardNumber: 2,
  },
  17: {
    name: 'Composting Factory',
    cost: 13,
    requirement: [],
    tags: ['steel'],
    color: 'blue',
    effect: [{ type: 'on-card-sell-gain-extra-mc', by: 1 }],
    production: [],
    capability: [],
    action: [],
    activePhases: [1, 2, 3, 4, 5],
    ability: [],
    vp: { type: 'flat', count: 1 },
    cardNumber: 17,
  },
  154: {
    name: 'Kelp Farming',
    cost: 17,
    requirement: [{ type: 'ocean-min', count: 6 }],
    tags: [],
    color: 'green',
    effect: [],
    production: [
      { production: 'mc', count: 2 },
      { production: 'plant', count: 3 },
    ],
    capability: [],
    action: [],
    activePhases: [4],
    ability: [{ type: 'gain', resource: 'plants', count: 2 }],
    vp: { type: 'flat', count: 1 },
    cardNumber: 154,
  },
  73: {
    name: 'Comet',
    cost: 25,
    requirement: [],
    tags: ['titanium', 'event'],
    color: 'red',
    effect: [],
    production: [],
    capability: [],
    action: [],
    activePhases: [],
    ability: [
      { type: 'raise', track: 'temperature', by: 1 },
      { type: 'flip-ocean', count: 1 },
    ],
    vp: { type: 'flat', count: 0 },
    cardNumber: 73,
  },
  207: {
    name: 'Worms',
    cost: 11,
    requirement: [{ type: 'oxygen-min', color: 'red' }],
    tags: ['microbes'],
    color: 'green',
    effect: [],
    production: [{ production: 'plant', count: 1, multipliedByTagCount: 'microbes' }],
    capability: [],
    action: [],
    activePhases: [4],
    ability: [],
    vp: { type: 'flat', count: 0 },
    cardNumber: 207,
  },
  133: {
    name: 'Farming',
    cost: 20,
    requirement: [{ type: 'temperature-min', color: 'white' }],
    tags: [],
    color: 'green',
    effect: [],
    production: [
      { production: 'mc', count: 2 },
      { production: 'plant', count: 2 },
    ],
    capability: [],
    action: [],
    activePhases: [4],
    ability: [{ type: 'gain', resource: 'plants', count: 2 }],
    vp: { type: 'flat', count: 2 },
    cardNumber: 133,
  },
  114: {
    name: 'Automated Factories',
    cost: 18,
    requirement: [],
    tags: ['steel'],
    color: 'green',
    effect: [],
    production: [{ production: 'card', count: 1 }],
    capability: [],
    action: [],
    activePhases: [4],
    ability: [{ type: 'play-card', cardColor: 'green', costMax: 9 }],
    vp: { type: 'flat', count: 0 },
    cardNumber: 114,
  },
  53: {
    name: 'Small Animals',
    cost: 9,
    requirement: [{ type: 'temperature-min', color: 'red' }],
    tags: ['animals'],
    color: 'blue',
    effect: [{ type: 'on-gain-forest-vp', countOfResourcesToAddOnThisCard: 1 }],
    production: [],
    capability: [],
    action: [],
    activePhases: [1, 2, 3],
    ability: [],
    vp: { type: 'ratio', ratio: 1 / 2 },
    cardNumber: 53,
  },
  60: {
    name: 'United Planetary Alliance',
    cost: 11,
    requirement: [],
    tags: ['science', 'earth'],
    color: 'blue',
    effect: [{ type: 'on-research-draw', more: 1, keep: 1 }],
    production: [],
    capability: [],
    action: [],
    activePhases: [5],
    ability: [],
    vp: { type: 'flat', count: 0 },
    cardNumber: 60,
  },
  117: {
    name: 'Biomass Combustors',
    cost: 15,
    requirement: [{ type: 'spend-resource', resource: 'plants', count: 2 }],
    tags: ['steel', 'energy'],
    color: 'green',
    effect: [],
    production: [{ production: 'heat', count: 5 }],
    capability: [],
    action: [],
    activePhases: [4],
    ability: [],
    vp: { type: 'flat', count: 0 },
    cardNumber: 117,
  },
  101: {
    name: 'Towing a Comet',
    cost: 22,
    requirement: [],
    tags: ['steel', 'event'],
    color: 'red',
    effect: [],
    production: [],
    capability: [],
    action: [],
    activePhases: [],
    ability: [
      { type: 'raise', track: 'oxygen', by: 1 },
      { type: 'flip-ocean', count: 1 },
      { type: 'gain', resource: 'plants', count: 2 },
    ],
    vp: { type: 'flat', count: 0 },
    cardNumber: 101,
  },
  100: {
    name: 'Terraforming Ganymede',
    cost: 28,
    requirement: [],
    tags: ['titanium', 'jovian', 'event'],
    color: 'red',
    effect: [],
    production: [],
    capability: [],
    action: [],
    activePhases: [],
    ability: [{ type: 'raise', track: 'tr', by: 1, multipliedByTagCount: 'jovian' }],
    vp: { type: 'flat', count: 2 },
    cardNumber: 100,
  },
  51: {
    name: 'Research Outpost',
    cost: 6,
    requirement: [],
    tags: ['science', 'steel'],
    color: 'blue',
    effect: [{ type: 'card-cost-reduction', by: 1 }],
    production: [],
    capability: [],
    action: [],
    activePhases: [1, 2],
    ability: [],
    vp: { type: 'flat', count: 0 },
    cardNumber: 51,
  },
  86: {
    name: 'Lake Marineris',
    cost: 17,
    requirement: [{ type: 'temperature-min', color: 'yellow' }],
    tags: ['event'],
    color: 'red',
    effect: [],
    production: [],
    capability: [],
    action: [],
    activePhases: [],
    ability: [{ type: 'flip-ocean', count: 2 }],
    vp: { type: 'flat', count: 1 },
    cardNumber: 86,
  },
  134: {
    name: 'Food Factory',
    cost: 9,
    requirement: [{ type: 'spend-resource', resource: 'plants', count: 2 }],
    tags: ['steel'],
    color: 'green',
    effect: [],
    production: [{ production: 'mc', count: 4 }],
    capability: [],
    action: [],
    activePhases: [4],
    ability: [],
    vp: { type: 'flat', count: 0 },
    cardNumber: 134,
  },
  47: {
    name: 'Power Infrastructure',
    cost: 4,
    requirement: [],
    tags: ['steel', 'energy'],
    color: 'blue',
    effect: [],
    production: [],
    capability: [],
    action: [{ type: 'spend-x-gain-y', x: 'heat', y: 'mc' }],
    activePhases: [3],
    ability: [],
    vp: { type: 'flat', count: 0 },
    cardNumber: 47,
  },
  49: {
    name: 'Redrafted Contracts',
    cost: 4,
    requirement: [],
    tags: [],
    color: 'blue',
    effect: [],
    production: [],
    capability: [],
    action: [{ type: 'discard-up-to-3-cards-gain-same-amount' }],
    activePhases: [3],
    ability: [],
    vp: { type: 'flat', count: 0 },
    cardNumber: 49,
  },
  105: {
    name: 'Aerated Magma',
    cost: 18,
    requirement: [{ type: 'oxygen-min', color: 'red' }],
    tags: ['energy'],
    color: 'green',
    effect: [],
    production: [
      { production: 'card', count: 1 },
      { production: 'heat', count: 2 },
    ],
    capability: [],
    action: [],
    activePhases: [4],
    ability: [],
    vp: { type: 'flat', count: 0 },
    cardNumber: 105,
  },
  107: {
    name: 'Algae',
    cost: 9,
    requirement: [{ type: 'ocean-min', count: 5 }],
    tags: ['plant'],
    color: 'green',
    effect: [],
    production: [{ production: 'plant', count: 2 }],
    capability: [],
    action: [],
    activePhases: [4],
    ability: [],
    vp: { type: 'flat', count: 0 },
    cardNumber: 107,
  },
  54: {
    name: 'Solarpunk',
    cost: 15,
    requirement: [],
    tags: ['titanium', 'plant'],
    color: 'blue',
    effect: [],
    production: [],
    capability: [],
    action: [
      {
        type: 'spend',
        resource: 'mc',
        count: 15,
        reducedBy: { capability: 'titanium', multiplier: 2 },
      },
      { type: 'gain-forest', count: 1 },
      { type: 'raise', track: 'oxygen', by: 1 },
    ],
    activePhases: [3],
    ability: [],
    vp: { type: 'flat', count: 1 },
    cardNumber: 54,
  },
  45: {
    name: 'Optimal Aerobraking',
    cost: 10,
    requirement: [],
    tags: ['titanium'],
    color: 'blue',
    effect: [
      {
        type: 'on-event-play',
        actions: [
          { type: 'gain', resource: 'heat', count: 2 },
          { type: 'gain', resource: 'plants', count: 2 },
        ],
      },
    ],
    production: [],
    capability: [],
    action: [],
    activePhases: [1, 2],
    ability: [],
    vp: { type: 'flat', count: 0 },
    cardNumber: 45,
  },
};

/* {
  name: '',
  cost: ,
  requirement: [],
  tags: [],
  color: '',
  effect: [],
  production: [],
  capability: [],
  action: [],
  activePhases: [],
  ability: [],
  vp: { type: 'flat', count: 0 },
  cardNumber: ,
}
*/
