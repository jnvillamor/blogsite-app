import { logoutAction } from '@/lib/actions'
import React from 'react'

const LogoutButton = () => {
  return (
    <form action={logoutAction} method="post">
      <button
        type="submit"
        className="text-sm text-red-500 hover:underline cursor-pointer"
      >
        Logout
      </button> 
    </form>
  )
}

export default LogoutButton