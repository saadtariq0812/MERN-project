const express = require('express')
const dotenv = require('dotenv').config();
const colors = require('colors')
const port = process.env.PORT;
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

connectDB();


const app = express();

//in order to access req body
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))


app.use(errorHandler)




app.listen(port, () => console.log(`listening on port ${port}`));