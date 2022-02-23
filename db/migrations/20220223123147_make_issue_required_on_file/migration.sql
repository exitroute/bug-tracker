-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_issueId_fkey";

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
