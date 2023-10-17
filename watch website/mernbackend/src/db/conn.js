const mongoose = require("mongoose");

// connection creation and creating new db
mongoose.connect("mongodb://0.0.0.0:27017/signup", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`connection successful`);
}).catch((err) => {
    console.log(err);
});

module.exports = mongoose.connection;

