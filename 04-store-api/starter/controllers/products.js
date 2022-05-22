const Product = require("../models/product");
const { search } = require("../routes/products");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).sort('-name price');
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  // pulling out only the properties you want to find
  const { featured, company, name, sort } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
      queryObject.company = company;
  }

  if(name) {
      queryObject.name= {$regex: name, $options: 'i'}; // options: i means case insensitive
  }
  // console.log(queryObject);
  let result = Product.find(queryObject); // we remove await from this statement as we need to chain sort with find
  if(sort) {
      const sortList = sort.split(',').join(' ');
      result = result.sort(sortList);
  }
  else {
    result = result.sort('createdAt');
  }
  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
