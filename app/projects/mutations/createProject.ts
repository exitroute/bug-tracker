import { Ctx } from "blitz"
import db from "db"

export default async function createProject(input: any, ctx: Ctx) {
  ctx.session.$authorize("ADMIN")

  const {
    title,
    description,
    assignedIssue,
  }: {
    title: string
    description: string
    assignedIssue: any
  } = input.project

  try {
    const newProject = await db.project.create({
      data: {
        title: title,
        description: description,
        createdBy: {
          connect: {
            id: ctx.session.userId,
          },
        },
        ...(assignedIssue && {
          assignedIssues: {
            connect: {
              id: Number(assignedIssue.id),
            },
          },
        }),
      },
    })
    return newProject
  } catch (error) {
    console.error("CREATE PROJECT ERROR", error)
  }
}
