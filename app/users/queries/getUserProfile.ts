import { Ctx } from "blitz"
import { NotFoundError } from "blitz"

import db from "db"

export default async function getUserProfile(id: number, ctx: Ctx) {
  ctx.session.$authorize(["USER", "ADMIN"])

  try {
    const user = await db.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        assignedIssues: true,
        assignedProjects: true,
        inTeams: true,
      },
    })
    if (!user) {
      throw new NotFoundError()
    }
    return user
  } catch (error) {
    console.error("GET USER PROFILE ERROR", error)
  }
}
