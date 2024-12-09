const express = require("express");
const cors = require("cors")

const app = express();
const PORT = 5000;

// cross origin -> use to handle cross origin requests
app.use(cors());

// Storing speed data 
let currentspeed = 0;

// Generating speed data in every 3 seconds 
setInterval(() => {
  currentspeed = Math.floor(Math.random() * 200)
}, 3000)

// initial route
app.get("/", (req, res)=>{
  res.send("<h1>Server is working</h1>")
})
// Main route 
app.get('/api/speed', (req,res) =>{
  res.json({speed : currentspeed})
}) 

// app is working on this Port
app.listen(PORT, () =>{
  console.log(`server is running on ${PORT}`);
})