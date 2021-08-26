require('dotenv/config')
const express = require('express')
const app = express()

app.listen(process.env.SERVER_PORT, () => console.log(`Server Running on port ${process.env.SERVER_PORT}`))
