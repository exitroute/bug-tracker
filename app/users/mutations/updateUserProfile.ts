import { Ctx } from "blitz"
import db from "db"

export default async function updateUserProfile(input: any, ctx: Ctx) {
  ctx.session.$authorize("ADMIN")

  const {
    id,
    name,
    email,
  }: {
    id: number
    name: string
    email: string
  } = input.userProfile

  try {
    const updatedIssue = await db.user.update({
      where: { id: id },
      data: {
        name: name,
        email: email,
        // role: role,
        // ...(assignedTo && {
        //   assignedTo: {
        //     connect: {
        //       id: Number(assignedTo.id),
        //     },
        //   },
        // }),
      },
    })
    return updatedIssue
  } catch (error) {
    console.error("UPDATE ISSUE ERROR", error)
  }
}
