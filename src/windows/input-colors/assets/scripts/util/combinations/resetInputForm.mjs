export function resetInputForm(inputForm) {
  let arrayOfInputs = Array.from(inputForm.querySelectorAll('input'));
  arrayOfInputs.forEach((input) => {
    input.value = "";
    // Create and dispatch a new input event
    let event = new Event("input", { bubbles: true });
    input.dispatchEvent(event);
  })
}