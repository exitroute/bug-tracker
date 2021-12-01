import { Ctx } from "blitz"
import db from "db"

export default async function updateProject({ id, ...data }, ctx: Ctx) {
  ctx.session.$authorize("ADMIN")
  try {
    const { project } = data
    const updatedProject = await db.project.update({
      where: { id },
      data: {
        title: project.title,
        description: project.description,
        updatedBy: {
          connect: {
            id: ctx.session.userId,
          },
        },
        assignedIssues: {
          connect: {
            id: Number(project.assignedTo.id),
          },
        },
      },
    })
    return updatedProject
  } catch (error) {
    console.error("UPDATE ISSUE ERROR", error)
  }
}
