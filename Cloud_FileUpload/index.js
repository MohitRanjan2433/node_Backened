//APP CREATE
const express = require("express");
const app = express();

//PORT FIND KRNA HAI
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middleware add
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

//DB SE CONNECT KRNA HAI
const db = require("./config/database");
db.connect();

//CLOUD SE CONNECT KRNA HAI
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//API ROUTE MOUNT KRNA HAI
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload', Upload);


//ACTIVATE SERVER
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})

