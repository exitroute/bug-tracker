import { Ctx } from "blitz"
import db from "db"

export default async function deleteUserProfile({ id }, ctx: Ctx) {
  ctx.session.$authorize("ADMIN")
  const user = await db.user.delete({
    where: { id },
  })
  return user
}
