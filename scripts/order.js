/*
Team 6: Kaiyi Wu
Date: 2023-09-21
*/

'use restrict';

const categories = ['Dim Sum', 'Congee', 'Soups', 'Rice and Noodles', 'Main', 'Beverages'];
const menuItems = [

  // Dim sum
  { id: 101, name: 'Har Gao', category: 'Dim Sum', price: 5.50, image: '../images/item101.jpg', description: '4 pieces' },
  { id: 102, name: 'SiuMai', category: 'Dim Sum', price: 5.50, image: '../images/item102.jpg', description: '4 pieces' },
  { id: 103, name: 'Sticky Rice', category: 'Dim Sum', price: 5.50, image: '../images/item103.jpg', description: '2 pieces' },
  { id: 104, name: 'Steamed pork ribs in black peper sauce', category: 'Dim Sum', price: 5.50, image: '../images/item104.jpg', description: '' },
  { id: 105, name: 'Steamed chicken feet with Imperial special sauce', category: 'Dim Sum', price: 5.95, image: '../images/item105.jpg', description: '' },
  { id: 106, name: 'Minced pork and vegetable wrapped in curd skin', category: 'Dim Sum', price: 5.95, image: '../images/item106.jpg', description: '' },

  // congee
  { id: 201, name: 'Fish Fillet Congee ', category: 'Congee', price: 9.95, image: '../images/item201.jpg', description: '1 bowl' },
  { id: 202, name: 'Beef Congee ', category: 'Congee', price: 7.95, image: '../images/item202.jpg', description: '1 bowl' },
  { id: 203, name: 'Porc and Century Egg', category: 'Congee', price: 7.95, image: '../images/item203.jpg', description: '1 bowl' },

  // Soups
  { id: 301, name: 'Won Ton Soup', category: 'Soups', price: 4.45, image: '../images/item301.jpg', description: '1 small bowl' },
  { id: 302, name: 'Hot & Sour Soup', category: 'Soups', price: 4.45, image: '../images/item302.jpg', description: '1 small bowl' },
  { id: 303, name: 'Tom Yum Goong', category: 'Soups', price: 6.45, image: '../images/item303.jpg', description: '1 small bowl' },

  // Rice and Noodles
  { id: 401, name: 'Stir-fried flat rice noodle with beef', category: 'Rice and Noodles', price: 13.95, image: '../images/item401.jpg', description: '' },
  { id: 402, name: 'Rice noodle in Singapore style', category: 'Rice and Noodles', price: 13.95, image: '../images/item402.jpg', description: '' },
  { id: 403, name: 'Fried rice in Young Chow style', category: 'Rice and Noodles', price: 13.95, image: '../images/item403.jpg', description: '' },


  // Main
  { id: 501, name: 'General Tao Chicken', category: 'Main', price: 14.95, image: '../images/item501.jpg', description: '' },
  { id: 502, name: 'Sweet and sour pork', category: 'Main', price: 15.95, image: '../images/item502.jpg', description: '' },
  { id: 503, name: 'Stir-Fried Cumin Beef', category: 'Main', price: 17.95, image: '../images/item503.jpg', description: '' },
  { id: 504, name: 'Roasted Chicke', category: 'Main', price: 14.95, image: '../images/item504.jpg', description: 'whole' },
  { id: 505, name: 'BBQ Pork', category: 'Main', price: 15.95, image: '../images/item505.jpg', description: '' },
  { id: 506, name: 'Roasted Duck', category: 'Main', price: 17.95, image: '../images/item506.jpg', description: 'whole' },

  // Breuvages
  { id: 601, name: 'Coca-Cola', category: 'Beverages', price: 2.50, image: '../images/item601.jpg', description: '' },
  { id: 602, name: 'Sprite ', category: 'Beverages', price: 2.50, image: '../images/item602.jpg', description: '' },
  { id: 603, name: 'Nestea', category: 'Beverages', price: 2.50, image: '../images/item603.jpg', description: '' },
  { id: 604, name: 'Diet Coke', category: 'Beverages', price: 2.50, image: '../images/item604.jpg', description: '' },
  { id: 605, name: 'Canada Dry', category: 'Beverages', price: 2.50, image: '../images/item605.jpg', description: '' },
  { id: 606, name: 'Wong Lo Kat', category: 'Beverages', price: 3.50, image: '../images/item606.jpg', description: '' },

];

