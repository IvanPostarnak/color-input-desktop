export function fillIssueNoteWithData(issueNote, issue) {
  issueNote.childNodes[0].textContent = issue.name;
  issueNote.childNodes[1].textContent = issue.description;
}