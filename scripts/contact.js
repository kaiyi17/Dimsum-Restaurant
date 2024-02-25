function handleSubmit(event) {
  event.preventDefault();

  submitForm();
  return false;
}


function submitForm() {
  const name = document.getElementById('form-name').value;
  const email = document.getElementById('form-email').value;
  const subject = document.getElementById('form-Subject').value;
  const message = document.getElementById('form-text').value;

  let hasError = false;

  if (!isValidName(name)) {
    document.getElementById('name-error').textContent = "Please enter a valid name!";
    hasError = true;
  } else {
    document.getElementById('name-error').textContent = "";
  }


  if (!isValidEmail(email)) {
    document.getElementById('email-error').textContent = "Please enter a valid email address!";
    hasError = true;
  } else {
    document.getElementById('email-error').textContent = "";
  }

  if (!isValidMessage(message)) {
    document.getElementById('message-error').textContent = "Message cannot be empty!";
    hasError = true;
  } else {
    document.getElementById('message-error').textContent = "";
  }

  let selectedOption = '';
  const radios = document.querySelectorAll("#feedbackForm input[type='radio']");

  radios.forEach(radio => {
    if (radio.checked) {
      selectedOption = radio.value;
    }
  });

  const formData = {
    name: name,
    email: email,
    subject: subject,
    selectedOption: selectedOption,
    message: message
  };

  if (!hasError) {
    saveToLocalstorage(formData);
    alert("Your feedback has been saved!");
    resetForm();
  }
}


function resetForm() {
  document.getElementById('form-name').value = '';
  document.getElementById('form-email').value = '';
  document.getElementById('form-Subject').value = '';
  document.getElementById('form-text').value = '';

  const radios = document.querySelectorAll("#feedbackForm input[type='radio']");
  radios.forEach(radio => {
    radio.checked = false;
  });

}

function isValidName(name) {
  return name.trim() !== "";
}

function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

function isValidMessage(message) {
  return message.trim() !== "";
}

function saveToLocalstorage(data) {
  localStorage.setItem('userFeedback', JSON.stringify(data));
}


//a function to get data
function getFromLocalStorage() {
  const data = localStorage.getItem('userFeedback');
  return JSON.parse(data);
}


