const Entry = require('../models/Entry')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError} = require('../errors')

const getAllEntries = async(req,res)=>{
    // const queryObject = {createdBy:req.user._id}
    let result = Entry.find({})
    const page = Number(req.query.page) || 1
    const limit = req.query.limit || 4
    result = result.skip((page - 1) * limit).limit(limit)

    const entries = await result.sort('-createdAt')
    const totalEntries = await Entry.countDocuments()
    const numPages = Math.ceil(totalEntries / limit)

    res.status(StatusCodes.OK).json({entries,totalEntries,numPages})
}

const getEntry = async(req,res)=>{
    const {id:entryId} = req.params
    const entry = await Entry.findById(entryId)
    if(!entry){
        throw new NotFoundError(`Entry with id ${entryId} not found`)
    }
    res.status(StatusCodes.OK).json({entry})
}

const createEntry = async(req,res)=>{
    // req.user._id from authMiddleware
   req.body.createdBy = req.user._id
   const entry = await Entry.create(req.body)
   res.status(StatusCodes.CREATED).json(entry)
}

const updateEntry = async(req,res)=>{
    const {id:entryId} = req.params
    const {title,description, image, customerWebsite} = req.body
    if(title === '' || description === ''|| image === ''|| customerWebsite === '') throw new BadRequestError("Title, Description, Image Customer Website fields cannot be empty")


    const entry = await Entry.findOneAndUpdate(
            {createdBy:req.user._id, _id:entryId},
            req.body,{new:true,runValidators:true}
        )
    if(!entry){
        throw new NotFoundError(`Entry with id ${entryId} not found`)
    }

    res.status(StatusCodes.OK).json({entry})
}

const deleteEntry = async(req,res)=>{
    const {id:entryId} = req.params
    const entry = await Entry.findOneAndDelete({createdBy:req.user._id,_id:entryId})
    if(!entry){
        throw new NotFoundError(`Entry with id ${entryId} not found`)
    }

    res.status(StatusCodes.OK).json({entry})
}   

module.exports = {
    getAllEntries,
    getEntry,
    createEntry,
    updateEntry,
    deleteEntry
}