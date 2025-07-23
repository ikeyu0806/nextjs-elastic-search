'use client'

import { Button, Card, Label, TextInput } from 'flowbite-react'
import useSWR from 'swr'
import { useAtom } from 'jotai'
import { searchWord } from './atoms/searchWordAtoms'

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
  const [searchTerm, setSearchTerm] = useAtom(searchWord)
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="mt-4">
          <Button type="submit">検索</Button>
        </div>
      </div>
      <div className="col-span-8 ml-4 mt-8">
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
