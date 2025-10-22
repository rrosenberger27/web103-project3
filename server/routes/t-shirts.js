import express from "express";
import TshirtController from "../controllers/t-shirts.js"; 

const tshirtRouter = express.Router();

tshirtRouter.get("/", TshirtController.getAllTshirts);
tshirtRouter.get("/:id", TshirtController.getTshirtById);
tshirtRouter.post("/", TshirtController.createTshirt);
tshirtRouter.put("/:id", TshirtController.updateTshirt);
tshirtRouter.delete("/:id", TshirtController.deleteTshirt);

export default tshirtRouter;