const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");

// Get all transactions for logged-in user
const getTransactions = async (req, res) => {
  try {
    const tx = await Transaction.find({ userId: req.user });
    console.log("Transactions: ", tx);
    res.status(200).json(tx);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Add a transaction
const addTransaction = async (req, res) => {
  try {
    const newTx = await Transaction.create({ ...req.body, userId: req.user });
    console.log("New Transaction: ", newTx);
    res.status(201).json(newTx);
  } catch (err) {
    res.status(400).json({ message: "Failed to create transaction", error: err.message });
  }
};

// Update a transaction
const updateTransaction = async (req, res) => {
  const { id } = req.params;

  // Check for valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid transaction ID" });
  }

  try {
    const tx = await Transaction.findById(id);
    console.log("Transaction to update: ", tx);

    if (!tx) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Check if user owns this transaction
    if (tx.userId.toString() !== req.user) {
      return res.status(403).json({ message: "Unauthorized to update this transaction" });
    }

    const updated = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  // Check for valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid transaction ID" });
  }

  try {
    const tx = await Transaction.findById(id);
    console.log("Transaction to delete: ", tx);

    if (!tx) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Check if user owns this transaction
    if (tx.userId.toString() !== req.user) {
      return res.status(403).json({ message: "Unauthorized to delete this transaction" });
    }

    await Transaction.findByIdAndDelete(id);
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};