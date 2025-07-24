import { TextInput, Button } from 'flowbite-react'

export default function RegisterRestaurant() {
  return (
    <div className='grid grid-cols-12 p-4'>
      <div className='col-span-4'></div>
      <div className='col-span-4'>
        <h1 className='text-3xl font-bold mb-4'>レストラン登録</h1>
        <form>
          <div className='mb-4'>
            <TextInput
              id='name'
              type='text'
              placeholder='レストラン名'
              required
              className='mb-2'
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
            <TextInput
              id='rating'
              type='number'
              placeholder='評価 (1-5)'
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
