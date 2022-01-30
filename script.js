const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let dataArray = [];

getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money
async function getRandomUser() {
  const response = await fetch("https://randomuser.me/api");
  const data = await response.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  dataArray.push(newUser);
  updateDOM();
}

// update DOM
function updateDOM(providedData = dataArray) {
  // Clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
  providedData.forEach((data) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${data.name}</strong>${formatCurrency(
      data.money
    )}`;
    main.appendChild(element);
  });
}

// format number as money
//  https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatCurrency(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//double Money
function doubleMoney() {
  dataArray = dataArray.map((data) => {
    return { ...data, money: data.money * 2 };
  });
  updateDOM();
}

//sort ByRichest
function sortByRichest() {
  dataArray.sort((a, b) => b.money - a.money);
  updateDOM();
}

//filter Millionaires
function filterMillionaires() {
  dataArray = dataArray.filter((item) => item.money > 1000000);
  updateDOM();
}

//Calclate total Wealth
function findTotalWealth() {
  totalWealth = dataArray.reduce((acc, user) => {
    return acc + user.money;
  }, 0);

  const wealthElement = document.createElement("div");
  wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatCurrency(
    totalWealth
  )}</strong></h3>`;
  main.appendChild(wealthElement);
}

//Event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", filterMillionaires);
calculateWealthBtn.addEventListener("click", findTotalWealth);
