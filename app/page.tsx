'use client'

import { Button, Card, Label, TextInput } from 'flowbite-react'
import useSWR from 'swr'

type Restaurant = {
  id: string
  name: string
  category: string
  address: string
  rating: number
  [key: string]: any
}

const fetcher = async (url: string) => {
  try {
    const response = await fetch(url)

    const json = await response.json()
    return json.restaurants as Restaurant[]
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

export default function Home() {
  const {
    data: restaurants,
    error,
    isLoading,
  } = useSWR<Restaurant[]>('/api/restaurants', fetcher)

  {
    isLoading && <p>読み込み中...</p>
  }
  {
    error && <p className="text-red-500">取得に失敗しました</p>
  }

  return (
    <form className="grid grid-cols-12 p-4">
      <div className="col-span-4">
        <div className="mb-2 block">
          <Label htmlFor="searchWord">検索ワード</Label>
        </div>
        <TextInput
          id="searchWord"
          placeholder="焼肉, 寿司, ラーメンなど"
          required
        />
        <div className="mt-4">
          <Button type="submit">検索</Button>
        </div>
      </div>
      <div className="col-span-8 ml-4 mt-8">
        {/* <Card href="#" className="h-full">
          <h5 className="text-2xl font-bold tracking-tight">スタミナ苑</h5>
          <p className="font-normal">
            予約不可！行列必至！昭和の郷愁漂う、日本が世界に誇る焼肉の名店「スタミナ苑」。日本版「ザガット・サーベイ(1999)」にて、全レストラン中"第1位"を獲得。交通の便こそ良くないが、それでも行列の絶えない超人気店だ。創業以来、変わらぬ手法で丁寧に仕込まれた肉、そこに自家製タレ以外の味付けは不要だろう。小ぶりなガスロースターで焼き、一口食べれば、“並んでよかった”としみじみ思うはずだ。
          </p>
        </Card> */}
        {restaurants &&
          restaurants.map((restaurant) => (
            <Card key={restaurant.id} className="mb-4">
              <h5 className="text-2xl font-bold tracking-tight">
                {restaurant.name}
              </h5>
              <p className="font-normal">
                {restaurant.description} <br />
                カテゴリー: {restaurant.category} <br />
                住所: {restaurant.address}
              </p>
            </Card>
          ))}
      </div>
    </form>
  )
}
