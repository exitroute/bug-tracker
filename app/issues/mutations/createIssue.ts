import { Ctx } from "blitz"
import db from "db"

export default async function createIssue(input: any, ctx: Ctx) {
  ctx.session.$authorize()

  const {
    title,
    description,
    assignedTo,
  }: {
    title: string
    description: string
    assignedTo: any
  } = input.issue

  const newIssue = await db.issue.create({
    data: {
      title: title,
      description: description,
      createdBy: {
        connect: {
          id: ctx.session.userId,
        },
      },
      ...(assignedTo && {
        assignedTo: {
          connect: {
            id: Number(assignedTo.id),
          },
        },
      }),
    },
  })
  return newIssue
}
