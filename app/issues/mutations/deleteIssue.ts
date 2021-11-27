import { Ctx } from "blitz"
import db from "db"

export default async function deleteIssue({ id }, ctx: Ctx) {
  ctx.session.$authorize()
  const issue = await db.issue.delete({
    where: { id },
  })
  return issue
}
