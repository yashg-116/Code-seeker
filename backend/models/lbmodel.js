const mongoose = require('mongoose');

const lbSchema = mongoose.Schema({
    id : {
        type: String,
    },
    Lb : [{
        type: String
    }]
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("leaderboard", lbSchema)