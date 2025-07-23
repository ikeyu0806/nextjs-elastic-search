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
      name: '渋谷ラーメン横丁',
      category: 'ラーメン',
      tags: ['深夜営業', 'カウンター席'],
      description: '濃厚な豚骨スープが自慢の渋谷駅近ラーメン店',
      location: { lat: 35.6595, lon: 139.7005 },
      address: '東京都渋谷区道玄坂1-1-1',
      prefecture: '東京都',
      city: '渋谷区',
      opening_hours: '11:00〜翌2:00',
      holiday: '水曜日',
      price_range: { gte: 800, lte: 1200 },
      rating: 4.2,
      review_count: 124,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: '焼肉ホルモン王子',
      category: '焼肉',
      tags: ['個室', '喫煙可'],
      description: '厳選和牛とホルモンが楽しめる隠れ家的焼肉店',
      location: { lat: 35.6612, lon: 139.703 },
      address: '東京都渋谷区宇田川町2-3',
      prefecture: '東京都',
      city: '渋谷区',
      opening_hours: '17:00〜23:00',
      holiday: '月曜日',
      price_range: { gte: 3000, lte: 6000 },
      rating: 4.5,
      review_count: 87,
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
