const balanceEl = document.getElementById("balance");
const list = document.getElementById("list");
const textInput = document.getElementById("text");
const amountInput = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction() {
  const text = textInput.value.trim();
  const amount = +amountInput.value;

  if (!text || !amount) return;

  transactions.push({
    id: Date.now(),
    text,
    amount
  });

  textInput.value = "";
  amountInput.value = "";

  updateLocalStorage();
  render();
}

function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateLocalStorage();
  render();
}

function updateBalance() {
  const total = transactions.reduce(
    (acc, item) => acc + item.amount, 0
  );
  balanceEl.innerText = total.toFixed(2);
}

function render() {
  list.innerHTML = "";

  transactions.forEach(t => {
    const li = document.createElement("li");
    li.classList.add(t.amount > 0 ? "plus" : "minus");

    li.innerHTML = `
      ${t.text} <span>${t.amount}</span>
      <button onclick="removeTransaction(${t.id})">x</button>
    `;

    list.appendChild(li);
  });

  updateBalance();
}

render();
