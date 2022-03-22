import { Ctx } from "blitz"
import db from "db"

export default async function updateUserProfile(input: any, ctx: Ctx) {
  const {
    id,
    email,
    name,
    role,
    inTeams,
  }: {
    id: number
    email: string
    role: string
    name: string
    inTeams?: {
      id: number
    }
  } = input.userProfile

  if (ctx.session.userId === id) {
    ctx.session.$authorize("USER" || "ADMIN")
  }

  try {
    const updatedIssue = await db.user.update({
      where: { id: id },
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
    return updatedIssue
  } catch (error) {
    console.error("UPDATE ISSUE ERROR", error)
  }
}
