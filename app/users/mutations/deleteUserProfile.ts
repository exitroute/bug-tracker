import { Ctx } from "blitz"
import db from "db"

export default async function deleteUserProfile({ id }, ctx: Ctx) {
  ctx.session.$authorize("ADMIN")
  try {
    const deletedUser = await db.user.delete({
      where: { id },
    })
    return deletedUser
  } catch (error) {
    console.error("DELETE ISSUE ERROR", error)
  }
}
