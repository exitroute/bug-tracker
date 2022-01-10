import { Ctx } from "blitz"
import db from "db"

export default async function createIssue(input: any, ctx: Ctx) {
  ctx.session.$authorize()

  const {
    title,
    description,
    priority,
    assignedTo,
    files,
  }: {
    title: string
    description: string
    priority: string
    assignedTo: any
    files: [
      {
        url: string
      }
    ]
  } = input.issue

  try {
    const newIssue = await db.issue.create({
      data: {
        title: title,
        description: description,
        priority: priority,
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
        ...(files && {
          files: {
            create: files.map((item) => {
              const file = { url: item.url }
              return file
            }),
          },
        }),
      },
      include: {
        files: true,
      },
    })
    return newIssue
  } catch (error) {
    console.error("CREATE ISSUE ERROR", error)
  }
}
