const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        // default:'admin@example.com',
        required:[true,'Please provide email'],
        unique:true,
        match:[ /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please provide a valid email']
    },
    password:{
        type:String,
        // default:'admin',
        required:[true,'Please provide password'],
        minlength:5
    }
},{timestamps:true})

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

UserSchema.methods.comparePassword = async function(pass){
    const isMatch = await bcrypt.compare(pass,this.password)
    return isMatch
}

UserSchema.methods.createJWT = function(){
    return jwt.sign(
        {userId:this._id},
        process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_LIFETIME
        }
    )
}


module.exports = mongoose.model('User', UserSchema)