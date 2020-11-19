const router = require("express").Router();
const Transaction = require("../models/transaction.js");

router.post("/api/transaction", ({body}, res) => {
Transaction.create(body)
    .then(dbTransaction => {
    res.json(dbTransaction);
    console.log("post transaction", res.json(dbTransaction));
    })
    .catch(err => {
    res.status(404).json(err);
    console.log("post transaction error" ,err);
    });
});

router.post("/api/transaction/bulk", ({body}, res) => {
Transaction.insertMany(body)
    .then(dbTransaction => {
    res.json(dbTransaction);
    console.log("post transaction bulk", res.json(dbTransaction));
    
    })
    .catch(err => {
    res.status(404).json(err);
    console.log("post transaction bulk error" ,err);
    });
});

router.get("/api/transaction", (req, res) => {
Transaction.find({}).sort({date: -1})
    .then(dbTransaction => {
    res.json(dbTransaction);
    console.log("get transaction" ,res.json(dbTransaction));
    })
    .catch(err => {
    res.status(404).json(err);
    console.log("get transaction error" ,err)
    });
});

module.exports = router;