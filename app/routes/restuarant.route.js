const express = require("express");
const restuarantController = require("../controllers/restuarant.controller");
const menuController = require("../controllers/menu.controller");
const Validation = require('../config/validator');


const restuarantsRoutes = express.Router()

// /customer is prefix from app/index.js 
restuarantsRoutes.post('/add-restuarant', Validation.addRestuarantValidation, restuarantController.addRestuarants)

restuarantsRoutes.get('/get-all-restuarant', restuarantController.getAllRestuarants)

restuarantsRoutes.get('/get-individual-restuarant/:id', restuarantController.getIndiviualResturants)

restuarantsRoutes.put('/update-restuarant/:id', Validation.addRestuarantValidation, restuarantController.updateRestuarants)

restuarantsRoutes.put('/delete-restuarant/:id', restuarantController.deleteRestuarants)

restuarantsRoutes.post('/add-menu', Validation.addMenuValidation, menuController.addMenus)

restuarantsRoutes.get('/get-all-menu', menuController.getAllMenus)

restuarantsRoutes.get('/get-individual-menu/:id', menuController.getIndiviualMenus)

restuarantsRoutes.put('/update-menu/:id', Validation.addMenuValidation, menuController.updateMenus)

restuarantsRoutes.get('/restuarant-all-menus/:id', restuarantController.restuarantAllMenus)

restuarantsRoutes.post('/find-data-by-restuarant-name',Validation.findDataByRestNameValidation, restuarantController.fetchDataByRetuarantNames)

restuarantsRoutes.post('/find-data-by-menu-name',Validation.findDataByMenuNameValidation, restuarantController.fetchDataByMenuNames)

restuarantsRoutes.post('/find-data-by-menu-price',Validation.findDataByMenuPriceValidation, restuarantController.fetchDataByMenuPrices)

restuarantsRoutes.get('/get-all-details-of-restuarant/:id', restuarantController.allDetailsOfRestuarants)

module.exports = restuarantsRoutes

// aZynwk4ecjXuUxBB
