
  
  
  
  
  // Function to export expenses as a JSON file
  function exportExpenses() {
    // Get selected expenses for export
    const checkboxes = document.querySelectorAll('.expense-list-item input[type="checkbox"]');
    const selectedExpenses = [];
    
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        const expenseId = checkbox.getAttribute('data-expense-id');
        const selectedExpense = expenses.find(expense => expense.id === expenseId);
        if (selectedExpense) {
          selectedExpenses.push(selectedExpense);
        }
      }
    });
  
    if (selectedExpenses.length > 0) {
      // Convert selected expenses array to JSON string
      const expensesJSON = JSON.stringify(selectedExpenses);
  
      // Create a Blob object with the JSON string
      const blob = new Blob([expensesJSON], { type: 'application/json' });
  
      // Generate a temporary URL for the Blob object
      const url = URL.createObjectURL(blob);
  
      // Create a link element for downloading the file
      const link = document.createElement('a');
      link.href = url;
      link.download = 'expenses.json';
      link.click();
  
      // Clean up the temporary URL
      URL.revokeObjectURL(url);
    } else {
      alert('Please select at least one expense to export.');
    }
  }
  
  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    $("#name").text(profile.getName());
    $("#email").text(profile.getEmail());
    $("#image").attr('src', profile.getImageUrl());
    $(".data").css("display", "block");
    $(".g-signin2").css("display", "none");
  
    // Redirect to homepage after successful sign-in
    window.location.href = "index.html";
  }
  
  
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      alert("You have been signed out successfully");
      $(".g-signin2").css("display", "block");
      $(".data").css("display", "none");
    });
  }
  
  
  
  
  function getTotalExpenseAmount() {
    let totalExpense = 0;
    const expenseItems = document.querySelectorAll(".expense-list li:not([style*='none'])");
  
    for (const expenseItem of expenseItems) {
      const expenseAmount = expenseItem.querySelector(".expense-amount").innerHTML;
      const expenseAmountNumber = Number(expenseAmount);
      totalExpense += expenseAmountNumber;
    }
  
    return totalExpense;
  }
  
  // Update the total expense amount in the DOM
  function updateTotalExpenseAmount() {
    const totalExpense = getTotalExpenseAmount();
    const totalAmountElement = document.querySelector("#total-amount");
    const currencySelectElement = document.querySelector("#currency-select");
    const currency = currencySelectElement.value;
    totalAmountElement.innerHTML = `${totalExpense} ${currency}`;
  }
  
  // Event listener for the submit button
  document.querySelector(".expense-form").addEventListener("submit", (event) => {
    event.preventDefault();
  
    // Get the expense amount
    const expenseAmount = document.querySelector("#expense-input").value;
    const expenseCategory = document.querySelector("#expense-category").value;
    const expenseDate = document.querySelector("#expense-date").value;
  
    // Create a new expense item
    const expenseItem = document.createElement("li");
    expenseItem.innerHTML = `
      <span class="expense-category">${expenseCategory}</span>
      <span class="expense-amount">${expenseAmount}</span>
      <span class="expense-date">${expenseDate}</span>
    `;
  
    // Add the expense item to the expense list
    const expenseList = document.querySelector(".expense-list");
    expenseList.appendChild(expenseItem);
  
    // Update the total expense amount
    updateTotalExpenseAmount();
  });
  
  // Event listener for the increase button
  document.querySelector("#increase-button").addEventListener("click", () => {
    let expenseAmount = document.querySelector("#expense-input").value;
    expenseAmount++;
    document.querySelector("#expense-input").value = expenseAmount;
  });
  
  // Event listener for the decrease button
  document.querySelector("#decrease-button").addEventListener("click", () => {
    let expenseAmount = document.querySelector("#expense-input").value;
    expenseAmount--;
    document.querySelector("#expense-input").value = expenseAmount;
  });
  
  // Function to filter expenses based on month and year
  function filterExpenses() {
    const filterMonth = document.querySelector("#filter-month").value.toLowerCase();
    const filterYear = document.querySelector("#filter-year").value.toLowerCase();
    const expenseItems = document.querySelectorAll(".expense-list li");
  
    for (const expenseItem of expenseItems) {
      const expenseDate = expenseItem.querySelector(".expense-date").innerHTML.toLowerCase();
      if (filterMonth !== "all" && filterYear !== "all") {
        if (expenseDate.includes(filterMonth) && expenseDate.includes(filterYear)) {
          expenseItem.style.display = "block";
        } else {
          expenseItem.style.display = "none";
        }
      } else {
        expenseItem.style.display = "block";
      }
    }
  
    updateTotalExpenseAmount();
  }
  
  // Event listener for the filter form
  document.querySelector(".filter-form").addEventListener("submit", (event) => {
    event.preventDefault();
    filterExpenses();
  });
  
  // Initialize the script
  updateTotalExpenseAmount();
  filterExpenses();
