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
};

const account2 = {
  owner: "Unknown 0perator",
  transactions: [550, 370, -190, -690, -4321, -7000, 10500, -3900],
  interestRate: 7.5,
  pin: 1224,
};

const account3 = {
  owner: "Ahmad",
  transactions: [490, -700, -3200, 4109, -2035, 9850, 4000, -4860],
  interestRate: 1.8,
  pin: 1199,
};

const account4 = {
  owner: "Rashid",
  transactions: [620, -1600, 980, 1205, 930],
  interestRate: 1.7,
  pin: 7890,
};

const accounts = [account1, account2, account3, account4];

const displayTransaction = function (transactions) {
  containerTransactions.innerHTML = "";
  transactions.forEach(function (transaction, index) {
    const type = transaction > 0 ? "deposit" : "withdrawal";
    const html = `
    <div class="transactions__row">
                <div class="transactions__type transactions__type--${type}">${
      index + 1
    } ${type}</div>
                <div class="transactions__value">${transaction}$</div>
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
  labelBalance.textContent = `${balance}$`;
};

const calcDisplaySummary = function (account) {
  const incomes = account.transactions
    .filter(function (transaction) {
      return transaction > 0;
    })
    .reduce(function (total, transaction) {
      return total + transaction;
    }, 0);
  labelSumIn.textContent = `${incomes}$`;
  const outcomes = account.transactions
    .filter(function (transaction) {
      return transaction < 0;
    })
    .reduce(function (total, transaction) {
      return total + transaction;
    }, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}$`;
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
  labelSumInterest.textContent = `${interest}$`;
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
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome, ${currentAccount.owner.split(" ")[0]}`;
    containerApp.style.opacity = 1;
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    UIupdate(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
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
    UIupdate(currentAccount);
  }
});
