import { Ctx } from "blitz"
import db from "db"

export default async function updateIssue({ id, ...data }, ctx: Ctx) {
  ctx.session.$authorize()
  const issue = await db.issue.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      updatedBy: {
        connect: {
          id: ctx.session.userId,
        },
      },
      updatedAt: new Date().toISOString(),
      assignedTo: {
        connect: {
          id: Number(data.assignedTo.id),
        },
      },
    },
  })

  return issue
}
