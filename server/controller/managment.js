import User from "../models/user.js";
import Transaction from "../models/transaction.js";
import mongoose from "mongoose";

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });

    res.status(200).send(admins);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

export const getAllAffiliatePerformance = async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from request parameters

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    // Aggregate performance data
    const performanceData = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "affiliatestats", 
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" }, 
      {
        $lookup: {
          from: "transactions", 
          localField: "affiliateStats.affiliateSales",
          foreignField: "_id",
          as: "transactions",
        },
      },
    ]);

    if (performanceData.length === 0) {
      return res.status(404).json({ message: "No performance data found for the user" });
    }

    res.status(200).json(performanceData[0]);
  } catch (err) {
    console.error("Error retrieving performance data:", err);
    res.status(500).json({ error: "Failed to retrieve performance data", details: err.message });
  }
};