ElasticSearch勉強用のレポジトリです。

Next.jsのフロントエンドからElasticSearchを操作します。

サーバ起動

```
docker compose build
docker compose up
```

seed登録
```
npx ts-node scripts/seed.ts
```