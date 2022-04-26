const restuarantService = require("../services/restuarant.service")


module.exports = {
    addRestuarants : async (req, res) => {
        restuarantService.addRestuatant(req.body)
            .then((data) => {
                return res.json({
                    status : 200,
                    data  : data
                })
            })
            .catch((err) => {
                return res.json({
                    status : 400,
                    error  : err
                })
            })
    },

    getAllRestuarants : async (req, res) => {
        restuarantService.getAllResturant()
            .then((data) => {
                return res.json({
                    status : 200,
                    data  : data
                })
            })
            .catch((err) => {
                return res.json({
                    status : 400,
                    error  : err
                })
            })
    },

    getIndiviualResturants : async (req, res) => {
        restuarantService.getIndiviualResturant(req.params)
            .then((data) => {
                return res.json({
                    status : 200,
                    data  : data
                })
            })
            .catch((err) => {
                return res.json({
                    status : 400,
                    error  : err
                })
            })
    },

    updateRestuarants : async (req, res) => {
        restuarantService.updateRestuarant(req.params, req.body)
            .then((data) => {
                return res.json({
                    status : 200,
                    data  : data
                })
            })
            .catch((err) => {
                return res.json({
                    status : 400,
                    error  : err
                })
            })
    },

    deleteRestuarants : async (req, res) => {
        restuarantService.deleteRestuarant(req.params)
            .then((data) => {
                return res.json({
                    status : 200,
                    data  : data
                })
            })
            .catch((err) => {
                return res.json({
                    status : 400,
                    error  : err
                })
            })
    },

    restuarantAllMenus : async (req, res) => {
        restuarantService.restuarantAllMenu(req.params)
            .then((data) => {
                return res.json({
                    status : 200,
                    data  : data
                })
            })
            .catch((err) => {
                return res.json({
                    status : 400,
                    error  : err
                })
            })
    }

}

