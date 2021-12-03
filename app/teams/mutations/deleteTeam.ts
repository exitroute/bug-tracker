import { Ctx } from "blitz"
import db from "db"

export default async function deleteIssue({ id }, ctx: Ctx) {
  ctx.session.$authorize()
  const team = await db.team.delete({
    where: { id },
  })
  return team
}