const cart = [];

let tipPercentage = 0;
let selectedOption = '';

let step2Info = {
  selectedOption: '',
  pickupName: '',
  pickupPhone: '',
  pickupTime: '',
  tableNumber: ''
};

let paymentDetails = {
  subtotal: 0,
  GST: 0,
  QST: 0,
  tips: 0,
  total: 0
};

let currentStep = 1;


// Create categories
categories.forEach(category => {
  const categoryDiv = document.createElement('div');
  categoryDiv.className = 'category';
  categoryDiv.textContent = category;
  categoryDiv.addEventListener('click', () => showMenuItems(category));
  document.getElementById('categories').appendChild(categoryDiv);
});

function loadItemsByCategory(category) {
  showMenuItems(category);
} //end function loadItemsByCategory

// show items 
function showMenuItems(category) {
  const menuDiv = document.getElementById('menu');
  menuDiv.innerHTML = '';
  const filteredItems = menuItems.filter(item => item.category === category);

  let row;
  filteredItems.forEach((item, index) => {
    if (index % 3 === 0) {
      row = document.createElement('div');
      row.className = 'row equal-card-height';
      menuDiv.appendChild(row);
    }

    const col = document.createElement('div');
    col.className = 'col-md-4';

    const card = document.createElement('div');
    card.className = 'card';

    const cardImage = document.createElement('img');
    cardImage.className = 'card-img-top';
    cardImage.src = item.image;

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('div');
    cardTitle.className = 'd-flex justify-content-between quantityChangeBtn';

    const itemName = document.createElement('span');
    itemName.className = 'itemDescription';
    itemName.textContent = `${item.id}-${item.name}`;

    const itemPrice = document.createElement('span');
    itemPrice.className = 'price-color';
    itemPrice.textContent = `$${item.price.toFixed(2)}`;

    cardTitle.appendChild(itemName);
    cardTitle.appendChild(itemPrice);

    const cardDescription = document.createElement('div');
    cardDescription.className = 'text-muted';
    cardDescription.textContent = `#${item.id} | ${item.description}`;

    const addButton = document.createElement('button');
    addButton.className = 'btn btn-warning add-to-cart';

    const addSymbol = document.createElement('span');
    addSymbol.className = 'add-symbol';
    addSymbol.textContent = '+';

    const addText = document.createElement('span');
    addText.className = 'add-text';
    addText.textContent = ' Add';

    addButton.appendChild(addSymbol);
    addButton.appendChild(addText);

    // addButton.textContent = '+';
    addButton.addEventListener('click', () => {
      addToCart(item);
    });

    const actionRow = document.createElement('div');
    actionRow.className = 'd-flex justify-content-between align-items-center';


    cardBody.appendChild(cardTitle);
    actionRow.appendChild(cardDescription);
    actionRow.appendChild(addButton);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(actionRow);

    card.appendChild(cardImage);
    card.appendChild(cardBody);
    col.appendChild(card);
    row.appendChild(col);
  })
}//end showMenuItems


function handleTipClick(event) {
  const selectedValue = event.target.getAttribute('data-tip');
  const customTipElement = document.getElementById('customTip');

  if (selectedValue === "custom") {
    customTipElement.style.display = 'block';
  } else {
    customTipElement.style.display = 'none';
    tipPercentage = parseFloat(selectedValue);
  }

  document.getElementById('tipRow').style.display = 'block';
  updateCart();
}//end function handleTipClick

// addToCart 
function addToCart(item) {
  const existingItem = cart.find(cartItem => cartItem.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const clonedItem = JSON.parse(JSON.stringify(item));
    clonedItem.quantity = 1;
    cart.push(clonedItem);
  }

  updateCart();
}//end function addToCart

