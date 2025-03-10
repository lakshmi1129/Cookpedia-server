const testimonials = require('../models/testimonyModel')

// add testimony
exports.addTestimonyController = async(req,res)=>{
    console.log("inside addTestimonyController ");
    const {name,email,message} = req.body
    try{
        const newTestimony = new testimonials({name,email,message})
        await newTestimony.save()
        res.status(200).json(newTestimony)
    }catch(err){
        res.status(401).json(err)
    }
    
}

// get all testimony
exports.getAllTestimonyController = async(req,res)=>{
    console.log("inside getAllTestimonyController ");
    try{
        allFeedbacks = await testimonials.find()
        res.status(200).json(allFeedbacks)
    }catch(err){
        res.status(401).json(err)
    }
    
}

// Update status- testimony
exports.updateFeedbackStatusController = async(req,res)=>{
    console.log("inside updateFeedbackStatusController ");
    // get feedback id from url parameter
    const {id} = req.params
    // get status of feedback from url query
    const status = req.query.status
    // update status of feedback with given id
    try{
        const existingFeedback = await testimonials.findById({_id:id})
        existingFeedback.status = status
        await existingFeedback.save()
        res.status(200).json(existingFeedback)
    }catch(err){
        res.status(401).json(err)
    }
    
}

// get all approved testimony - no JWT middleware
exports.getAllApprovedFeedbackController = async(req,res)=>{
    console.log("inside getAllApprovedFeedbackController ");
    try{
        allApprovedFeedbacks = await testimonials.find({status:"Approved"})
        res.status(200).json(allApprovedFeedbacks)
    }catch(err){
        res.status(401).json(err)
    }
    
}