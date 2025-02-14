const Product = require("../models/productModel");

const getAllProdcutsStatic = async (req, res) => {
  const search = "aaa";
  const products = await Product.find({}).select("name price");

  res.status(200).json({ nbHits: products.length, products });
};

const getAllProdcut = async (req, res) => {
  const { feature, company, name, sort, fields , numericFilters} = req.query;
  const queryObject = {};
  if (feature) {
    queryObject.feature = feature === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  //filter with numeric..
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }



  let result = Product.find(queryObject);

  //sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  //fields

//   console.log("Before select:", result);
if (fields && typeof fields === 'string' && fields.trim()) {
    const fieldsList = fields.split(',').join(' '); // Convert "name,price" → "name price"
    console.log("Fields List for select:", fieldsList);
    result = result.select(fieldsList);
}

//pagination & limitation
const page = Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 10;

const skip = (page-1)*limit;

result = result.skip(skip).limit(limit)
//

//   console.log("After select:", result);

  const products = await result;

  console.log(queryObject);

  res.status(200).json({nbHits: products.length, products  });
};

module.exports = { getAllProdcut, getAllProdcutsStatic };
