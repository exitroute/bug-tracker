import { NotFoundError } from "blitz"
import db from "db"

export default async function getProject(id: number) {
  const project = await db.project.findUnique({
    where: { id: id },
    include: {
      assignedTo: {
        select: {
          id: true,
          name: true,
        },
      },
      assignedTeam: {
        select: {
          id: true,
          title: true,
        },
      },
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
      assignedIssues: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  })
  if (!project) {
    throw new NotFoundError()
  }
  return project
}
