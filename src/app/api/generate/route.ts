import { NextResponse } from 'next/server'
import { generateSecret } from '~/lib/generate-secret'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const length = parseInt(searchParams.get('length') || '32')

  try {
    const secret = await generateSecret(length)
    return NextResponse.json({ secret }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate secret' },
      { status: 500 }
    )
  }
}
