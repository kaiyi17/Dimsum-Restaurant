$(document).ready(function(){
    $('#reservationTime').timepicker({
        appendTo: 'body',
        timeFormat: 'h:mm p',
        interval: 30,
        defaultTime: '10:00',
        minTime: '10',
        maxTime: '8:30pm',
        startTime: '10:00',
        dynamic: false,
        dropdown: true,
        scrollbar: true
    });

    var dateInput = document.getElementById("reservationDate");
    var currentDate = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", currentDate);

    $('#reservationForm').submit(function(event) {
        event.preventDefault();
        submitForm();
    });
});


function submitForm() {
    const firstName = document.getElementById('firstName').value; 
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const numberOfGuests = document.getElementById('numberOfGuests').value;
    const reservationDate = document.getElementById('reservationDate').value;
    const reservationTime = document.getElementById('reservationTime').value;

    clearErrors();
  
    let hasError = false;

    if (!isValidName(firstName)) {
        displayError('firstNameError', "Please enter a valid first name!");
        hasError = true;
    }
    else {
        displayError('firstNameError', "");
    }

    if (!isValidName(lastName)) { 
        document.getElementById('lastNameError').textContent = "Please enter a valid last name!";
        hasError = true;
      }

    if (!isValidPhoneNumber(phone)) {
        document.getElementById('phoneError').textContent = "Please enter a valid phone number!";
        hasError = true;
    }

    if (!isValidEmail(email)) {
        document.getElementById('emailError').textContent = "Please enter a valid email address!";
        hasError = true;
    }

    if (!isValidMessage(numberOfGuests)) {
        document.getElementById('numberOfGuestsError').textContent = "Number of Guest cannot be empty!";
        hasError = true;
      }
      if (!isValidMessage(reservationDate)) { 
        document.getElementById('reservationDateError').textContent = "Reservation Date cannot be empty!";
        hasError = true;
    }

    if (!isValidMessage(reservationTime)) {
        document.getElementById('reservationTimeError').textContent = "Reservation Time cannot be empty!";
        hasError = true;
    }

    if (!hasError) {
        const formData = {
            firstName:firstName,
            lastName:lastName,
            phone:phone,
            email:email,
            numberOfGuests: numberOfGuests,
            reservationDate: reservationDate,
            reservationTime: reservationTime
        };
        saveToLocalstorage(formData);
        alert("Your reservation has been saved!");
        resetForm();
    }

    // clearErrors();
}
  
function isValidName(name) {
    return name.trim() !== "";
}

function isValidEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email.trim());
}

function isValidPhoneNumber(phone) {
    const re = /^\+?[1-9]\d{1,14}$/;
    return re.test(phone.trim());
}

function isValidMessage(message) {
    return message.trim() !== "";
}


function displayError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

function clearErrors() {
    let errorElements = document.querySelectorAll('.error');
    errorElements.forEach(function(element) {
        element.textContent = '';
    });
}

function resetForm(){
    document.getElementById('firstName').value = "";
    document.getElementById('lastName').value ="";
    document.getElementById('phone').value = "";
    document.getElementById('email').value ="";
    document.getElementById('numberOfGuests').value="";
    document.getElementById('reservationDate').value="";
    document.getElementById('reservationTime').value="";
}