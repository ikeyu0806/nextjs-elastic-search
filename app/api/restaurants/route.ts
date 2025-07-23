import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'Restaurant API is ready!',
  })
}
