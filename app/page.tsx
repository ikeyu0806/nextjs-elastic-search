'use client'

import React, { useEffect } from 'react'
import { Card } from 'flowbite-react'
import useSWR from 'swr'
import SearchWordForm from '../components/searchWordForm'
import { useAtomValue } from 'jotai'
import { searchWordAtom } from '../atoms/searchWordAtoms'
import { Restaurant } from '../types/Restaurant'
import { restaurantListAtom } from '../atoms/restaurantAtoms'
import { useAtom } from 'jotai'

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
  const searchWord = useAtomValue(searchWordAtom)
  const [restaurantList, setRestaurantList] = useAtom(restaurantListAtom)
  const {
    data: restaurants,
    error,
    isLoading,
  } = useSWR<Restaurant[]>(`/api/restaurants?q=${searchWord}`, fetcher)

  useEffect(() => {
    if (restaurants) setRestaurantList(restaurants)
  }, [restaurants, setRestaurantList])

  {
    isLoading && <p>読み込み中...</p>
  }
  {
    error && <p className='text-red-500'>取得に失敗しました</p>
  }

  return (
    <div className='grid grid-cols-12 p-4'>
      <div className='col-span-4'>
        <SearchWordForm />
      </div>
      <div className='col-span-8 ml-4 mt-8'>
        {restaurantList &&
          restaurantList.map((restaurant) => (
            <Card key={restaurant.id} className='mb-4'>
              <h5 className='text-2xl font-bold tracking-tight'>
                {restaurant.name}
              </h5>
              <p className='font-normal'>
                {restaurant.description} <br />
                カテゴリー: {restaurant.category} <br />
                タグ: {restaurant.tags.join(', ')} <br />
                住所: {restaurant.address}
              </p>
            </Card>
          ))}
      </div>
    </div>
  )
}
