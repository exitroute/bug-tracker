import { Ctx } from "blitz"
import db from "db"

export default async function updateIssue(input: any, ctx: Ctx) {
  ctx.session.$authorize()

  const {
    id,
    title,
    description,
    priority,
    status,
    assignedTo,
  }: {
    id: number
    title: string
    description: string
    priority: string
    status: string
    assignedTo: any
  } = input.issue

  try {
    const updatedIssue = await db.issue.update({
      where: { id },
      data: {
        title: title,
        description: description,
        ...(priority && { priority: priority }),
        ...(status && { status: status }),
        updatedBy: {
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
    return updatedIssue
  } catch (error) {
    console.error("UPDATE ISSUE ERROR", error)
  }
}
