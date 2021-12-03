import { Ctx } from "blitz"
import db from "db"

export default async function createTeam(input: any, ctx: Ctx) {
  ctx.session.$authorize()
  const newTeam = await db.team.create({
    data: {
      title: input.team.title,
      description: input.team.description,
      createdBy: {
        connect: {
          id: ctx.session.userId,
        },
      },
      // assignedTo: {
      //   connect: {
      //     id: Number(input.team.assignedTo.id),
      //   },
      // },
    },
  })

  return newTeam
}
