const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect("mongodb+srv://furqan:123321@cluster0.yvgalwo.mongodb.net/blog?retryWrites=true&w=majority")
    .then((data) => {
        console.log(`mongodb connect with server: ${data.connection.host}`)
    })
}

module.exports = connectDatabase;