import { NotFoundError } from "blitz"
import db from "db"

export default async function getInitialTeamData(id: number) {
  try {
    const initialTeamData = await db.team.findUnique({
      where: { id: id },
      include: {
        members: {
          select: {
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
    if (!initialTeamData) {
      throw new NotFoundError()
    }
    return initialTeamData
  } catch (error) {
    console.error("GET INITIAL TEAM DATA ERROR")
  }
}
