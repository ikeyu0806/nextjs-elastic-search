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
    },
    {
      name: 'スタミナ苑',
      category: '焼肉',
      tags: ['予約不可'],
      description:
        '予約不可！行列必至！昭和の郷愁漂う、日本が世界に誇る焼肉の名店「スタミナ苑」。日本版「ザガット・サーベイ(1999)」にて、全レストラン中"第1位"を獲得。交通の便こそ良くないが、それでも行列の絶えない超人気店だ。創業以来、変わらぬ手法で丁寧に仕込まれた肉、そこに自家製タレ以外の味付けは不要だろう。小ぶりなガスロースターで焼き、一口食べれば、“並んでよかった”としみじみ思うはずだ。',
      address: '東京都足立区鹿浜3-13-4',
    },
    {
      name: 'トマト',
      category: 'カレー',
      tags: ['予約不可'],
      description:
        'ほんのり立ち上がるスパイスの香りに、ソースの深い褐色。｢トマト｣のカレーは、36種類のスパイスや香味野菜、フォンドヴォーなどを約140時間じっくり煮込んで丹念に仕上げるという、薬膳料理にも似た味わいが魅力だ。贅沢に黒毛和牛を使った｢和牛ビーフジャワカレー｣は特に人気で、全国各地からファンがこれを目当てに訪れる。1982年の創業以来、行列が続くのも頷ける独自の味をじっくりとご堪能いただきたい。',
      address: '東京都杉並区荻窪5-20-7 吉田ビル　１Ｆ',
    },
    {
      name: 'えどもんど 中野',
      category: 'ラーメン',
      tags: ['予約不可', '二郎系'],
      description:
        '中野駅近くの二郎系ラーメン',
      address: '中野区中野5-56-12 狸小路通り',
    },
    {
      name: 'おにやんま 五反田本店',
      category: 'うどん',
      tags: ['予約不可', '立ち食い'],
      description:
        '立ち食いのうどん店。五反田駅近くにある人気店。',
      address: '東京都品川区西五反田1-6-3',
    },
    {
      name: '横浜家系らーめん 五丁目ハウス',
      category: 'ラーメン',
      tags: ['予約不可', '家系'],
      description:
        '横浜家系ラーメンの人気店',
      address: '東京都中野区中野5-56-15',
    },
    {
      name: '陸蒸気',
      category: 'ラーメン',
      tags: ['予約不可', '家系'],
      description:
        '横浜家系ラーメンの人気店',
      address: '東京都中野区中野5-56-15',
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
