const recipes = require("../models/recipeModel")

// get all recipes
exports.getAllRecipeController = async (req,res)=>{
    console.log("inside getAllRecipeController ");
    try{
        const allRecipes = await recipes.find()
        res.status(200).json(allRecipes)
    }catch(err){
        res.status(401).json(err)
    }
}


// regRecipeController  - need authorization

exports.getARecipeController = async (req,res)=>{
    console.log("inside getARecipeController");
    // get the dynamic value from url
    const {id} = req.params
    try{
        const recipeDetails = await recipes.findById({_id:id})
        res.status(200).json(recipeDetails)
    }catch(err){
        res.status(401).json(err)
    }
    
}


// relatedRecipeController  - need authorization

exports.relatedRecipeController = async (req,res)=>{
    console.log("inside relatedRecipeController");
    const cuisine = req.query.cuisine
    try{
        const allrelatedrecipes = await recipes.find({cuisine})
        res.status(200).json(allrelatedrecipes)
    }catch(err){
        res.status(401).json(err)
    }
    
}

// Add recipe
exports.addRecipeController = async(req,res)=>{
    console.log("inside addRecipeController");
    // 1. get all data from request body
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = req.body
    try{
    // 2. check recipe already in collection
    const existingRecipe = await recipes.findOne({name})
    if(existingRecipe){
    // 3. else recipe already exists
        res.status(406).json("Recipe Already Exists in our Collection !!! Add Another....")
    }
    else{
    // 4. if recipe not in model then insert the recipe
    const newRecipe = new recipes({
        name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType
    })
    await newRecipe.save()
    res.status(200).json(newRecipe)
    }
    }catch(err){
        res.statu(401).json(err)
    }
   
}


// Edit recipe
exports.editRecipeController = async(req,res)=>{
    console.log("inside editRecipeController");
    const {id} = req.params
    // 1. get all data from request body
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = req.body
    try{   

    const updateRecipe = await recipes.findByIdAndUpdate({_id:id},{
        name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType
    },{new:true})
    await updateRecipe.save()
    res.status(200).json(updateRecipe)

    }catch(err){
        res.statu(401).json(err)
    }
   
}

// delete recipe
exports.deleteRecipeController = async(req,res)=>{
    console.log("inside deleteRecipeController");
    const {id} = req.params
    try{   
    const removeRecipe = await recipes.findByIdAndDelete({_id:id})
    res.status(200).json(removeRecipe)
    }catch(err){
        res.statu(401).json(err)
    }
   
}