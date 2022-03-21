import { Ctx } from "blitz"
import db from "db"

export default async function getCurrentUserProjects(_ = null, { session }: Ctx) {
  const id = session.userId

  try {
    const projects = await db.project.findMany({
      where: { assignedUserId: id },
      include: {
        assignedTeam: {
          select: {
            title: true,
          },
        },
        assignedTo: {
          select: {
            name: true,
          },
        },
        assignedIssues: {
          select: {
            priority: true,
            status: true,
          },
        },
        _count: {
          select: {
            assignedIssues: true,
          },
        },
      },
    })
    return projects
  } catch (error) {
    console.error("geProjects Error ", error)
  }
}
