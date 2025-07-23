import { Client } from '@elastic/elasticsearch'

const client = new Client({ node: 'http://localhost:9200' })

async function createIndex() {
  const indexExists = await client.indices.exists({ index: 'restaurants' })
  if (indexExists) {
    console.log('Index already exists. Deleting...')
    await client.indices.delete({ index: 'restaurants' })
  }

  await client.indices.create({
    index: 'restaurants',
  })

  console.log('Index created.')
}

async function insertSampleData() {
  const sampleData = [
    {
      name: '担々麺 ほおずき',
      category: 'ラーメン',
      tags: ['カウンター席'],
      description: '中野ブロードウェイ近くにある担々麺の店。',
      address: '東京都中野区中野5-52-1',
      prefecture: '東京都',
      city: '中野区',
      opening_hours: '平日11:30 - 15:00, 17:00 - 21:00。土日祝11:30 - 21:00',
      holiday: 'なし',
      price_range: { gte: 800, lte: 1200 },
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'スタミナ苑',
      category: '焼肉',
      tags: ['予約不可'],
      description: '予約不可！行列必至！昭和の郷愁漂う、日本が世界に誇る焼肉の名店「スタミナ苑」。日本版「ザガット・サーベイ(1999)」にて、全レストラン中"第1位"を獲得。交通の便こそ良くないが、それでも行列の絶えない超人気店だ。創業以来、変わらぬ手法で丁寧に仕込まれた肉、そこに自家製タレ以外の味付けは不要だろう。小ぶりなガスロースターで焼き、一口食べれば、“並んでよかった”としみじみ思うはずだ。',
      address: '東京都足立区鹿浜3-13-4',
      prefecture: '東京都',
      city: '足立区',
      opening_hours: '16:00〜22:00',
      holiday: '火曜日、水曜日',
      price_range: { gte: 3000, lte: 10000 },
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'トマト',
      category: 'カレー',
      tags: ['予約不可'],
      description: 'ほんのり立ち上がるスパイスの香りに、ソースの深い褐色。｢トマト｣のカレーは、36種類のスパイスや香味野菜、フォンドヴォーなどを約140時間じっくり煮込んで丹念に仕上げるという、薬膳料理にも似た味わいが魅力だ。贅沢に黒毛和牛を使った｢和牛ビーフジャワカレー｣は特に人気で、全国各地からファンがこれを目当てに訪れる。1982年の創業以来、行列が続くのも頷ける独自の味をじっくりとご堪能いただきたい。',
      address: '東京都杉並区荻窪5-20-7 吉田ビル　１Ｆ',
      prefecture: '東京都',
      city: '足立区',
      opening_hours: '11:30 - 13:30, 18:30 - 20:30',
      holiday: '水曜日、木曜日',
      price_range: { gte: 3000, lte: 10000 },
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]

  for (const doc of sampleData) {
    await client.index({
      index: 'restaurants',
      body: doc,
    })
  }

  await client.indices.refresh({ index: 'restaurants' })
  console.log('Sample data inserted.')
}

async function main() {
  try {
    await createIndex()
    await insertSampleData()
  } catch (err) {
    console.error('Error:', err)
  }
}

main()
