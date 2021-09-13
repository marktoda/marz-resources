import { Request, Response } from 'express';
import { Invalid, NotFound } from './errors';
import { RESOURCES } from './resources';

interface Attribute {
    trait_type: string;
    value: string;
}

interface TokenMetadata {
    name: string;
    description: string;
    decimals: number;
    tokenId: number;
    image: string;
    external_url: string;
    attributes: Attribute[];
}


export function getTokenMetadata(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
        throw new Invalid('No token id given');
    }
    const tokenId = parseInt(id, 10);

    if (tokenId === undefined) {
        throw new Invalid('Invalid tokenId');
    }

    if (tokenId < 0 || tokenId >= RESOURCES.length) {
        throw new NotFound('Token not found');
    }

    const { name, rarity, description } = RESOURCES[tokenId];

    const output: TokenMetadata = {
        name,
        description,
        external_url: 'https://marzmining.xyz',
        tokenId,
        decimals: 1,
        image: `https://${req.headers.host}/images/${tokenId}.png`,
        attributes: [
            {
                trait_type: 'Rarity',
                value: rarity.toString(),
            },
        ],
    }

    res.json(output);
}
