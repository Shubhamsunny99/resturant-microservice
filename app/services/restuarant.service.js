// Business logic
// Database etc 

const Restuarant = require("../models/restuarant");

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
    }
}