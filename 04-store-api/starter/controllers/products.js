const Product = require("../models/product");
const { search } = require("../routes/products");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({})
    .sort("name")
    .select("name price")
    // .limit(4)
    // .skip(1);
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  // pulling out only the properties you want to find
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" }; // options: i means case insensitive
  }
  // sort
  // console.log(queryObject);
  let result = Product.find(queryObject); // we remove await from this statement as we need to chain sort with find
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  // selecting fields
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  // implementing pagination. For this, we are not destructuring from the query object like before as we are taking the same name as in the query
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
