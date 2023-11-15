const express = require('express')
const app = express();

// app.listen(3000, () => {
//     console.log('App is running')
// }) 

// app.get("/", (req,res) => {
//     res.send('<h1>This my homepage baby</h1>')
// })

require('dotenv').config();
const PORT = process.env.PORT || 3000

//middleware
app.use(express.json());

const blog = require("./routes/blog")
//mount
app.use("api/v1", blog);

const dbConnect = require("./config/database")
dbConnect();

//start the server
app.listen(PORT, () => {
    console.log(`App is starting at Port no ${PORT}`);
})

app.get("/", (req,res) => {
    res.send('<h1>This is my homepage baby</h1>')
}) 