// updateCart 
function updateCart() {

  const cartDiv = document.getElementById('cart');
  cartDiv.innerHTML = '';
  let subtotal = 0.00;

  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';

    const firstRow = document.createElement('div');
    firstRow.className = 'd-flex justify-content-between';

    const itemName = document.createElement('span');
    itemName.textContent = `#${item.id}-${item.name}`;

    const itemPrice = document.createElement('span');
    itemPrice.textContent = `$${item.price.toFixed(2)}`;

    firstRow.appendChild(itemName);
    firstRow.appendChild(itemPrice);

    const secondRow = document.createElement('div');
    secondRow.className = 'text-muted';
    secondRow.textContent = `${item.id} | ${item.description}`;

    const thirdRow = document.createElement('div');
    thirdRow.className = 'd-flex flex-wrap justify-content-between';

    const quantityGroup = document.createElement('div');
    quantityGroup.className = 'quantity-group custom-quantity-group';

    const decreaseButton = document.createElement('button');
    decreaseButton.className = "btn btn-warning";
    decreaseButton.textContent = '-';
    decreaseButton.addEventListener('click', () => {
      if (item.quantity > 1) {
        item.quantity--;
        updateCart();
      }
    });

    const quantitySpan = document.createElement('span');
    quantitySpan.className = 'quantitySpan';
    quantitySpan.textContent = item.quantity || 1;
    item.quantity = item.quantity || 1;

    const increaseButton = document.createElement('button');
    increaseButton.className = "btn btn-warning";
    increaseButton.textContent = '+';
    increaseButton.addEventListener('click', () => {
      item.quantity++;
      updateCart();
    });

    quantityGroup.appendChild(decreaseButton);
    quantityGroup.appendChild(quantitySpan);
    quantityGroup.appendChild(increaseButton);

    const removeButton = document.createElement('button');
    removeButton.className = "removeButton custom-remove-button";
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      const index = cart.indexOf(item);
      cart.splice(index, 1);
      updateCart();
    });


    thirdRow.appendChild(quantityGroup);
    thirdRow.appendChild(removeButton);

    cartItem.appendChild(firstRow);
    cartItem.appendChild(secondRow);
    cartItem.appendChild(thirdRow);

    cartDiv.appendChild(cartItem);

    quantitySpan.textContent = item.quantity;

    item.totalPrice = item.price * item.quantity;

    subtotal += item.totalPrice;
  });


  document.getElementById('subtotal').textContent = subtotal.toFixed(2);
  const taxGST = subtotal * 0.05;
  const taxQST = subtotal * 0.9975;
  document.getElementById('taxGST').textContent = taxGST.toFixed(2);
  document.getElementById('taxQST').textContent = taxQST.toFixed(2);

  if (typeof customTipAmount !== 'undefined' && customTipAmount !== null) {
    tipAmount = customTipAmount;
  } else {
    tipAmount = subtotal * (tipPercentage / 100);
  }
  document.getElementById('tipAmount').textContent = tipAmount.toFixed(2);

  const total = subtotal + taxGST + taxQST + tipAmount;
  document.getElementById('total').textContent = total.toFixed(2);

  paymentDetails.subtotal = subtotal.toFixed(2);
  paymentDetails.GST = taxGST.toFixed(2);
  paymentDetails.QST = taxQST.toFixed(2);
  paymentDetails.tips = tipAmount.toFixed(2);
  paymentDetails.total = total.toFixed(2);

}//end function updateCart

function goBackOneStep() {
  console.log("Current Step before Back:", currentStep);
  console.log("Going to Previous Step:", currentStep - 1);
  currentStep--;
  switchStep(`step${currentStep + 1}`, `step${currentStep}`);
  console.log("Current Step after Back:", currentStep);
  checkButtons(currentStep);
}

