import { Button, Checkbox, Label, TextInput } from 'flowbite-react'

export default function Home() {
  return (
    <form className="grid grid-cols-12 gap-4">
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
    </form>
  )
}
