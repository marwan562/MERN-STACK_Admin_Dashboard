import Product from "../models/product.js";
import ProductStats from "../models/productStats.js";
import Transaction from "../models/transaction.js";
import User from "../models/user.js";
import { getCountryISO3 } from "../utils/getCountryISO3.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const stats = await Promise.all(
      products.map((product) =>
        ProductStats.findOne({ productId: product._id })
      )
    );

    const productsWithStats = products.map((product, index) => {
      return { product, stat: stats[index] };
    });

    res.status(200).json(productsWithStats);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" });

    res.status(200).send(customers);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    // Destructure query parameters with default values
    let { page = 1, pageSize = 10, sort = null, search = "" } = req.query;

    // Convert `page` and `pageSize` to integers and ensure they are valid
    page = parseInt(page, 10) || 1;
    pageSize = parseInt(pageSize, 10) || 10;
    page = Math.max(page, 1); // Ensure page is at least 1
    pageSize = Math.max(pageSize, 1); // Ensure pageSize is at least 1

    console.log(req.query);

    let querys = {};
    let checkSort;

    // Parse and handle sorting
    const sortParse = sort ? JSON.parse(sort) : {};
    if (sortParse.length > 0) {
      checkSort = Object.keys(sortParse).length
        ? { [sortParse[0].field]: sortParse[0].sort === "asc" ? 1 : -1 }
        : {};
      console.log(sortParse[0]?.field);
    }

    if (search) {
      querys["userId"] = {
        $eq: search,
      };
    }

    const transactions = await Transaction.find(querys)
      .sort(checkSort)
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .lean();

    // Get total number of documents matching the query
    const totalItems = await Transaction.countDocuments(querys);
    const totalPages = Math.ceil(totalItems / pageSize); // Use pageSize instead of limit

    res.status(200).json({
      transactions,
      pagination: { page, pageSize, totalItems, totalPages },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
};

export const getUsersCountries = async (req, res) => {
  try {
    const user = await User.find();

    let mappedLocations = {};

    user.forEach((el) => {
      const countryCodes = getCountryISO3(el.country);

      if (!mappedLocations[countryCodes]) {
        mappedLocations[countryCodes] = 0;
      }
      mappedLocations[countryCodes]++;
    });

    //* {USA:2,EGY:50} => mappedLocations
    //* [[USA,2],[EGY,50]] => after inter mappedLocations in Object.entries(mappedLocations)

    const formatedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).send(formatedLocations);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
};
