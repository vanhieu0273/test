const express = require('express')
const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json

//get/post/put/delete
app.get('/hello', (req, res) => {
  res.status(201).send('Hello World!')
})

app.post('/products/create', (req, res) => {
  const { name, description } = req.body

  if(name && description) {
    res.status(201).json({
        msg: "thanh copng",
    });
  }else{
    res.status(400).json({
        msg: " khong du",
    });
  }
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})