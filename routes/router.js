const express = require("express")
const recipeController = require("../controllers/recipeController")
const testimonyController = require("../controllers/testimonyController")
const userController = require("../controllers/userController")
const jwtMiddleware = require("../middlewares/jwtMiddleware")
const downloadRecipesController = require("../controllers/downloadRecipesController")
const saveRecipeController = require("../controllers/saveRecipeController")

const router = new express.Router()

// all-recipes
router.get("/all-recipes",recipeController.getAllRecipeController)

// add-testimony
router.post("/add-testimony",testimonyController.addTestimonyController)

// register
router.post("/register",userController.addUserController)

// login
router.post("/login",userController.loginController)

// view single recipe
router.get("/recipe/:id/view",jwtMiddleware,recipeController.getARecipeController)

// Related recipe
router.get("/related-recipe",jwtMiddleware,recipeController.relatedRecipeController)

// download recipe
router.post("/recipe/:id/download",jwtMiddleware,downloadRecipesController.addToDownloadRecipeController)

// save recipe
router.post("/recipe/:id/save",jwtMiddleware,saveRecipeController.addToSaveRecipeController)


// get user saved recipe
router.get("/get-save-recipes",jwtMiddleware,saveRecipeController.getUserSavedRecipeController)

// delete user saved recipe
router.delete("/save-recipes/:id/remove",jwtMiddleware,saveRecipeController.removeSaveRecipeController)


// get user download recipe
router.get("/user-downloads",jwtMiddleware,downloadRecipesController.getUserDownloadListController)

// edit-user
router.post("/user/edit",jwtMiddleware,userController.editUserController)

// get-all-users
router.get("/all-users",jwtMiddleware,userController.getAllUserController)

// get  download recipe
router.get("/download-list",jwtMiddleware,downloadRecipesController.getAllDownloadListController)

// get-testimony
router.get("/all-feedback",jwtMiddleware,testimonyController.getAllTestimonyController)

// update-testimony
router.get("/feedback/:id/update",jwtMiddleware,testimonyController.updateFeedbackStatusController)

// get-Approved-testimony
router.get("/all-approved-feedback",testimonyController.getAllApprovedFeedbackController)


// add-recipes
router.post("/add-recipe",jwtMiddleware,recipeController.addRecipeController)

// edit-recipes
router.put("/recipe/:id/edit",jwtMiddleware,recipeController.editRecipeController)

// delete-recipes
router.delete("/recipe/:id/remove",jwtMiddleware,recipeController.deleteRecipeController)


module.exports = router 