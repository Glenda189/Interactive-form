
// // 2. Focus on the "Name" section
document.getElementById('name').focus();

// // 3. Job role sections: 
// // Hide job role 
const otherJobRoleField = document.getElementById('other-job-role');
otherJobRoleField.style.display = 'none';

// //listens to changes 
const jobRoleSelect = document.getElementById('title');
jobRoleSelect.addEventListener('change', (e) =>{
    if (e.target.value === 'other') {
        otherJobRoleField.style.display = 'block';
    } else {
        otherJobRoleField.style.display='none';
    }

});
// 4. T-shirt info Selection 
// Disable color selection element: 
const colorSelect = document.getElementById('color');
colorSelect.disabled = true;
// Set up the "design" element to listen for changes 
const designSelect = document.getElementById('design');
// Gets all the options elements in the color dropdown
const colorOptions = colorSelect.children; 
// 
designSelect.addEventListener('change', (e) => {
    colorSelect.disabled= false;
    const selectedDesign = e.target.value;
//Loop through color options and display only match the selected design 
    for (let i =0; i < colorOptions.length; i++){
        const option = colorOptions[i];
        if (selectedDesign === 'js puns' && option.dataset.theme === 'js puns'){
            option.hidden = false;
            option.selected = true;
        } else if (selectedDesign === 'heart js' && option.dataset.theme === 'heart js'){
            option.hidden = false;
            option.selected = true; 
        } else {
            option.hidden = true;
        }
    }
});
// // 5. activities selection - update payment 
const activities = document.querySelector('#activities');
const activitiesCost = document.querySelector('#activities-cost');
let totalCost = 0;
activities.addEventListener('change', (e) => {
    const cost = parseInt(e.target.getAttribute('data-cost'));
    if (e.target.checked){
        totalCost += cost;
    } else {
        totalCost -= cost;
    }
    activitiesCost.textContent = `Total: $${totalCost}`;
});
// Add focus and blur event listeners to activities checkboxes
const activityCheckBoxes = document.querySelectorAll('#activities input');
activityCheckBoxes.forEach(checkbox => {
  checkbox.addEventListener('focus', () => checkbox.parentElement.classList.add('focus'));
  checkbox.addEventListener('blur', () => checkbox.parentElement.classList.remove('focus'));
});



// 6. Payment Info
const paymentSelect = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
// set cc as default 
paymentSelect.value = 'credit-card';
creditCard.style.display = 'block';
paypal.style.display =  'none';
bitcoin.style.display = 'none';
//Event listener for changes in payment method 
paymentSelect.addEventListener('change', (e) => {
    const selectedPayment = e.target.value;
// hide selections 
creditCard.style.display = 'none';
paypal.style.display = 'none';
bitcoin.style.display = 'none';
//display selected payment 
if (selectedPayment === 'credit-card'){
    creditCard.style.display = 'block';
} else if (selectedPayment === 'paypal'){
    paypal.style.display = 'block';
} else if (selectedPayment === 'bitcoin') {
    bitcoin.style.display = 'block';
}
});

// 7. Form Validation 
const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const cardNumberInput = document.getElementById('cc-num');
const zipCodeInput = document.getElementById('zip');
const cvvInput = document.getElementById('cvv');

// Helper functions to validate individual fields
function isNameValid() {
  return nameInput.value.trim() !== '';
}

function isEmailValid() {
  const emailPattern = /^[^@]+@[^@]+\.[a-z]{2,6}$/i;
  return emailPattern.test(emailInput.value);
}

function isActivitySelected() {
  return totalCost > 0;
}

function isCreditCardValid() {
  const cardNumber = /^\d{13,16}$/;
  const zipCode = /^\d{5}$/;
  const cvv = /^\d{3}$/;
  return cardNumber.test(cardNumberInput.value) &&
    zipCode.test(zipCodeInput.value) &&
    cvv.test(cvvInput.value);
}

// Helper functions for visual feedback
// function showValidationResult(element, isValid) {
//   const parent = element.parentElement;
//   if (isValid) {
//     parent.classList.add('valid');
//     parent.classList.remove('not-valid');
//     parent.querySelector('.hint').style.display = 'none';
//   } else {
//     parent.classList.add('not-valid');
//     parent.classList.remove('valid');
//     parent.querySelector('.hint').style.display = 'block';
//   }
// }

  function showValidationResult(element, isValid) {
  // Determine the parent element to which classes should be applied
  const parent = element.tagName === 'FIELDSET' ? element : element.parentElement;

  if (isValid) {
    // If valid, add 'valid' class and remove 'not-valid' class
    parent.classList.add('valid');
    parent.classList.remove('not-valid');
    parent.querySelector('.hint').style.display = 'none'; // Hide hint for valid input
  } else {
    // If not valid, add 'not-valid' class and remove 'valid' class
    parent.classList.add('not-valid');
    parent.classList.remove('valid');
    parent.querySelector('.hint').style.display = 'block'; // Show hint for invalid input
  }
}

// Add event listener to form submission
form.addEventListener('submit', (e) => {
  // Prevent form submission if any field is invalid
  if (!isNameValid() || !isEmailValid() || !isActivitySelected() ||
    (paymentSelect.value === 'credit-card' && !isCreditCardValid())) {
    e.preventDefault();

    // Feedback for each field
    const activitiesFieldset = document.getElementById('activities');
    showValidationResult(activitiesFieldset, isActivitySelected());
    showValidationResult(nameInput, isNameValid());
    showValidationResult(emailInput, isEmailValid());
    if (paymentSelect.value === 'credit-card') {
      showValidationResult(cardNumberInput, /^\d{13,16}$/.test(cardNumberInput.value));
      showValidationResult(zipCodeInput, /^\d{5}$/.test(zipCodeInput.value));
      showValidationResult(cvvInput, /^\d{3}$/.test(cvvInput.value));
    }
  }
});

