// Business logic
// Database etc 

const Restuarant = require("../models/restuarant");
const Menu       = require("../models/menu");
const mongoose = require('mongoose');
const Axios    = require('axios');
const Redis    = require('../../redis');

module.exports = {
    
    addRestuatant: (body) => {
        return new Promise(async(resolve, reject) => {
            const restuarantObj = {
                name      : body.name,
                location  : body.location,
                lang      : body.lang,
                lat       : body.lat
            }

            await Restuarant.create(restuarantObj)
                .then(data => {
                    return resolve(data)
                })
                .catch(err => {
                    return reject(err)
                })

        })
    },

    getAllResturant: () => {
        return new Promise(async(resolve, reject) => {
            await Restuarant.find({status : true})
                .then(async restuarantD => {
                    if(restuarantD.length == 0){
                        return reject("No Restuarant Found")
                    }
                    return resolve(restuarantD)
                })
                .catch(err => {
                    return reject(err)
                })
        })
    },

    getIndiviualResturant: (params) => {
        return new Promise(async(resolve, reject) => {
            const _id = params.id
            await Restuarant.findOne({_id : _id})
                .then(restuarantD => {
                    if(!restuarantD){
                        return reject("Restuarant Not Found")
                    }
                    if(!restuarantD.status){
                        return reject("Restuarant Closed")
                    }
                    return resolve(restuarantD)
                })
                .catch(err => {
                    return reject(err)
                })
        })
    },

    updateRestuarant: async (params, body) => {
        return new Promise(async(resolve, reject) => {
            const _id = params.id;

            const restuarantObj = {
                name      : body.name,
                location  : body.location,
                lang      : body.lang,
                lat       : body.lat
            }

            await Restuarant.updateOne({_id : _id} , {$set : restuarantObj})            
                .then(data => {
                    return resolve(data)
                })
                .catch(err => {
                    return reject(err)
                })
        })
    },

    deleteRestuarant: async (params) => {
        return new Promise(async(resolve, reject) => {
            const _id = params.id;

            await Restuarant.findOne({_id : _id})
                .then(async restuarantD => {
                    if(!restuarantD){
                        return reject("Restuarant Not Exist")
                    }
                    return await Restuarant.updateOne({_id : _id} , {$set : {status : false}})
                })
                .then(data => {
                    return resolve(data)
                })
                .catch(err => {
                    return reject(err)
                })

        })
    },

    restuarantAllMenu: async (params) => {
        return new Promise(async(resolve, reject) => {
            const _id = params.id;
            await Restuarant.aggregate([
                    {
                        $match : {_id : mongoose.Types.ObjectId(_id)}
                    },
                    {
                        $lookup : {
                            from         : "menus",
                            localField   : "_id",
                            foreignField : "restuarantID",
                            as           : "menus"
                        }
                    },
                    {
                        $project : {
                            "menus._id": 0,
                            "menus.restuarantID" : 0
                        }
                    }
                ])
                .then(async restuarantD => {
                    return resolve(restuarantD)
                })
                .catch(err => {
                    return reject(err)
                })

        })
    },

    fetchDataByRetuarantName : async (body) => {
        return new Promise(async(resolve, reject) => {
            const _id = params.id;
            await Restuarant.aggregate([
                    {
                        $match : {name : body.name}
                    },
                    {
                        $lookup : {
                            from         : "menus",
                            localField   : "_id",
                            foreignField : "restuarantID",
                            as           : "menus"
                        }
                    },
                    {
                        $project : {
                            "menus._id": 0,
                            "menus.restuarantID" : 0
                        }
                    }
                ])
                .then(async restuarantD => {
                    return resolve(restuarantD)
                })
                .catch(err => {
                    return reject(err)
                })

        })
    },

    fetchDataByMenuName : async (body) => {
        return new Promise(async(resolve, reject) => {
            await Menu.aggregate([
                    {
                        $match : {menuName : body.menuName}
                    },
                    {
                        $lookup : {
                            from         : "restuarants",
                            localField   : "restuarantID",
                            foreignField : "_id",
                            as           : "resstuarantDetails"
                        }
                    }
                ])
                .then(async menuD => {
                    return resolve(menuD)
                })
                .catch(err => {
                    return reject(err)
                })

        })
    },

    fetchDataByMenuPrice : async (body) => {
        return new Promise(async(resolve, reject) => {
            await Menu.aggregate([
                    {
                        $match : {price : {$lte : body.price}}
                    },
                    {
                        $lookup : {
                            from         : "restuarants",
                            localField   : "restuarantID",
                            foreignField : "_id",
                            as           : "resstuarantDetails"
                        }
                    }
                ])
                .then(async menuD => {
                    return resolve(menuD)
                })
                .catch(err => {
                    return reject(err)
                })

        })
    },

    allDetailsOfRestuarant : async (params) => {
        return new Promise(async(resolve, reject) => {
            let checkValueInCache = await Redis.getValue(params.id)
            if(checkValueInCache){
                return resolve(checkValueInCache)
            }
            await Restuarant.aggregate([
                    {
                        $match : {_id : mongoose.Types.ObjectId(params.id)}
                    },
                    {
                        $lookup : {
                            from         : "menus",
                            localField   : "_id",
                            foreignField : "restuarantID",
                            as           : "menus"
                        }
                    },
                    {
                        $project : {
                            "menus._id": 0,
                            "menus.restuarantID" : 0
                        }
                    }
                ])
                .then(async menuD => {
                    const reviewData = await Axios.get('http://localhost:8081/reviews/fetch-review-by-restuarant', {
                        params: {
                          id: params.id
                        }
                      })
                      await Redis.setValue(params.id , {menuD, reviewData})
                    return resolve({
                        status : 200,
                        data : {menuD, reviewData}
                    }) 
                })
                .catch(err => {
                    return reject(err)
                })

        })
    }
}