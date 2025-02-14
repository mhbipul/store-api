const express = require("express");
const { getAllProdcut, getAllProdcutsStatic } = require("../controllers/productsControllers");
const router = express.Router();



router.route("/").get(getAllProdcut)
router.route("/static").get(getAllProdcutsStatic)



module.exports = router