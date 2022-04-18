// Business logic
// Database etc 

const Menu = require("../models/menu");

module.exports = {
    
    addMenu: (body) => {
        return new Promise(async(resolve, reject) => {
            const menuObj = {
                restuarantID : body.restuarantID,
                menuName     : body.menuName.toLowerCase(),
                cuisine      : body.cuisine,
                price        : body.price
            }

            await Menu.findOne({restuarantID : menuObj.restuarantID, menuName : menuObj.menuName})
                .then(menuD => {
                    if(menuD){
                        return reject("Menu Already Exist")
                    }
                    return Menu.create(menuObj)
                })
                .then(data => {
                    return resolve(data)
                })
                .catch(err => {
                    return reject(err)
                })

        })
    },

    getAllMenu: () => {
        return new Promise(async(resolve, reject) => {
            await Menu.find()
                .then(async menuD => {
                    if(menuD.length == 0){
                        return reject("No Menu Found")
                    }
                    return resolve(menuD)
                })
                .catch(err => {
                    return reject(err)
                })
        })
    },

    getIndiviualMenu: (params) => {
        return new Promise(async(resolve, reject) => {
            const _id = params.id
            await Menu.findOne({_id : _id})
                .then(menuD => {
                    if(!menuD){
                        return reject("Menu Not Found")
                    }
                    if(!menuD.status){
                        return reject("Menu Closed")
                    }
                    return resolve(menuD)
                })
                .catch(err => {
                    return reject(err)
                })
        })
    },

    updateMenu: async (params, body) => {
        return new Promise(async(resolve, reject) => {
            const _id = params.id;

            const menuObj = {
                restuarantID : body.restuarantID,
                menuName     : body.menuName.toLowerCase(),
                cuisine      : body.cuisine,
                price        : body.price
            }

            await Menu.findOne({restuarantID : menuObj.restuarantID, menuName : menuObj.menuName})           
                .then(menuD => {
                    if(menuD){
                        if(menuD._id !== _id){
                            return reject("Menu ALready Exist")
                        }
                    }
                    return Menu.updateOne({_id : _id} , {$set : menuObj})
                })
                .then(data => {
                    return resolve(data)
                })
                .catch(err => {
                    return reject(err)
                })
        })
    }
}