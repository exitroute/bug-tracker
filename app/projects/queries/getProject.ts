import { NotFoundError } from "blitz"
import db from "db"

export default async function getProject(id: number) {
  const project = await db.project.findUnique({
    where: { id: id },
    include: {
      createdBy: {
        select: {
          name: true,
        },
      },
      // updatedBy: {
      //   select: {
      //     name: true,
      //   },
      // },
      // assignedTo: {
      //   select: {
      //     id: true,
      //     name: true,
      //   },
      // },
    },
  })
  if (!project) {
    throw new NotFoundError()
  }
  console.log(project)
  return project
}
