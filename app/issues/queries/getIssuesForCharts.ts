import db from "db"

export default async function getIssuesForCharts() {
  try {
    const users = await db.user.findMany({
      select: { id: true, name: true },
    })
    const issuesPerUser = await db.issue.groupBy({
      by: ["assignedToId"],
      _count: {
        assignedToId: true,
      },
    })
    const status = await db.issue.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
    })
    const priority = await db.issue.groupBy({
      by: ["priority"],
      _count: {
        priority: true,
      },
    })
    const totalIssues = await db.issue.count({
      select: {
        _all: true, // Count all records
        assignedToId: true, // Count all non-null field values
        status: true,
        priority: true,
      },
    })

    return { totalIssues, issuesPerUser, status, priority, users }
  } catch (error) {
    console.error("getIssues Error ", error)
  }
}
