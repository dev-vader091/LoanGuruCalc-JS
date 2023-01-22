// controller function
function getValues() {
  // get inputs from user
  let loanAmountInput = document.querySelector('#loanAmountInput').value;
  let loanTermInput = document.querySelector('#loanTermInput').value;
  let loanRateInput = document.querySelector('#loanRateInput').value;
  // validate user inputs
  validateInputs(loanAmountInput, loanTermInput, loanRateInput);
  

}

// logic function
function calculateLoan(amount, term, rate) {
  let currentBalance = amount;
  // rate = rate / 1200;
  let totalMonthlyPayment;
  let interestPayment;
  let principalPayment;
  let totalInterest = 0;
  
  
  for(i = 1; i <= term; i++ ){
    totalMonthlyPayment = ((amount) * (rate / 1200)) / (1-(1 + rate / 1200) ** -term);
    interestPayment = currentBalance * (rate / 1200);
    principalPayment = totalMonthlyPayment - interestPayment;
    totalInterest += interestPayment;
    currentBalance -= principalPayment;

  }

  let loan = {
    month: term,
    payment: totalMonthlyPayment,
    principal: principalPayment,
    interestPayment: interestPayment,
    interestTotal: totalInterest,
    balance: currentBalance
  }

  displayLoanTable(loan);
  
}

// view function
function displayLoanTable(loan) {
  let loanTable = document.getElementById('calcTable');
  // create table row from template
  // display table with calculation results
  console.log(loan)
}

// validation function
function validateInputs(amount, term, rate) {
  if (isNaN(parseInt(amount)) || Math.sign(parseInt(amount)) == -1) {
    Swal.fire(
          {
          icon: 'error',
          title: 'Oops...',
          text: 'Please enter a valid loan amount.',
        }
      )
  }
  else if (isNaN(parseInt(term)) || Math.sign(parseInt(term)) == -1) {
    Swal.fire(
          {
          icon: 'error',
          title: 'Oops...',
          text: 'Please enter valid loan term.',
        }
        )
  }
  else if (isNaN(parseFloat(rate)) || Math.sign(parseFloat(rate)) == -1) {
    Swal.fire(
          {
          icon: 'error',
          title: 'Oops...',
          text: 'Please enter a valid loan interest rate.',
        }
        )
  }
  else {
    amount = parseInt(amount);
    term = parseInt(term);
    rate = parseFloat(rate);
    calculateLoan(amount, term, rate);
  }
 
  
}
