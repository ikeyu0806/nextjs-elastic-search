import { Client } from '@elastic/elasticsearch';

const client = new Client({ node: 'http://localhost:9200' });

async function fetchRestaurants() {
  try {
    const result = await client.search({
      index: 'restaurants',
      size: 100, // 最大取得件数（必要に応じて調整）
      query: {
        match_all: {}
      }
    });

    console.log(`🍽 検索ヒット件数: ${result.hits.total}`);
    result.hits.hits.forEach((hit, index) => {
      console.log(`\n[${index + 1}] ID: ${hit._id}`);
      console.log(JSON.stringify(hit._source, null, 2));
    });
  } catch (error) {
    console.error('❌ エラーが発生しました:', error);
  }
}

fetchRestaurants();
