const mongoose = require('mongoose')

require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB Connection Successful'))
    .catch((error) => {
        console.log('Issue in db connect');
        console.error(error.message);
        console.exit(1);
    });
}

module.exports = dbConnect;