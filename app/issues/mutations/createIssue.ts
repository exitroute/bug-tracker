import { Ctx } from "blitz"
import db from "db"

export default async function createIssue(input: any, ctx: Ctx) {
  ctx.session.$authorize()
  const issue = await db.issue.create({
    data: {
      title: input.title,
      description: input.description,
      createdBy: {
        connect: {
          id: ctx.session.userId,
        },
      },
      assignedTo: {
        connect: {
          id: Number(input.assignedTo),
        },
      },
    },
  })

  return issue
}
