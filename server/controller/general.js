import User from "../models/user.js";
import Transaction from "../models/transaction.js";
import Overview from "../models/overView.js";

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(404).send({ message: "Id User Required." });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }
    res.status(200).send(user);
  } catch (err) {
    console.log("error", err);
    res.status(500).send(err);
  }
};

export const getAdminDashboardStats = async (req, res) => {
  try {
    // hardcoded values
    const currentMonth = "November";
    const currentYear = 2024;
    const currentDay = "2021-11-15";

    /* Recent Transactions */
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdAt: 1 });

    /* Overall Stats */
    const overallStat = await Overview.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      dailyData
    } = overallStat[0];

    const thisMonthStats = monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export { getUserById };
