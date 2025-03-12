import { Router } from "express";
import {
    validateInvitadoId,
    validateInvitadosInput,
} from "../middleware/invitado";
import { handleInputErrors } from "../middleware/validation";
import { InvitadosController } from "../controller/invitadosController";

const router = Router();

router.post(
    "/crear",
    validateInvitadosInput,
    handleInputErrors,
    InvitadosController.create
);

router.get("/", InvitadosController.getAll);
router.get("/:invitadoId", validateInvitadoId, InvitadosController.getById);

router.put(
    "/:invitadoId",
    validateInvitadoId,
    validateInvitadosInput,
    handleInputErrors,
    InvitadosController.updateById
);
router.delete(
    "/:invitadoId",
    validateInvitadoId,
    InvitadosController.deleteById
);

router.get(
    "/:invitadoId/acompanantes",
    validateInvitadoId,
    InvitadosController.getAcompanantes
);

router.post(
    "/:invitadoId/acompanantes",
    validateInvitadoId,
    InvitadosController.addAcompanante
);

router.delete(
    "/:invitadoId/acompanantes/:acompananteId",
    validateInvitadoId,
    InvitadosController.removeAcompanante
);

export default router;