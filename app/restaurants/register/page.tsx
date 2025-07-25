'use client'

import { useState } from 'react'
import { Label, TextInput, Textarea, Button } from 'flowbite-react'

export default function RegisterRestaurant() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [address, setAddress] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const restaurant = {
      name,
      description,
      category,
      address,
      // tags: [], // TODO
    }

    try {
      const response = await fetch('/api/restaurants', {
        method: 'POST',
        body: JSON.stringify(restaurant),
      })

      if (!response.ok) {
        throw new Error('送信に失敗しました')
      }


      if (!response.ok) {
        throw new Error('登録に失敗しました')
      }

      alert('飲食店を登録しました！')
      setName('')
      setDescription('')
      setCategory('')
      setAddress('')
    } catch (err) {
      alert('エラーが発生しました')
      console.error(err)
    }
  }

  return (
    <div className='grid grid-cols-12 p-4'>
      <div className='col-span-4'></div>
      <div className='col-span-4'>
        <h1 className='text-3xl font-bold mb-4'>飲食店登録</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <Label htmlFor='restaurantName' className='block mb-2'>
              飲食店名
            </Label>
            <TextInput
              type='text'
              id='restaurantName'
              placeholder='飲食店名'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='mb-2'
            />
            <Label htmlFor='description' className='block mb-2'>
              説明
            </Label>
            <Textarea
              id='description'
              placeholder='飲食店の説明'
              rows={8}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='mb-2'
            />
            <Label htmlFor='category' className='block mb-2'>
              カテゴリー
            </Label>
            <TextInput
              id='category'
              type='text'
              placeholder='カテゴリー'
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='mb-2'
            />
            <Label htmlFor='tags' className='block mb-2'>
              タグ
            </Label>
            <div className='grid grid-cols-12'>
              <div className='col-span-9'>
                <TextInput
                  id='tags'
                  type='text'
                  placeholder='タグ'
                  className='mb-2'
                />
              </div>
              <div className='col-span-3 ml-2'>
                <Button type='button' className='w-full'>
                  タグ追加
                </Button>
              </div>
            </div>
            <Label htmlFor='address' className='block mb-2'>
              住所
            </Label>
            <TextInput
              id='address'
              type='text'
              placeholder='住所'
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className='mb-2'
            />
          </div>
          <Button type='submit'>登録</Button>
        </form>
      </div>
      <div className='col-span-4'></div>
    </div>
  )
}
