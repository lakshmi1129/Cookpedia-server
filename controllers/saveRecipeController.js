const saveRecipes = require('../models/saveRecipeModel')

// add to collection
exports.addToSaveRecipeController = async(req,res)=>{
    console.log("inside addToSaveRecipeController");
    const {id} = req.params
    const  userId = req.userId
    const {name, image} = req.body
    try{
        const existingRecipe = await saveRecipes.findOne({recipeId:id,userId})
        if(existingRecipe){
            res.status(406).json("Selected Recipe Already Saved.. Please Add Nother One !!!")
        }else{
            const newRecipe = new saveRecipes({
                recipeId:id,name,image,userId
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    }catch(err){
        res.status(401).josn(err)
    }    
}

// user recipe get - authorization user
exports.getUserSavedRecipeController = async (req,res)=>{
    console.log("inside getUserSavedRecipeController");
    // get userId
    const userId = req.userId
    try{
        const userRecipeCollection = await saveRecipes.find({userId})
        res.status(200).json(userRecipeCollection)
    }catch(err){
        req.status(401).json(err)
    }
    
}


// remove save recipe - authorization needed
exports.removeSaveRecipeController = async (req,res)=>{
    console.log("inside removeSaveRecipeController");
    const {id} = req.params
    try{
        const removeSaveRecipe = await saveRecipes.findByIdAndDelete({_id:id})
        console.log(removeSaveRecipe);
        
        res.status(200).json(removeSaveRecipe)
    }catch(err){
        res.status(401).json(err)
    }
    
}