import React from "react"
import { Button } from "@chakra-ui/button"
import { useMutation } from "blitz"
import logout from "app/auth/mutations/logout"

export default function LogoutButton() {
  const [logoutMutation] = useMutation(logout)
  return (
    <Button
      onClick={async () => {
        await logoutMutation()
      }}
    >
      Logout
    </Button>
  )
}
