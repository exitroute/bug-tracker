import React from "react"
import { useMutation } from "blitz"
import logout from "app/auth/mutations/logout"

export default function LogoutButton() {
  const [logoutMutation] = useMutation(logout)
  return (
    <button
      className="button small"
      onClick={async () => {
        await logoutMutation()
      }}
    >
      Logout
    </button>
  )
}
