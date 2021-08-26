require('dotenv/config')
const app = require('./config/app')

app.listen(process.env.SERVER_PORT, () => console.log(`Server Running on port ${process.env.SERVER_PORT}`))
