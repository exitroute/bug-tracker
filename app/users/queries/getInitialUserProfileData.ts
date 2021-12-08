import { Ctx } from "blitz"
import { NotFoundError } from "blitz"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

import db from "db"

export default async function getInitialUserProfileData(id: number, ctx: Ctx) {
  ctx.session.$authorize(["ADMIN"])

  try {
    const user = await db.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })
    if (!user) {
      throw new NotFoundError()
    }
    return user
  } catch (error) {
    console.error("GET INITIAL USER PROFILE DATA ERROR", error)
  }
}
