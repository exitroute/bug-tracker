import { Link, useRouter } from "blitz"
import { Button } from "@chakra-ui/react"
import React from "react"

const CreateNewButton = ({ title, display }) => {
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

  return (
    <Link href={title === "Home" ? `/issues/new` : `/${path}/new`}>
      <Button
        as="a"
        size="sm"
        w={{ base: "auto" }}
        colorScheme="blue"
        display={display}
        justify-content="center"
        align-items="center"
      >
        {title === "Home" ? `+ Issue` : `+ ${capitalized}`}
      </Button>
    </Link>
  )
}

export default CreateNewButton
