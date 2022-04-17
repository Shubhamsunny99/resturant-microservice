const express = require("express");
const restuarantController = require("../controllers/restuarant.controller");


const restuarantsRoutes = express.Router()

// /customer is prefix from app/index.js 
restuarantsRoutes.post('/add-restuarant', restuarantController.addRestuarants)

restuarantsRoutes.get('/get-all-restuarant', restuarantController.getAllRestuarants)

restuarantsRoutes.get('/get-individual-restuarant/:id', restuarantController.getIndiviualResturants)

restuarantsRoutes.put('/update-restuarant/:id', restuarantController.updateRestuarants)

restuarantsRoutes.put('/delete-restuarant/:id', restuarantController.deleteRestuarants)


module.exports = restuarantsRoutes

// aZynwk4ecjXuUxBB
