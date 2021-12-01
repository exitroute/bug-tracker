import { Ctx } from "blitz"
import db from "db"

export default async function createProject(input: any, ctx: Ctx) {
  ctx.session.$authorize("ADMIN")
  const newProject = await db.project.create({
    data: {
      title: input.project.title,
      description: input.project.description,
      createdBy: {
        connect: {
          id: ctx.session.userId,
        },
      },
      assignedIssues: {
        connect: {
          id: Number(input.project.assignedTo.id),
        },
      },
    },
  })

  return newProject
}
