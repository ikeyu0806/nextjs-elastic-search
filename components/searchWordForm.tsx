import { Button, Label, TextInput } from 'flowbite-react'
import { useAtom } from 'jotai'
import { searchWordAtom } from '../atoms/searchWordAtoms'

export default function SearchWordForm() {
  const [searchTerm, setSearchTerm] = useAtom(searchWordAtom)

  return (
    <>
      <div className='mb-2 block'>
        <Label htmlFor='searchWord'>検索ワード</Label>
      </div>
      <TextInput
        id='searchWord'
        placeholder='焼肉, 寿司, ラーメンなど'
        required
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='mt-4'>
        <Button type='submit'>検索</Button>
      </div>
    </>
  )
}
