import db from "db"

export default async function getProjects() {
  try {
    const projects = await db.project.findMany()
    return projects
  } catch (error) {
    console.error("getIssues Error ", error)
  }
}
