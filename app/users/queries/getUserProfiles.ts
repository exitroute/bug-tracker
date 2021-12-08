import { Ctx } from "blitz"
import db from "db"

export default async function getUsersProfiles(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      inTeams: true,
      assignedIssues: true,
      assignedProjects: true,
    },
  })

  return users
}
