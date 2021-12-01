import { Ctx } from "blitz"
import db from "db"

export default async function updateIssue({ id, ...data }, ctx: Ctx) {
  ctx.session.$authorize()
  try {
    const { issue } = data
    const updatedIssue = await db.issue.update({
      where: { id },
      data: {
        title: issue.title,
        description: issue.description,
        updatedBy: {
          connect: {
            id: ctx.session.userId,
          },
        },
        assignedTo: {
          connect: {
            id: Number(issue.assignedTo.id),
          },
        },
      },
    })
    return updatedIssue
  } catch (error) {
    console.error("UPDATE ISSUE ERROR", error)
  }
}