function updateStep(newStep) {
  currentStep = newStep;
  checkButtons(currentStep);
}

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {

  loadItemsByCategory('Dim Sum');

  const pickUpFields = document.getElementById('pickUpFields');
  const dineInFields = document.getElementById('dineInFields');
  const deliveryInputs = document.querySelectorAll('input[name="delivery"]');
  const accordionButtons = document.querySelectorAll('.accordion-button');


  document.getElementById('nextBtn').addEventListener('click', function () {
    console.log("Current Step before Next:", currentStep);
    console.log("Going to Next Step:", currentStep + 1);
    switchStep(`step${currentStep}`, `step${currentStep + 1}`);
    currentStep++;
    console.log("Current Step after Next:", currentStep);
    checkButtons(currentStep);
  });

  document.getElementById('backBtn').addEventListener('click', function () {
    console.log("Current Step before Back:", currentStep);
    console.log("Going to Previous Step:", currentStep - 1);
    switchStep(`step${currentStep}`, `step${currentStep - 1}`);
    console.log("Current Step after Back:", currentStep);
    checkButtons(currentStep);



    const newBackBtn = document.getElementById('newBackBtn');
    const placeOrderBtn = document.getElementById('placeOrderBtn');

    document.getElementById('backBtn').addEventListener('click', goBackOneStep);


    if (newBackBtn) {
      newBackBtn.addEventListener("click", goBackOneStep);
    }
    if (placeOrderBtn) {
      placeOrderBtn.addEventListener("click", function () {
        console.log("Place Order Button clicked.");
      });
    }
  });


  const tipButtons = document.querySelectorAll('.tip-button');
  tipButtons.forEach(button => {
    button.addEventListener('click', handleTipClick);
  });

  // custom tips
  document.getElementById('customTip').addEventListener('input', function (event) {
    customTipAmount = parseFloat(event.target.value) || 0;
    updateCart();
  });

  accordionButtons.forEach((button) => {
    button.addEventListener('click', function () {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });


  // step2
  const pickupNameInput = document.getElementById("pickupName");
  const pickupPhoneInput = document.getElementById("pickupPhone");
  const pickupTimeInput = document.getElementById("pickupTime");
  const tableNumberInput = document.getElementById("tableNumber");

  deliveryInputs.forEach((input) => {
    input.addEventListener('change', function () {
      step2Info.selectedOption = this.value;

      if (this.value === 'pickUp') {
        pickUpFields.style.display = 'block';
        dineInFields.style.display = 'none';
      } else {
        dineInFields.style.display = 'block';
        pickUpFields.style.display = 'none';
      }

      pickupNameInput.addEventListener("input", function () {
        step2Info.pickupName = this.value;
      });

      pickupPhoneInput.addEventListener("input", function () {
        step2Info.pickupPhone = this.value;
      });

      pickupTimeInput.addEventListener("input", function () {
        step2Info.pickupTime = this.value;
      });

      tableNumberInput.addEventListener("input", function () {
        step2Info.tableNumber = this.value;
      });

    });
  });

});

function checkButtons(step) {
  if (step > 1) {
    document.getElementById('backBtn').style.display = 'inline';
  } else {
    document.getElementById('backBtn').style.display = 'none';
  }
}//end function checkButtons

document.getElementById('nextBtn').addEventListener('click', function () {
  switchStep('step2', 'step3');
});

function goToStep2() {
  if (userHasMadeSelectionsInStep2()) {
    disableBackToStep1Button();
  } else {
    enableBackToStep1Button();
  }
}

// 
function backToStep2FromStep1() {
  resetLogicForNextButton();
}

function switchStep(currentStepId, nextStepId) {

  document.getElementById(currentStepId).style.display = 'none';

  $(".step").hide();

  document.getElementById(nextStepId).style.display = 'block';


  if (nextStepId === 'step4') {
    console.log("Entered Step 4, current step is:", currentStep);  // testing 
    const orderSummary = document.querySelector(".orderSummary");

    orderSummary.style.display = "none";
    const step4Div = document.getElementById("step4");

    if (step4Div) {
      step4Div.innerHTML = '';
    }

    const buttonContainer = document.getElementById("buttonContainer");
    if (buttonContainer) {
      buttonContainer.innerHTML = '';
    }

    // add step 2 info
    const step2Summary = document.createElement("div");
    step2Summary.textContent = `You selected ${step2Info.selectedOption}`;
    step4Div.appendChild(step2Summary);

    if (step2Info.selectedOption === 'pickUp') {
      const pickUpDetails = document.createElement("div");
      pickUpDetails.innerHTML = `
      Name: ${step2Info.pickupName} <br>
      Phone: ${step2Info.pickupPhone} <br>
      Time: ${step2Info.pickupTime}
    `;
      step4Div.appendChild(pickUpDetails);
    }

    if (step2Info.selectedOption === 'dineIn') {
      const dineInDetails = document.createElement("div");
      dineInDetails.innerHTML = `Table Number: ${step2Info.tableNumber}`;
      step4Div.appendChild(dineInDetails);
    }

    // extract items info from Order summary
    const selectedItems = orderSummary.querySelectorAll(".cart-item");
    selectedItems.forEach((item) => {
      const simplifiedItem = document.createElement('div');
      simplifiedItem.className = 'cart-item';

      const firstRow = document.createElement('div');
      firstRow.className = 'd-flex justify-content-between';

      const currentQuantity = item.querySelector(".quantitySpan") ? item.querySelector(".quantitySpan").textContent : 1;
      const currentName = item.querySelector('span:nth-child(1)') ? item.querySelector('span:nth-child(1)').textContent : "Unknown Item";
      const currentPrice = item.querySelector('span:nth-child(2)') ? item.querySelector('span:nth-child(2)').textContent : "$0.00";

      const itemName = document.createElement('span');
      itemName.textContent = `${currentQuantity} x ${currentName}`;

      const itemPrice = document.createElement('span');
      itemPrice.textContent = currentPrice;

      firstRow.appendChild(itemName);
      firstRow.appendChild(itemPrice);
      simplifiedItem.appendChild(firstRow);

      step4Div.appendChild(simplifiedItem);
    });


    // add payment info
    const paymentInfo = document.createElement("div");
    paymentInfo.style.textAlign = "right";
    paymentInfo.innerHTML = `
      Subtotal: $${paymentDetails.subtotal}<br>
      GST: $${paymentDetails.GST}<br>
      QST: $${paymentDetails.QST}<br>
      Tips: $${paymentDetails.tips}<br>
      Total: $${paymentDetails.total}
    `;
    step4Div.appendChild(paymentInfo);

    // creaet back button 
    const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.className = "btn btn-secondary";
    backButton.id = "newBackBtn";

    backButton.addEventListener("click", function () {
      console.log("New Back Button clicked. Current step before:", currentStep);  // Debug
      currentStep--;
      switchStep(`step${currentStep + 1}`, `step${currentStep}`);
      console.log("Current step after:", currentStep);

      console.log("Current step after:", currentStep);  // Debug
      checkButtons(currentStep);

      if (currentStep === 3) {
        const orderSummaryElement = document.querySelector('.orderSummary');
        if (orderSummaryElement) {
          orderSummaryElement.style.display = 'block';
          console.log("Order Summary should be visible now.");
        } else {
          console.log("Order Summary element not found.");
        }
      }
    });

    buttonContainer.appendChild(backButton);

    // create place order button
    const placeOrderBtn = document.createElement("button");
    placeOrderBtn.textContent = "Place Order";
    placeOrderBtn.className = "btn btn-warning";
    placeOrderBtn.id = "placeOrderBtn";

    buttonContainer.appendChild(placeOrderBtn);

    placeOrderBtn.addEventListener("click", function () {
      const leftPanel = document.getElementById("leftPanel");
      if (leftPanel) {
        leftPanel.innerHTML = '';
        leftPanel.style.minHeight = "500px";
      }

      // Printout message 
      const thankYouMessage = document.createElement("div");
      thankYouMessage.className = "thank-you-message";
      thankYouMessage.textContent = "Your order has been placed successfully. We hope you enjoy your meal!";
      if (leftPanel) {
        leftPanel.appendChild(thankYouMessage);
      }

    });
    checkButtons(currentStep);
  } else {
    const newBackBtn = document.getElementById('newBackBtn');
    if (newBackBtn) newBackBtn.style.display = 'none';

    const placeOrderBtn = document.getElementById('placeOrderBtn');
    if (placeOrderBtn) placeOrderBtn.style.display = 'none';
  }

} //end function swutchStep

// validation
document.getElementById('customTip').addEventListener('input', function (event) {
  const inputValue = event.target.value;


  if (isNaN(inputValue) || inputValue === "") {
    alert('Invalid input, please enter a number');
    event.target.value = "";
    customTipAmount = 0;
  } else {
    customTipAmount = parseFloat(inputValue);
  }

  updateCart();
});

//formatting tableNumber
document.getElementById('tableNumber').addEventListener('input', function (event) {
  const inputValue = event.target.value;

  if (inputValue === "T") {
    return;
  }

  if (!/^T\d+$/.test(inputValue)) {
    alert('Invalid table number, please enter in the format T123');
    event.target.value = 'T';
  }

});

document.getElementById('pickupName').addEventListener('input', function (event) {
  const inputValue = event.target.value;

  if (!inputValue.trim()) {
    alert('Name cannot be empty');
    event.target.value = '';
  }

});

document.getElementById('pickupPhone').addEventListener('blur', function (event) {
  const inputValue = event.target.value;

  if (inputValue && !/^\d{10}$/.test(inputValue)) {
    alert('Invalid phone number, please enter a 10-digit number');
    event.target.value = '';
  }
});

