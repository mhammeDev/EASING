const UserService = require("../services/UserService")
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    try{
        const {username, password} = req.body;
        UserService.login(username, password, (error, result) => {
            if(error){
                console.log(error)
                return res.status(500).json({error});
            } 
            else{
                const token  = jwt.sign(result, process.env.jwtSecret, {expiresIn: "5h"})
                return res.status(200).json({data: result, token})
            }
        })
    } catch (e){
        console.log(e)
        if(error) return res.status(404).json({error: "Impossible to login !"});
    }
}

exports.getInformationFromToken = async (req, res) => {
    try{
        console.log(req.user)
        return res.status(200).json({data: req.user})
    } catch (e){
        console.log(e)
        return res.status(500).json({error : "Impossible to extract token !"})
    }
}
