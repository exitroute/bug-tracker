export const sortIssues = (arr) => {
  const unassignedNotSetNotSet: any[] = []
  const unassignedHighNew: any[] = []
  const unassignedNormNew: any[] = []
  const unassignedLowNew: any[] = []
  const highNew: any[] = []
  const highProg: any[] = []
  const normalNew: any[] = []
  const normalProg: any[] = []
  const lowNew: any[] = []
  const lowProg: any[] = []
  const closedArr: any[] = []
  const rest: any[] = []

  const high = "HIGH"
  const normal = "NORMAL"
  const low = "LOW"
  const closed = "CLOSED"
  const prog = "IN_PROGRESS"
  const newIssue = "NEW"

  arr.map((issue: any, idx: number) => {
    const { priority, status, assignedToId } = issue

    if (assignedToId === null && priority === null && status == null) {
      unassignedNotSetNotSet.push(issue)
    } else if (assignedToId === null && priority === high && status == newIssue) {
      unassignedHighNew.push(issue)
    } else if (assignedToId === null && priority === normal && status == newIssue) {
      unassignedNormNew.push(issue)
    } else if (assignedToId === null && priority === low && status == newIssue) {
      unassignedLowNew.push(issue)
    } else if (priority === high && status === newIssue) {
      highNew.push(issue)
    } else if (priority === high && status === prog) {
      highProg.push(issue)
    } else if (priority === normal && status === newIssue) {
      normalNew.push(issue)
    } else if (priority === normal && status === prog) {
      normalProg.push(issue)
    } else if (priority === low && status == newIssue) {
      lowNew.push(issue)
    } else if (priority === low && status == prog) {
      lowProg.push(issue)
    } else if (status === closed) {
      closedArr.push(issue)
    } else {
      console.log("WARNING Rest in sort")
      rest.push(issue)
    }
  })
  const sortedIssues = unassignedNotSetNotSet.concat(
    unassignedHighNew,
    unassignedNormNew,
    unassignedLowNew,
    highNew,
    highProg,
    normalNew,
    normalProg,
    lowNew,
    lowProg,
    closedArr,
    rest
  )
  return sortedIssues
}
