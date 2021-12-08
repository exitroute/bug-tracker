import { Ctx } from "blitz"
import db from "db"

export default async function deleteProject({ id }, ctx: Ctx) {
  ctx.session.$authorize("ADMIN")

  try {
    const project = await db.project.delete({
      where: { id },
    })
    return project
  } catch (error) {
    console.error("Delete Project Error ", error)
  }
}
