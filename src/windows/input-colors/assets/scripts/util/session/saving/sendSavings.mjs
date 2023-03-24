export async function sendSavings(savingsObject) {
  let response = '';

  try {
    response = await fetch('http://127.0.0.1:8080', {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(savingsObject)
    })
  } catch (err) {
    console.log(`Error: ${err.message} at 'sendSavings.mjs`);
  }
  
  return response;
}