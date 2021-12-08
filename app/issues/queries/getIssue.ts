import { NotFoundError } from "blitz"
import db from "db"

export default async function getIssue(id: number) {
  try {
    const issue = await db.issue.findUnique({
      where: { id: id },
      include: {
        createdBy: {
          select: {
            name: true,
          },
        },
        updatedBy: {
          select: {
            name: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
    if (!issue) {
      throw new NotFoundError()
    }
    return issue
  } catch (error) {
    console.error("GET ISSUE ERROR", error)
  }
}
