const mongoose = require("mongoose");

exports.connection = async () => {
  mongoose.connect(
    "mongodb+srv://medgrizz:ilTeQttmmcx6e80E@cluster0.aqusjbt.mongodb.net/?retryWrites=true&w=majority"
  );
  //mongoose.connect("mongodb://localhost:27017/MedGrizz");
};
