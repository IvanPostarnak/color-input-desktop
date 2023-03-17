// function to fill IssueNote with actual data
export function fillIssueNote(issueNote, issue) {
  issueNote.childNodes[0].textContent = issue.name;
  issueNote.childNodes[1].textContent = issue.description;
}

// function to create new issue note
export function createIssueNote() {
  // creating issue note itself
  const issueNote = document.createElement('article');
  issueNote.classList.add('session-data-components__issue-note');

  // creating h2 tag for name of issue
  const issueNoteName = document.createElement('h2');
  issueNoteName.classList.add('session-data-components__issue-note-name');
  issueNote.append(issueNoteName);

  // creating p tag for text of issue
  const issueNoteDescription = document.createElement('p');
  issueNoteDescription.classList.add('session-data-components__issue-note-name');
  issueNote.append(issueNoteDescription);

  // creating deleting button
  const issueNoteDeleter = document.createElement('button');
  issueNoteDeleter.classList.add('session-data-components__issue-note-deleter');
  issueNote.append(issueNoteDeleter);

  return issueNote;
}