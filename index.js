const express = require('express');
const cors = require('cors');
const app =express();
const port =process.env.PORT || 5000;


// middleware
app.use(cors())
app.use(express.json())




app.get ('/',(req,res)=>{
    res.send("B9-A10-Asia-Explorer-client server is running")
})
app.listen(port,()=>{
    console.log(`B9-A10-Asia-Explorer-client server is running on port ${port}`);
})