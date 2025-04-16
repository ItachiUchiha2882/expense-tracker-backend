const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  getTransactions, addTransaction, updateTransaction, deleteTransaction
} = require("../controllers/transactionController");

const router = express.Router();
router.use(protect);

router.get("/", getTransactions);
router.post("/", addTransaction);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;
