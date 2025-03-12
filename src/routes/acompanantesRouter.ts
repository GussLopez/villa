import { Router } from "express";
import { validateAcompananteId, validateAcompananteInput } from "../middleware/acompanante";
import { handleInputErrors } from "../middleware/validation";
import { AcompananteController } from "../controller/acompananteController";

const router = Router();

router.post(
    "/crear",
    validateAcompananteInput,
    handleInputErrors,
    AcompananteController.create
);

router.get("/", AcompananteController.getAll);
router.get("/:acompananteId", validateAcompananteId, AcompananteController.getById);

router.put(
    "/:acompananteId",
    validateAcompananteId,
    validateAcompananteInput,
    handleInputErrors,
    AcompananteController.updateById
);

router.delete('/:acompananteId', validateAcompananteId, AcompananteController.deleteById)

export default router