const mongoose = require('mongoose'),
      {Schema} = mongoose;

let table = new Schema(
  {
      name: {
          type: String,
          default: null,
          lowercase: true
      },
      location:{
          type: String,
          trim: true,
          lowercase: true
      },
      lang:{
          type: String,
          trim: true,
          lowercase: true
      }, 
      lat: {
          type: String,
          trim: true
      },
      status : {
          type : Boolean,
          default : true
      }
        
  },
  {
      timestamps: {
          createdAt: 'createdAt',
          updatedAt: 'updatedAt'
      },
  }
);

// module.exports = table
module.exports = mongoose.model(`restuarants`, table);