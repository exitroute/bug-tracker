import { Ctx } from "blitz"
import db from "db"

export default async function createTeam(input: any, ctx: Ctx) {
  ctx.session.$authorize("ADMIN")

  const {
    title,
    description,
    members,
  }: {
    title: string
    description: string
    members: any
  } = input.team

  try {
    const newTeam = await db.team.create({
      data: {
        title: title,
        description: description,
        createdBy: {
          connect: {
            id: ctx.session.userId,
          },
        },
        ...(members && {
          members: {
            connect: members,
          },
        }),
      },
    })

    return newTeam
  } catch (error: any) {
    console.error("CREATE TEAM ERROR", error)
  }
}
