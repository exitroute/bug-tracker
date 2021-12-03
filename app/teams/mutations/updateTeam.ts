import { Ctx } from "blitz"
import db from "db"

export default async function updateTeam({ id, ...data }, ctx: Ctx) {
  ctx.session.$authorize()
  try {
    const { team } = data
    const updatedTeam = await db.team.update({
      where: { id },
      data: {
        title: team.title,
        description: team.description,
        // updatedBy: {
        //   connect: {
        //     id: ctx.session.userId,
        //   },
        // },
        // assignedTo: {
        //   connect: {
        //     id: Number(team.assignedTo.id),
        //   },
        // },
      },
    })
    return updatedTeam
  } catch (error) {
    console.error("UPDATE ISSUE ERROR", error)
  }
}
