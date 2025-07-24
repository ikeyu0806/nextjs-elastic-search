import { TextInput } from "flowbite-react"

export default function RegisterRestaurant() {
  return (
    <div className='p-4'>
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
        <button type='submit' className='btn'>
          登録
        </button>
      </form>
    </div>
  )
}
