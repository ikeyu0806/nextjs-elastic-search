import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@elastic/elasticsearch'

export async function GET(req: NextRequest) {
  try {
    // クエリ文字列から検索ワードを取得
    const { searchParams } = new URL(req.url)
    const q = searchParams.get('q')?.trim()

    // Elasticsearchのクライアントを初期化
    // Composeで起動したサーバー間の通信のため、ホスト名をサービス名の'elasticsearch'に変更
    const client = new Client({ node: 'http://elasticsearch:9200' })

    // クエリ定義
    const esQuery = q
      ? {
          multi_match: {
            query: q,
            fields: ['name^2', 'description'], // name を重み2で優先
            fuzziness: 'AUTO', // あいまい検索も許可
          },
        }
      : {
          match_all: {},
        }

    const result = await client.search({
      index: 'restaurants',
      size: 100,
      query: esQuery,
    })

    console.log(`🍽 検索結果: ${JSON.stringify(result, null, 2)}`)

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
