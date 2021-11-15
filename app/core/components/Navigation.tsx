import { Routes, Link } from "blitz"

const Navigation = () => {
  return (
    <nav>
      Navigation
      <ul>
        <li>
          <Link href={Routes.Home()}>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href={Routes.Issues()}>
            <a>Issues</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
