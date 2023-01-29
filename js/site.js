// controller function
function getValues() {
  // get inputs from user
  let loanAmountInput = document.querySelector('#loanAmountInput').value;
  let loanTermInput = document.querySelector('#loanTermInput').value;
  let loanRateInput = document.querySelector('#loanRateInput').value;
  // function validate user inputs ran immediately after receiving inputs
  validateInputs(loanAmountInput, loanTermInput, loanRateInput);
  // validated inputs are then parsed into numbers to be used 
  // as parameters for calculate function
  let amount = parseInt(loanAmountInput);
  let term = parseInt(loanTermInput);
  let rate = parseFloat(loanRateInput);
  // create a value to hold the array returned in the calculate function
  // will be used as the parameter in the display function
  let loan = calculateLoan(amount, term, rate);
  
  // after calculation function - the returned array is used as the parameter
  // in the diplay function
  displayLoanTable(loan);
}

// logic function
function calculateLoan(amount, term, rate) {
  // initialize variables to be used in calculation
  let currentBalance = amount;
  let totalMonthlyPayment = ((amount) * (rate / 1200)) / (1-(1 + rate / 1200) ** -term);
  let interestPayment;
  let principalPayment;
  let totalInterest = 0;
  // create an array to hold our monthly payment objects
  let loanArray = [];
  
  // for loop to calculate monthly payment info from variables created above
  // each month = i, start from the given balance(amount parameter) and decrease the amount/increase month each iteration
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

    
    // end of each iteration -- create an object to hold monthly payment info to be pushed into array
    let loanStats = {
    month: currentMonth,
    payment: totalMonthlyPayment,
    principal: principalPayment,
    interest: interestPayment,
    interestTotal: totalInterest,
    balance: currentBalance,
    totalPrincipal: amount,
    total: totalCost
    }
    // push the loan stats object into the array
    loanArray.push(loanStats)
  }

  // return the final array of objects(will match term) as value to be used 
  // as parameter in display function
  return loanArray;
  // displayLoanTable(loanArray);
}

// view function
function displayLoanTable(loanArray) {
  // get our table body element from the document 
  let loanTable = document.getElementById('calcTable');
  // get the table row template from the document
  const tableRowTemplate = document.getElementById('tableRowTemplate');
  // initialize a variable that represents each array value
  let currentMonth;
  // Format the price above to USD using the locale, style, and currency.
  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  // empty the table body html 
  loanTable.innerHTML = '';
  // create table row with data from template that holds values for each loan object from 
  // loanArray parameter
  for(i = 0; i < loanArray.length; i++) {
    let loanRow = document.importNode(tableRowTemplate.content, true);
    // make our currentMonth value equal the current i
    currentMonth = loanArray[i];
    
    // create variable for table data to be added to row -- comes from template
    // in html (loanRow above)
    let tableCells = loanRow.querySelectorAll('td');
    // console.log(loanRow);

    // add our loan object data to the table row in each 
    tableCells[0].innerHTML = currentMonth.month;
    tableCells[1].innerHTML = USDollar.format(currentMonth.payment);
    tableCells[2].innerHTML = USDollar.format(currentMonth.principal);
    tableCells[3].innerHTML = USDollar.format(currentMonth.interest);
    tableCells[4].innerHTML = USDollar.format( currentMonth.interestTotal);
    tableCells[5].innerHTML = USDollar.format(currentMonth.balance);

    // at the end of each iteration -- add the row to the table html
    loanTable.appendChild(loanRow);
  }

  // display table with calculation results by getting elements from 
  // document and adding classes/html content 
  document.getElementById('loanSummary').classList.add('active');
  document.getElementById('tableContainer').classList.add('active');
  document.getElementById('monthlyPayment').innerHTML = USDollar.format(currentMonth.payment);
  document.getElementById('totalPrincipalAmount'). innerHTML = USDollar.format(currentMonth.totalPrincipal);
  document.getElementById('totalInterestAmount'). innerHTML = USDollar.format(currentMonth.interestTotal);
  document.getElementById('totalCost'). innerHTML = USDollar.format(currentMonth.total);
}

// validation function
function validateInputs(amount, term, rate) {
  // check if our parsed inputs are negative or non-integers
  // if invalid, create an error alert asking for valid inputs
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
  // if valid, return the inputs provided
  else {
    return amount, term, rate;
    // amount = parseInt(amount);
    // term = parseInt(term);
    // rate = parseFloat(rate);
    // calculateLoan(amount, term, rate);
  } 
}
