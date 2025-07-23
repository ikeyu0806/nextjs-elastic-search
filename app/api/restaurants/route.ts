import { NextResponse } from 'next/server'
import { Client } from '@elastic/elasticsearch'

export async function GET() {
  try {
    // Elasticsearchのクライアントを初期化
    // Composeで起動したサーバー間の通信のため、ホスト名をサービス名の'elasticsearch'に変更
    const client = new Client({ node: 'http://elasticsearch:9200' })

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

    return NextResponse.json({
      restaurants,
    })
  } catch (error) {
    console.error('Elasticsearch error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch restaurants' },
      { status: 500 },
    )
  }
}
