import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";
import transactionModel from "../models/transactionModel.js"; 

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing Details",
      });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
      user: { name: user.name },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= LOGIN =================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
      user: { name: user.name },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// USER CREDITS
export const userCredits = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      creditBalance: user.creditBalance,
      user: { name: user.name },
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
const razorpayInstance = new razorpay({
  key_id: process.env.RAZERPAY_KEY_ID,
  key_secret: process.env.RAZERPAY_KEY_SECRET,


})

const paymentRazorpay = async (req, res) => {
  try {

    const {userID, planId} = req.body;
    const userData = await userModel.findById(userID);

    if (!userData || !planId) {
      return res.json({
        success: false,
        message: "User not found or Plan ID missing",
      });
    }
    let credits, plan, amount, date

    switch (palnId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;
      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;
      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;


        default:
          return res.json({
            success: false,
            message: "Plan Not Found",
          });
    }

    date = new Date();

    const transtionData = {
      userId, plan, credits, amount, date
    }

    const newTransaction = await transactionModel.create(transtionData);

const option = {

  amount: amount * 100,
  currency: process.env.CURRENCY,
  receipt: newTransaction._id,
}

    await razorpayInstance.orders.create(option, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({success: false, message: error})
      }
      res.json({
        success: true,
        order,})


    })


  } catch (error) {
    console.log(error);
    res.json({
      success: false,      message: error.message,
    })
  }
}

const verifyRazorpay = async (req, res)=>{
  try {
    
const {razorpay_order_id} = req.body;

const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

if (orderInfo.status === "paid") {
  const transaction = await transactionModel.findByID(orderInfo.receipt)
  if (transactionData.payment) {
    return res.json({success: false, message: "payment Failed"})
  }
const userData = await userModel.findById(transaction.userId);

const creditBalance = userData.creditBalance + transaction.credits;
await userModel.findByIdAndUpdate(transaction.userId, {creditBalance});
await transactionModel.findByIdAndUpdate(transaction._id, {payment: true})
res.json({success: true, message: "Payment Successful" })
} else {
  res.json({success: false, message: "Payment Not Successful" })

}

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    })
    
  }

}

};

export {registerUser, loginUser, userCredits, paymentRazorpay,verifyRazorpay};