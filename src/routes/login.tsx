import {
  getUserProfileOptions,
  postLoginMutation,
} from '@/client/@tanstack/react-query.gen'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const [getProfile, setGetProfile] = React.useState(false)
  const [accessToken, setAccessToken] = React.useState('')

  console.log('Access Token:', accessToken)

  const loginMutation = useMutation({
    ...postLoginMutation(),
    onSuccess: (data) => {
      console.log('Login successful:', data)
      setAccessToken(data.tokens?.accessToken ?? '')
    },
  })

  const handleLogin = () => {
    loginMutation.mutate({
      body: {
        email: 'rakaaleandra@gmail.com',
        password: 'secretpassword',
      },
    })
  }

  const getUserProfile = useQuery({
    ...getUserProfileOptions({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
    enabled: getProfile,
  })

  if (!getUserProfile.isLoading && getUserProfile.data) {
    console.log('User Profile:', getUserProfile.data)
  }

  const handleGetProfile = () => {
    setGetProfile(!getProfile)
  }
  return (
    <>
      <div className='w-full h-screen flex items-center justify-center bg-white/20'>
        <div className='w-1/4 h-[10rem] bg-yellow-300/40 rounded-lg flex flex-col items-center justify-center'>
          <h1 className='text-2xl font-bold'>Login Page</h1>
          <button
            onClick={handleLogin}
            className='mt-4 px-4 py-2 bg-blue-500 text-white rounded font-bold cursor-pointer'
          >
            Login
          </button>
          <button
            onClick={handleGetProfile}
            className='mt-4 px-4 py-2 bg-red-500 text-white rounded font-bold cursor-pointer'
          >
            Get Profile
          </button>
        </div>
      </div>
    </>
  )
}
