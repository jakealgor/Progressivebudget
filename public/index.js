let transactions = [];
let myChart;

fetch("/api/transaction")
.then(response => {
    console.log("fetch response", response.json());
})
.then(data => {
    console.log("fetch data", data)
    transactions = data;
    populateTotal();
    populateTable();
    populateChart();
});

function populateTable() {
    let tbody = document.querySelector("#tbody");
    tbody.innerHTML = "";
    transactions.forEach(transaction => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${transaction.name}</td>
        <td>${transaction.value}</td>
        `;
        tbody.appendChild(tr);
    });
    }

function populateTotal() {
let total = transactions.reduce((total, t) => {
    return total + parseInt(t.value);
}, 0);
let totalEl = document.querySelector("#total");
totalEl.textContent = total;
}

function populateChart() {

let reversed = transactions.slice().reverse();
let sum = 0;

let labels = reversed.map(t => {
    let date = new Date(t.date);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
});

let data = reversed.map(t => {
    sum += parseInt(t.value);
    return sum;
});


if (myChart) {
    myChart.destroy();
}

let ctx = document.getElementById("myChart").getContext("2d");

myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels,
        datasets: [{
            label: "Total Over Time",
            fill: true,
            backgroundColor: "#FFFFFF",
            data
        }]
    }
});
}

function sendTransaction(isAdding) {
let nameEl = document.querySelector("#t-name");
let amountEl = document.querySelector("#t-amount");
let errorEl = document.querySelector(".form .error");

if (nameEl.value === "" || amountEl.value === "") {
    errorEl.textContent = "Missing Information";
    return;
}
else {
    errorEl.textContent = "";
}

let transaction = {
    name: nameEl.value,
    value: amountEl.value,
    date: new Date().toISOString()
};

if (!isAdding) {
    transaction.value *= -1;
}

transactions.unshift(transaction);

populateChart();
populateTable();
populateTotal();

fetch("/api/transaction", {
    method: "POST",
    body: JSON.stringify(transaction),
    headers: {
      Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json"
    }
})
.then(response => {    
    console.log("post respnse",response.json());
})
.then(data => {
    if (data.errors) {
    errorEl.textContent = "Missing Information";
    }
    else {
    
    nameEl.value = "";
    amountEl.value = "";
    }
})
.catch(err => {

    saveRecord(transaction);
    nameEl.value = "";
    amountEl.value = "";
});
}

document.querySelector("#add-btn").onclick = function() {
sendTransaction(true);
};

document.querySelector("#sub-btn").onclick = function() {
sendTransaction(false);
};