import { Ctx } from "blitz"
import db from "db"

export default async function updateTeam(input: any, ctx: Ctx) {
  ctx.session.$authorize()

  const {
    id,
    title,
    description,
    members,
  }: {
    id: number
    title: string
    description: string
    members: any
  } = input.team

  members.map((member) => delete member.name)

  try {
    const updatedTeam = await db.team.update({
      where: { id },
      data: {
        title: title,
        description: description,

        ...(members && {
          members: {
            set: members,
          },
        }),
      },
    })
    return updatedTeam
  } catch (error) {
    console.error("UPDATE TEAM ERROR", error)
  }
}
