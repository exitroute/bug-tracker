import { useQuery } from "blitz"
import getIssues from "app/queries/getIssues"

export const useIssues = () => {
  const issues = useQuery(getIssues, undefined)
  return issues
}
