const billInput = document.getElementById('bill-amount');
const tipContainer = document.getElementById('tip-selector');
const tipButtons = tipContainer.querySelectorAll('.tip-selector__btn');
const customTipInput = tipContainer.querySelector('.tip-selector__custom');
const numberOfPeopleInput = document.getElementById('people-amount');
const tipPerPerson = document.getElementById('tip-per-person');
const totalPerPerson = document.getElementById('total-per-person');
const resetButton = document.getElementById('reset-btn');
const errorMessage = document.querySelector('.calculator__error');

let currentBillAmount = 0;
let currentTipPercent = 0;
let numberOfPeople = 0;

// Event Listeners
billInput.addEventListener('input', handleBillInput);
numberOfPeopleInput.addEventListener('input', handlePeopleInput);
customTipInput.addEventListener('input', handleCustomTip);
resetButton.addEventListener('click', resetCalculator);

tipButtons.forEach((tipButton) => {
  tipButton.addEventListener('click', () => {
    currentTipPercent =
      parseFloat(tipButton.textContent.replace('%', '')) / 100;
    updateActiveButton(tipButton);
    calculateTotals();
  });
});

function handleBillInput(e) {
  currentBillAmount = parseFloat(e.target.value) || 0;
  calculateTotals();
  toggleResetButton();
}

function handlePeopleInput(e) {
  const value = parseInt(e.target.value);

  if (value === 0) {
    e.target.classList.add('error');
    errorMessage.classList.add('visible');
  } else {
    e.target.classList.remove('error');
    errorMessage.classList.remove('visible');
    numberOfPeople = value;
    calculateTotals();
  }

  toggleResetButton();
}

function handleCustomTip(e) {
  const value = parseFloat(e.target.value) || 0;
  currentTipPercent = value / 100;

  clearActiveButtons();
  calculateTotals();
  toggleResetButton();
}

function updateResults(tipAmount = 0, totalAmount = 0) {
  tipPerPerson.textContent = `$${tipAmount.toFixed(2)}`;
  totalPerPerson.textContent = `$${totalAmount.toFixed(2)}`;
}

function calculateTotals() {
  if (currentBillAmount > 0 && numberOfPeople > 0) {
    const tipAmount = currentBillAmount * currentTipPercent;
    const totalAmount = currentBillAmount + tipAmount;

    const tipPerPersonAmount = tipAmount / numberOfPeople;
    const totalPerPersonAmount = totalAmount / numberOfPeople;

    updateResults(tipPerPersonAmount, totalPerPersonAmount);
  }
}

function clearActiveButtons() {
  tipButtons.forEach((button) => button.classList.remove('active'));
}

function updateActiveButton(selectedButton) {
  clearActiveButtons();
  selectedButton.classList.add('active');
  customTipInput.value = '';
}

function resetCalculator() {
  currentBillAmount = 0;
  currentTipPercent = 0;
  numberOfPeople = 0;

  billInput.value = '';
  customTipInput.value = '';
  numberOfPeopleInput.value = '';
  updateResults();

  clearActiveButtons();
  numberOfPeopleInput.classList.remove('error');
  errorMessage.classList.remove('visible');

  resetButton.disabled = true;
}

function toggleResetButton() {
  resetButton.disabled = !(
    billInput.value ||
    customTipInput.value ||
    numberOfPeopleInput.value
  );
}
