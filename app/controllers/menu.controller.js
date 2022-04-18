const menuService = require("../services/menu.service")


module.exports = {
    addMenus : async (req, res) => {
        menuService.addMenu(req.body)
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

    getAllMenus : async (req, res) => {
        menuService.getAllMenu()
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

    getIndiviualMenus : async (req, res) => {
        menuService.getIndiviualMenu(req.params)
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

    updateMenus : async (req, res) => {
        menuService.updateMenu(req.params, req.body)
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

// aZynwk4ecjXuUxBB
