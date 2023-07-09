const express = require('express')
const app = express()
const connectDb = require('./config/dbconnection')
const cors = require('cors')

const port = 5000
app.use(cors())
connectDb()
app.use(express.json())
app.use('/api/contests', require('./routes/contestsroutes.js'))
app.use('/api/leaderboard', require('./routes/leaderboardroutes'))

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
