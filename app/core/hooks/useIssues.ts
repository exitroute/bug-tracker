import { useQuery } from "blitz"
import getIssues from "app/issues/queries/getIssues"

export const useIssues = () => {
  const issues = useQuery(getIssues, undefined)
  return issues
}
