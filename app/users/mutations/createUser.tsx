import { Ctx } from "blitz"
import db from "db"

export default async function createUser(input: any, ctx: Ctx) {
  ctx.session.$authorize("ADMIN")

  const {
    name,
    email,
  }: {
    name: string
    email: string
  } = input.userProfile

  try {
    const newUser = await db.user.create({
      data: {
        name: name,
        email: email,
      },
    })
    return newUser
  } catch (error) {
    console.error("CREATE USER ERROR", error)
  }
}
