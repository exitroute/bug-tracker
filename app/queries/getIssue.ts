import { NotFoundError } from "blitz"
import db from "db"

export default async function getIssue(id: number) {
  const issue = await db.issue.findUnique({
    where: { id: id },
    include: {
      createdBy: {
        select: {
          email: true,
        },
      },
    },
  })
  console.log("###", issue)
  if (!issue) {
    throw new NotFoundError()
  }
  return issue
}
