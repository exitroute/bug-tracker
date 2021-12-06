import { NotFoundError } from "blitz"
import db from "db"

export default async function getTeam(id: number) {
  const team = await db.team.findUnique({
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
      members: {
        select: {
          name: true,
          id: true,
        },
      },
      assignedProjects: {
        select: {
          title: true,
        },
      },
    },
  })
  if (!team) {
    throw new NotFoundError()
  }
  return team
}
