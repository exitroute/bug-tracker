import db from "db"

export default async function getProjects() {
  try {
    const projects = await db.project.findMany({
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
    console.error("getIssues Error ", error)
  }
}
