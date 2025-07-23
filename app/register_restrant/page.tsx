import { Button, Checkbox, Label, TextInput } from 'flowbite-react'

export default function Home() {
  return (
    <form className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name">飲食店名</Label>
        </div>
        <TextInput id="name" required />
      </div>
      <Button type="submit">登録する</Button>
    </form>
  )
}
