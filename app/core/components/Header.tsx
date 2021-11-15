import { Suspense } from "react"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import LogoutButton from "app/core/components/LogoutButton"

const UserInfo = () => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return (
      <div>
        User: <code>{currentUser.email}</code>
      </div>
    )
  } else {
    return null
  }
}

const Header = (props) => {
  return (
    <header>
      <Suspense fallback="Loading profile...">
        <UserInfo />
      </Suspense>
      <div>{props.title}</div>
      <LogoutButton />
    </header>
  )
}

export default Header
