import db from "db"

export default async function getTeams() {
  try {
    const teams = await db.team.findMany()
    return teams
  } catch (error) {
    console.error("getIssues Error ", error)
  }
}
