import { Ctx } from "blitz"
import db from "db"

export default async function updateIssue(input: any, ctx: Ctx) {
  ctx.session.$authorize()

  const {
    id,
    title,
    description,
    priority,
    status,
    assignedTo,
    files,
    newFiles,
  }: {
    id: number
    title: string
    description: string
    priority: string
    status: string
    assignedTo: any
    files: any
    newFiles: any
  } = input.issue

  const setFiles = (arr: []) => {
    interface File {
      id: number
    }

    if (!arr.length) {
      return []
    } else {
      return arr.map((item: File) => {
        const file: File = { id: item.id }
        return file
      })
    }
  }

  const createFiles = (arr: []) => {
    interface File {
      url: string
    }

    if (arr.length < 1) {
      return []
    } else {
      return arr.map((item: File) => {
        const file: File = { url: item.url }
        return file
      })
    }
  }

  try {
    const updatedIssue = await db.issue.update({
      where: { id },
      data: {
        title: title,
        description: description,
        ...(priority && { priority: priority }),
        ...(status && { status: status }),
        updatedBy: {
          connect: {
            id: ctx.session.userId,
          },
        },
        ...(assignedTo && {
          assignedTo: {
            connect: {
              id: Number(assignedTo.id),
            },
          },
        }),
        files: {
          set: setFiles(files),
          create: createFiles(newFiles),
        },
      },
    })
    return updatedIssue
  } catch (error) {
    console.error("UPDATE ISSUE ERROR", error)
  }
}
