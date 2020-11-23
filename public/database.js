var indexeddatabase =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

var database ;
var request = indexedDB.open("budget", 1);

request.onupgradeneeded = ({ target }) => {
    let database = target.result;
    database.createObjectStore("pending", { autoIncrement: true });
};

request.onsuccess = ({ target }) => {
database = target.result;

if (navigator.onLine) {
    checkDatabase();
}
};

function save(record) {
var transaction = database.transaction(["pending"], "readwrite");
var store = transaction.objectStore("pending");

store.add(record);
}

function checkDatabase() {
var transaction = database.transaction(["pending"], "readwrite");
var store = transaction.objectStore("pending");
var getAll = store.getAll();

getAll.onsuccess = function() {
    if (getAll.result.length > 0) {
    fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
        }
    })
    .then(response => {        
        return response.json();
    })
    .then(() => {
        var transaction = database.transaction(["pending"], "readwrite");
        var store = transaction.objectStore("pending");
        store.clear();
    });
    }
};
}

window.addEventListener("online", checkDatabase);