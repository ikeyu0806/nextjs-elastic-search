'use client'

import { useState } from 'react'
import { TextInput, Textarea, Button } from 'flowbite-react'

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
      const res = await fetch('/api/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([restaurant]), // 複数登録APIに1件でも配列で送る
      })

      if (!res.ok) {
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
            <TextInput
              type='text'
              id='restaurantName'
              placeholder='飲食店名'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='mb-2'
            />
            <Textarea
              id='description'
              placeholder='飲食店の説明'
              rows={8}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='mb-2'
            />
            <TextInput
              id='category'
              type='text'
              placeholder='カテゴリー'
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='mb-2'
            />
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
