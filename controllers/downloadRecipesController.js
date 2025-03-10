const downloadRecipes = require("../models/downloadModel")


// add to downloadRecipes
exports.addToDownloadRecipeController = async(req,res)=>{
    console.log("inside addToDownloadRecipeController ");
    const {id} = req.params
    const userId = req.userId
    const {name,image,cuisine} = req.body
    console.log(name,image,cuisine);
    try{
        // check recipe already in download
        const existingRecipe = await downloadRecipes.findOne({recipeId:id})
        if(existingRecipe){
            // increment count
            existingRecipe.count +=1
            await existingRecipe.save()
            res.status(200).json(existingRecipe)
        }else{
            // add recipe to model
            const newRecipe = new downloadRecipes({
                recipeId:id,
                recipeImage:image,
                recipeName:name,
                recipeCuisine:cuisine, 
                count:1,
                userId
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    }catch(err){
        res.status(401).json(err)
    }
    
    
}


// get user download recipes
exports.getUserDownloadListController = async(req,res)=>{
    console.log("Inside getUserDownloadListController");
    const userId = req.userId
    try{
        const alluserDownloads = await downloadRecipes.find({userId})
        res.status(200).json(alluserDownloads)
    }catch(err){
        res.status(401).json(err)
    } 
}

// get all download recipes
exports.getAllDownloadListController = async(req,res)=>{
    console.log("Inside getAllDownloadListController");
    try{
        const allDownloads = await downloadRecipes.find()
        res.status(200).json(allDownloads)
    }catch(err){
        res.status(401).json(err)
    } 
}