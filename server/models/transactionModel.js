import mongoose from "mongoose";
import { use } from "react";

const transactionSchema = new mongoose.Schema({

    userId: { type: String, required: true },
    plan: { type: String, required: true },
    amount: { type: Number, required: true },
    credits: { type: Number, required: true },
    paymwnt: { type: Boolean, required: false },
    date: {type: Number},

});

const transactionModel =
  mongoose.models.transaction ||
  mongoose.model("transaction", transactionSchema);

export default userModel;
