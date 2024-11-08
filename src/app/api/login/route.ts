import { NextResponse } from 'next/server'
import argon2 from 'argon2'

export async function POST(request: Request) {
  console.log('Received login request')
  console.log('Environment variables:', process.env)
  
  const HASHED_PASSWORD = process.env.HASHED_PASSWORD
  console.log('HASHED_PASSWORD:', HASHED_PASSWORD)

  if (!HASHED_PASSWORD) {
    console.error('HASHED_PASSWORD environment variable is not set')
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  let password
  try {
    const body = await request.json()
    password = body.password
    console.log('Received password:', password)
  } catch (error) {
    console.error('Error parsing request body:', error)
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!password) {
    return NextResponse.json({ error: 'Password is required' }, { status: 400 })
  }

  try {
    console.log('Attempting to verify password')
    console.log('HASHED_PASSWORD type:', typeof HASHED_PASSWORD)
    console.log('HASHED_PASSWORD length:', HASHED_PASSWORD.length)
    const isMatch = await argon2.verify(HASHED_PASSWORD, password)
    console.log('Password verification result:', isMatch)
    if (isMatch) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }
  } catch (error) {
    console.error('Error verifying password:', error)
    return NextResponse.json({ error: 'An error occurred during login' }, { status: 500 })
  }
}