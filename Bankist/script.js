const labelWelcome = document.querySelector(".title");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerTransactions = document.querySelector(".transactions");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

//Data
const account1 = {
  owner: "Ahmad Rashid",
  transactions: [100, 200, -900, -3000, 1650, -1403, 4070, 107],
  interestRate: 12,
  pin: 1234,
  transactionsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
};

const account2 = {
  owner: "Unknown 0perator",
  transactions: [550, 370, -190, -690, -4321, -7000, 10500, -3900],
  interestRate: 7.5,
  pin: 1224,
  transactionsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
};

const account3 = {
  owner: "Ahmad",
  transactions: [490, -700, -3200, 4109, -2035, 9850, 4000, -4860],
  interestRate: 1.8,
  pin: 1199,
  transactionsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
};

const account4 = {
  owner: "Rashid",
  transactions: [620, -1600, 980, 1205, 930],
  interestRate: 1.7,
  pin: 7890,
  transactionsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
  ],
};

const accounts = [account1, account2, account3, account4];

const displayTransaction = function (account, sort = false) {
  const transaction = sort
    ? account.transactions.slice().sort((a, b) => a - b)
    : account.transactions;
  containerTransactions.innerHTML = "";
  transaction.forEach(function (transaction, index) {
    const type = transaction > 0 ? "deposit" : "withdrawal";
    const date = new Date(account.transactionsDates[index]);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const day = `${date.getDate()}`.padStart(2, 0);
    const displayDates = `${day}-${month}-${year}`;
    const html = `
    <div class="transactions__row">
                <div class="transactions__type transactions__type--${type}">${
      index + 1
    } ${type}</div>
    <div class="transactions__date">${displayDates}</div>
                <div class="transactions__value">${transaction.toFixed(
                  2
                )}$</div>
            </div>
    `;
    containerTransactions.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (account) {
  const balance = account.transactions.reduce(
    (acc, transaction) => acc + transaction,
    0
  );
  labelBalance.textContent = `${balance.toFixed(2)}$`;
};

const calcDisplaySummary = function (account) {
  const incomes = account.transactions
    .filter(function (transaction) {
      return transaction > 0;
    })
    .reduce(function (total, transaction) {
      return total + transaction;
    }, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}$`;
  const outcomes = account.transactions
    .filter(function (transaction) {
      return transaction < 0;
    })
    .reduce(function (total, transaction) {
      return total + transaction;
    }, 0);
  labelSumOut.textContent = `${Math.abs(outcomes).toFixed(2)}$`;
  const interest = account.transactions
    .filter(function (transaction) {
      return transaction > 0;
    })
    .map(function (transaction) {
      return (transaction * account.interestRate) / 100;
    })
    .filter(function (transaction) {
      return transaction >= 1;
    })
    .reduce(function (total, transaction) {
      return total + transaction;
    });
  labelSumInterest.textContent = `${interest.toFixed(2)}$`;
};
const UIupdate = function (account) {
  displayTransaction(account);
  calcDisplayBalance(account);
  calcDisplaySummary(account);
};
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === +inputLoginPin.value) {
    labelWelcome.textContent = `Welcome, ${currentAccount.owner.split(" ")[0]}`;
    containerApp.style.opacity = 1;
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    UIupdate(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAccount = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";
  if (
    amount > 0 &&
    receiverAccount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    currentAccount.transactions.push(-amount);
    receiverAccount.transactions.push(amount);
    currentAccount.transactionsDates.push(new Date().toISOString());
    receiverAccount.transactionsDates.push(new Date().toISOString());
    UIupdate(currentAccount);
  }
});
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayTransaction(currentAccount, !sorted);
  sorted = !sorted;
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );

    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Log in to get started`;
    inputClosePin = inputCloseUsername = "";
  } else {
    alert("Invalid Username or Password");
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputLoanAmount.value;
  if (
    amount > 0 &&
    currentAccount.transactions.some(
      (transaction) => transaction >= amount * 0.1
    )
  ) {
    currentAccount.transactions.push(amount);
    currentAccount.transactionsDates.push(new Date().toISOString());

    UIupdate(currentAccount);
  } else {
    alert("Invalid amount");
  }
  inputLoanAmount.value = "";
});

const now = new Date();
const year = now.getFullYear();
const month = `${now.getMonth() + 1}`.padStart(2, 0);
const day = `${now.getDate()}`.padStart(2, 0);
const hour = `${now.getHours()}`.padStart(2, 0);
const minute = `${now.getMinutes()}`.padStart(2.0);
labelDate.textContent = `${day}-${month}-${year}, ${hour}:${minute}`;
