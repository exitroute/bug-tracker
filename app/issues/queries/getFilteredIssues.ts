import db from "db"
import { sortIssues } from "app/core/filters/filters"

export interface Filter {
  id: number | null
  status: string | null
  priority: string | null
}

export default async function getFilteredIssues(filter: Filter) {
  const { id, status, priority } = filter

  if (id === 0) {
    try {
      const issues = await db.issue.findMany({
        include: {
          assignedTo: {
            select: {
              name: true,
            },
          },
        },
      })
      return sortIssues(issues)
    } catch (error) {
      console.error("getFilteredIssues Error ", error)
    }
  }

  try {
    const issues = await db.issue.findMany({
      where: {
        OR: [
          {
            assignedToId: {
              equals: id,
            },
          },
          {
            priority: {
              equals: priority,
            },
          },
          {
            status: {
              equals: status,
            },
          },
        ],
      },
      include: {
        assignedTo: {
          select: {
            name: true,
          },
        },
      },
    })
    return sortIssues(issues)
  } catch (error) {
    console.error("getFilteredIssues Error ", error)
  }
}
