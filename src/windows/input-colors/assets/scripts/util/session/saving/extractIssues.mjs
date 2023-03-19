export function extractIssuesIntoSavings(savings, issuesHolder) {
  if (issuesHolder.issues == undefined) return;
  issuesHolder.issues.forEach((issue) => {
    savings.issues.push(JSON.parse(JSON.stringify(issue)));
    savings.length += issuesHolder.length;
  })
}