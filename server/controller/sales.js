import OverView from "../models/overView.js";

export const getOverView = async (req, res) => {
  try {
    const overView = await OverView.find();

    res.status(200).json(overView[0]);
  } catch (err) {
    console.log("err", err);
    res.status(500).send({ message: err.message });
  }
};
