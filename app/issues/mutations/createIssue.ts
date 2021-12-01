import { Ctx } from "blitz"
import db from "db"

export default async function createIssue(input: any, ctx: Ctx) {
  ctx.session.$authorize()
  const newIssue = await db.issue.create({
    data: {
      title: input.issue.title,
      description: input.issue.description,
      createdBy: {
        connect: {
          id: ctx.session.userId,
        },
      },
      assignedTo: {
        connect: {
          id: Number(input.issue.assignedTo.id),
        },
      },
    },
  })

  return newIssue
}
