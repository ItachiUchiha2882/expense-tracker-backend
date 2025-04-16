const Transaction = require("../models/Transaction");

const getTransactions = async (req, res) => {
  const tx = await Transaction.find({ userId: req.user });
  res.json(tx);
};

const addTransaction = async (req, res) => {
  const newTx = await Transaction.create({ ...req.body, userId: req.user });
  res.json(newTx);
};

const updateTransaction = async (req, res) => {
  const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

const deleteTransaction = async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

module.exports = { getTransactions, addTransaction, updateTransaction, deleteTransaction };
