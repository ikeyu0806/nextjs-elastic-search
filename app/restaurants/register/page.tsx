import { TextInput, Textarea, Button } from 'flowbite-react'

export default function RegisterRestaurant() {
  return (
    <div className='grid grid-cols-12 p-4'>
      <div className='col-span-4'></div>
      <div className='col-span-4'>
        <h1 className='text-3xl font-bold mb-4'>レストラン登録</h1>
        <form>
          <div className='mb-4'>
            <TextInput
              type='text'
              id='restaurantName'
              placeholder='レストラン名'
              className='mb-2'
            />
            <Textarea
              id='description'
              placeholder='レストランの説明'
              className='mb-2'
              rows={8}
            />
            <TextInput
              id='category'
              type='text'
              placeholder='カテゴリー'
              required
              className='mb-2'
            />
            <TextInput
              id='address'
              type='text'
              placeholder='住所'
              required
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
