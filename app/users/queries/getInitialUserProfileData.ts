import { Ctx } from "blitz"
import { NotFoundError } from "blitz"

import db from "db"

export default async function getInitialUserProfileData(id: number, ctx: Ctx) {
  const isAdmin = ctx.session.$isAuthorized(["ADMIN"])

  if (ctx.session.userId === id || isAdmin) {
    try {
      const user = await db.user.findUnique({
        where: { id: id },
        select: {
          id: true,
          email: true,
          name: true,
        },
      })
      if (!user) {
        throw new NotFoundError()
      }
      return user
    } catch (error) {
      console.error("GET INITIAL USER PROFILE DATA ERROR", error)
    }
  } else {
    console.log("You are not authorised to edit that profile")
  }
}
