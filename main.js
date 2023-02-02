const myIncome = document.querySelector(".income-input");
const money = document.querySelector(".money");
const incomeBtn = document.querySelector("#button-addon2");
const firstForm = document.querySelector(".first-form");
const article = document.querySelector("article.container");

// *************
const finalIncome = document.querySelector(".final-income");
const finalExpense = document.querySelector(".final-expense");
const finalMoney = document.querySelector(".final-money");

// *************
const expensePlace = document.querySelector("#inputPlace");
const expenseDate = document.querySelector("#inputDate");
const expenseAmount = document.querySelector("#inputExpense");
const saveBtn = document.querySelector(".save-btn");

// **** Table
const table = document.querySelector(".result-table");
const tableBody = table.querySelector("tbody");

let spends = JSON.parse(localStorage.getItem("spends")) || [];

window.addEventListener("load", () => {
  spends.forEach((item) => {
    tableBody.innerHTML += `
        <tr id='${item.id}'>
        <td scope="col" class="col-4">${item.myDate}</td>
        <td scope="col" class="col-4">${item.myPlace}</td>
        <td scope="col" class="col-3 removal-money">${item.myAmount}</td>
        <td scope="col" class="col-1"><i class="fa-solid fa-trash"></i></td>
        </tr>`;

    finalExpense.innerHTML =
      Number(finalExpense.innerHTML) + Number(item.myAmount);
  });
  finalIncome.innerHTML = spends[spends.length - 1].income;
  finalMoney.innerHTML = finalIncome.innerHTML - finalExpense.innerHTML;
});

myIncome.addEventListener("keyup", (e) => {
  e.preventDefault();
  money.innerHTML = Number(myIncome.value).toFixed(2);
});

incomeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  finalIncome.innerText = myIncome.value;
});

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    expenseAmount.value &&
    expenseDate.value &&
    expensePlace.value &&
    myIncome.value
  ) {
    createTable();
    e.target.closest("form").reset();
  } else {
    alert("please fill the blank areas");
  }
});

//* REMOVE - DELETE

table.addEventListener("click", (e) => {
  const idAttr = e.target.closest("tr").getAttribute("id");
  console.log(idAttr);
  if (e.target.classList.contains("fa-trash")) {
    let tableAmount = e.target
      .closest("tr")
      .querySelector(".removal-money").innerHTML;
    finalExpense.innerHTML = finalExpense.innerHTML - tableAmount;

    e.target.closest("tr").remove();
    finalMoney.innerHTML = finalIncome.innerHTML - finalExpense.innerHTML;
    spends = spends.filter((x) => x.id != idAttr);
    localStorage.setItem("spends", JSON.stringify(spends));
  }
});

const createTable = () => {
  // create element
  const tableTr = document.createElement("tr");
  const date = document.createElement("td");
  const place = document.createElement("td");
  const amount = document.createElement("td");
  amount.setAttribute("class", "removal-money");
  const iconPlace = document.createElement("td");
  const icon = document.createElement("i");

  //   create textNode
  const dateText = document.createTextNode(
    expenseDate.value.split("-").reverse().join("-")
  );
  const placeText = document.createTextNode(expensePlace.value);
  const amountText = document.createTextNode(expenseAmount.value);

  //   append textNode
  date.append(dateText);
  place.append(placeText);
  amount.append(amountText);

  // append child
  icon.setAttribute("class", "fa-solid fa-trash");
  iconPlace.appendChild(icon);
  tableTr.appendChild(date);
  tableTr.appendChild(place);
  tableTr.appendChild(amount);
  tableTr.appendChild(iconPlace);
  tableBody.appendChild(tableTr);
  table.appendChild(tableBody);

  const info = {
    myDate: date.innerHTML,
    myPlace: place.innerHTML,
    myAmount: amount.innerHTML,
    id: new Date().getTime(),
    income: myIncome.value,
  };
  tableTr.setAttribute("id", info.id);
  spends.push(info);
  localStorage.setItem("spends", JSON.stringify(spends));

  finalIncome.innerHTML = myIncome.value;
  finalExpense.innerHTML =
    Number(amount.innerHTML) + Number(finalExpense.innerHTML);
  finalMoney.innerHTML = finalIncome.innerHTML - finalExpense.innerHTML;
};
