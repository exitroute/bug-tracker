import { Ctx } from "blitz"
import db from "db"

export default async function createUser(input: any, ctx: Ctx) {
  ctx.session.$authorize("ADMIN")

  const {
    email,
    name,
    role,
    inTeams,
  }: {
    email: string
    role: string
    name: string
    inTeams?: {
      id: number
    }
  } = input.userProfile

  try {
    const newUser = await db.user.create({
      data: {
        name: name,
        email: email,
        role: role,
        ...(inTeams && {
          inTeams: {
            connect: {
              id: Number(inTeams.id),
            },
          },
        }),
      },
    })
    return newUser
  } catch (error) {
    console.error("CREATE USER ERROR", error)
  }
}
