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
  let totalMonthlyPayment = ((amount) * (rate / 1200)) / (1-(1 + rate / 1200) ** -term);
  // let totalMonthlyPayment;
  let interestPayment;
  let principalPayment;
  let totalInterest = 0;
  
  let loanArray = [];
  
  for(i = 1; currentBalance > 0 ; i++ ){
    let currentMonth = i
    interestPayment = currentBalance * (rate / 1200);
    if (totalMonthlyPayment > currentBalance) {
      totalMonthlyPayment = currentBalance + interestPayment;
    }
    
    principalPayment = totalMonthlyPayment - interestPayment;
    totalInterest += interestPayment;
    currentBalance -= principalPayment;
    let totalCost = amount + totalInterest;


    loanStats = {
    // interestAmt: amount * rate,
    month: currentMonth,
    payment: totalMonthlyPayment,
    principal: principalPayment,
    interest: interestPayment,
    interestTotal: totalInterest,
    balance: currentBalance,
    totalPrincipal: amount,
    total: totalCost

    }

    loanArray.push(loanStats)
    
  }

  // let loan = {
  //   month: term,
  //   payment: totalMonthlyPayment,
  //   principal: principalPayment,
  //   interest: interestPayment,
  //   interestTotal: totalInterest,
  //   balance: currentBalance
  // }

  displayLoanTable(loanArray);
  
}

// view function
function displayLoanTable(loanArray) {
  let loanTable = document.getElementById('calcTable');
  const tableRowTemplate = document.getElementById('tableRowTemplate');
  console.log(loanArray);
  let currentMonth;

  loanTable.innerHTML = '';
  // create table row from template
  for(i = 0; i < loanArray.length; i++) {
    let loanRow = document.importNode(tableRowTemplate.content, true);
    currentMonth = loanArray[i];

    let tableCells = loanRow.querySelectorAll('td');
    console.log(loanRow);

    tableCells[0].innerHTML = currentMonth.month;
    tableCells[1].innerHTML = currentMonth.payment;
    tableCells[2].innerHTML = currentMonth.principal;
    tableCells[3].innerHTML = currentMonth.interest;
    tableCells[4].innerHTML = currentMonth.interestTotal;
    tableCells[5].innerHTML = currentMonth.balance;

    loanTable.appendChild(loanRow);

  }

  document.getElementById('monthlyPayment').innerHTML = currentMonth.payment;
  document.getElementById('totalPrincipalAmount'). innerHTML = currentMonth.totalPrincipal;
  document.getElementById('totalInterestAmount'). innerHTML = currentMonth.interestTotal;
  document.getElementById('totalCost'). innerHTML = currentMonth.total;
  // display table with calculation results
  
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
