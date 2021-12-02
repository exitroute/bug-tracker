import { Link, useParam, useRouter } from "blitz"
import { Box } from "@chakra-ui/react"

export const BackButton = ({ title }) => {
  const router = useRouter()
  let slashes = new Array()
  let letters = new Array()

  router.asPath.split("").map((el, i) => {
    if (slashes.length < 2) el === "/" ? slashes.push(`${el}`) : letters.push(`${el}`)
    else return
  })

  const path = letters.join("")
  const singular = path.substring(0, path.length - 1)
  const capitalized = singular.charAt(0).toUpperCase() + singular.slice(1)

  const id = useParam(`${singular}Id`, "number")!

  if (title === capitalized) {
    return (
      <Link href={`/${path}`}>
        <a>{capitalized + "s"}</a>
      </Link>
    )
  } else if (title === "Edit") {
    return (
      <Link href={`/${path}/${id}`}>
        <a>Back</a>
      </Link>
    )
  } else if (title === "New") {
    return (
      <Link href={`/home`}>
        <a>Home</a>
      </Link>
    )
  } else {
    return (
      <Link href={`/home`}>
        <a>Home</a>
      </Link>
    )
  }
}

export const DetailsHeader = ({ title }) => {
  return (
    <Box as="header" p="1rem">
      <BackButton title={title} />
    </Box>
  )
}

export default DetailsHeader
