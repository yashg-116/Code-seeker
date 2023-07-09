const Leaderboard = require('../models/lbmodel.js')
const makeid = require('./makeid')
const getResponse = require('./getResponse')
const asyncHandler = require("express-async-handler");

const createlb = asyncHandler( async (req, res) => {
    let id
    while(1){
        id = makeid(5)
        const Lb = await Leaderboard.find({ id: id }).setOptions({ sanitizeFilter: true });
        if(Lb.length == 0) 
            break;
    }
    const board = await Leaderboard.create({
        id: id, 
    });
    res.status(201).json(board)
});

const getlb = asyncHandler( async (req, res) => {
    const Lb = await Leaderboard.find({ id: req.params.id }).setOptions({ sanitizeFilter: true });
    if(Lb.length == 0){
        res.status(404);
        throw new Error("LeaderBoard not Found");
    }
    let LB = [];
    for (let i = 0; i < Lb[0].Lb.length; i++) {
        user = Lb[0].Lb[i]
        const url = "https://codeforces.com/api/user.info?handles=" + user
        let response = await getResponse(url)
        let obj = { 
            "user": user,
            "rating": response.result[0].rating, 
            "rank":   response.result[0].rank
        }
        console.log(obj)
        LB.push(obj)
    }
    res.status(201).json(LB)
});

const addlb = asyncHandler( async (req, res) => {
    const { user } = req.body
    const url = "https://codeforces.com/api/user.info?handles=" + user
    let response = await getResponse(url)
    if(response.status == "FAILED"){
        res.status(400).json()
        throw new Error("Does Not Exist")
    }
    const Lb = await Leaderboard.find({ id: req.params.id }).setOptions({ sanitizeFilter: true });
    if(Lb.length == 0){
        res.status(404);
        throw new Error("LeaderBoard not Found");
    }
    let found = 0
    for (let i = 0; i < Lb[0].Lb.length; i++) {
        if (Lb[0].Lb[i] == user) found = 1
    }
    if(found){
        res.status(400).json()
        throw new Error("user already exists")
    }
    const mID = Lb[0]._id;
    const ID = Lb[0].id
    let cfUsers = Lb[0].Lb
    cfUsers.push(user)
    const updatedLb = await Leaderboard.findByIdAndUpdate(
        mID,
        {
            id : ID,
            Lb : cfUsers
        },
        {new: true}
    );
    res.status(200).json(updatedLb);
});

const deletelb = asyncHandler( async (req, res) => {
    const { user } = req.body
    const url = "https://codeforces.com/api/user.info?handles=" + user
    let response = await getResponse(url)
    if(response.status == "FAILED"){
        res.status(400).json()
        throw new Error("Does Not Exist")
    }
    let Lb = await Leaderboard.find({ id: req.params.id }).setOptions({ sanitizeFilter: true });
    if(Lb.length == 0){
        res.status(404);
        throw new Error("LeaderBoard not Found");
    }
    const mID = Lb[0]._id
    const ID = Lb[0].id

    const index = Lb[0].Lb.indexOf(user);

    if (index > -1) { 
        Lb[0].Lb.splice(index, 1); 
    }
    
    const updatedLb = await Leaderboard.findByIdAndUpdate(
        mID,
        {
            id : ID,
            Lb : Lb[0].Lb
        },
        {new: true}
    );
    res.status(200).json(updatedLb);
});

module.exports = {createlb, getlb, addlb, deletelb}


