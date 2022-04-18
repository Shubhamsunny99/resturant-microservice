const mongoose = require('mongoose'),
      {Schema} = mongoose;

let table = new Schema(
  {
      restuarantID: {
        type: Schema.Types.ObjectId,
        default: null,
        lowercase: true
      },
      menuName: {
        type: String,
        trim: true,
        lowercase: true
      },
      cuisine:{
          type: String,
          enum : ['veg', 'non-veg']
      },
      price:{
          type: Number,
          trim: true,
          default: 0
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
module.exports = mongoose.model(`menus`, table);