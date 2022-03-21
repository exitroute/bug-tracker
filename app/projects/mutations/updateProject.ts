import { Ctx } from "blitz"
import db from "db"

export default async function updateProject(input: any, ctx: Ctx) {
  ctx.session.$authorize("ADMIN")

  const {
    id,
    title,
    description,
    assignedIssue,
    assignedTo,
    assignedTeam,
  }: {
    id: number
    title: string
    description: string
    assignedIssue: any
    assignedTo: any
    assignedTeam: any
  } = input.project

  try {
    const updatedProject = await db.project.update({
      where: { id },
      data: {
        title: title,
        description: description,
        updatedBy: {
          connect: {
            id: ctx.session.userId,
          },
        },
        ...(assignedIssue && {
          assignedIssues: {
            connect: {
              id: Number(assignedIssue.id),
            },
          },
        }),
        ...(assignedTo && {
          assignedTo: {
            connect: {
              id: Number(assignedTo.id),
            },
          },
        }),
        ...(assignedTeam && {
          assignedTeam: {
            connect: {
              id: Number(assignedTeam.id),
            },
          },
        }),
      },
    })
    return updatedProject
  } catch (error) {
    console.error("UPDATE ISSUE ERROR", error)
  }
}
