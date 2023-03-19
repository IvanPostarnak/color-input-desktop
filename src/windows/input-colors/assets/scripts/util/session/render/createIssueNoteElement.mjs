export function createIssueNoteElement() {
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