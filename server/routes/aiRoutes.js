import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { enhanceProfessionalSummary , enhanceJobDescriptions, uploadResume} from "../controllers/aiController.js";

const aiRouter = express.Router();

aiRouter.post('/enhance-pro-sum', protect , enhanceProfessionalSummary)
aiRouter.post('/enhance-job-desc', protect , enhanceJobDescriptions)
aiRouter.post('/upload-resume',protect, uploadResume)

export default aiRouter;