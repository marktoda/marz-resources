enum Rarity {
    COMMON = "Common",
    UNCOMMON = "Uncommon",
    RARE = "Rare",
    LEGENDARY = "Legendary",
}

interface Resource {
    name: string;
    rarity: Rarity;
    description: string;
}

export const RESOURCES: Resource[] = [
    // COMMON
    {
        name: 'Dirt',
        rarity: Rarity.COMMON,
        description: 'Some martian dirt...',
    },
    {
        name: 'Tin',
        rarity: Rarity.COMMON,
        description: 'A slightly yellow metal. It might be useful for something.',
    },
    {
        name: 'Copper',
        rarity: Rarity.COMMON,
        description: 'A piece of conductive orange metal.',
    },
    {
        name: 'Iron',
        rarity: Rarity.COMMON,
        description: 'A hunk of unrefined iron.',
    },
    {
        name: 'Nickel',
        rarity: Rarity.COMMON,
        description: 'Some nickel metal.',
    },
    {
        name: 'Zinc',
        rarity: Rarity.COMMON,
        description: 'Metal',
    },


    // UNCOMMON
    {
        name: 'Ice',
        rarity: Rarity.UNCOMMON,
        description: 'Metal',
    },
    {
        name: 'Lead',
        rarity: Rarity.UNCOMMON,
        description: 'Metal',
    },
    {
        name: 'Bismuth',
        rarity: Rarity.UNCOMMON,
        description: 'Metal',
    },
    {
        name: 'Antimony',
        rarity: Rarity.UNCOMMON,
        description: 'Metal',
    },
    {
        name: 'Lithium',
        rarity: Rarity.UNCOMMON,
        description: 'Metal',
    },
    {
        name: 'Cobalt',
        rarity: Rarity.UNCOMMON,
        description: 'Metal',
    },

    // RARE
    {
        name: 'Silver',
        rarity: Rarity.RARE,
        description: 'Metal',
    },
    {
        name: 'Gold',
        rarity: Rarity.RARE,
        description: 'Metal',
    },
    {
        name: 'Chromium',
        rarity: Rarity.RARE,
        description: 'Metal',
    },
    {
        name: 'Mercury',
        rarity: Rarity.RARE,
        description: 'Metal',
    },
    {
        name: 'Tungsten',
        rarity: Rarity.RARE,
        description: 'Metal',
    },

    // INSANE
    {
        name: 'Bacteria',
        rarity: Rarity.LEGENDARY,
        description: 'WHOA',
    },
    {
        name: 'Diamond',
        rarity: Rarity.LEGENDARY,
        description: 'The hardest material known to man.',
    },
];
