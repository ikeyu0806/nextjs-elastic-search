import { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@elastic/elasticsearch'

const client = new Client({ node: 'http://localhost:9200' })

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const result = await client.search({
      index: 'restaurants',
      size: 100,
      query: {
        match_all: {},
      },
    })

    const restaurants = result.hits.hits.map((hit) => ({
      id: hit._id,
      ...(hit._source as Record<string, any>),
    }))

    res.status(200).json(restaurants)
  } catch (error) {
    console.error('Elasticsearch error:', error)
    res.status(500).json({ message: 'Failed to fetch restaurants' })
  }
}
