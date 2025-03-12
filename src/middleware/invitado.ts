import type { Request, Response, NextFunction } from "express"
import { body, param, validationResult } from "express-validator"
import Invitado from "../models/Invitados"

declare global {
  namespace Express {
    interface Request {
      invitado?: Invitado
    }
  }
}

export const validateInvitadoId = async (req: Request, res: Response, next: NextFunction) => {
  await param("invitadoId")
    .isInt()
    .withMessage("ID no válido")
    .custom((VALUE) => VALUE > 0)
    .withMessage("ID No válido")
    .run(req)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return
  }

  try {
    const invitado = await Invitado.findByPk(Number.parseInt(req.params.invitadoId))
    if (!invitado) {
        res.status(404).json({ error: "Invitado no encontrado" })
        return 
    }
    req.invitado = invitado
    next()
  } catch (error) {
    res.status(500).json({ error: "Error al buscar el invitado" })
  }
}

export const validateInvitadosInput = async (req: Request, res: Response, next: NextFunction) => {
  await body("nombre").notEmpty().withMessage("El nombre es requerido").run(req)
  await body("numero").notEmpty().withMessage("El numero es obligatorio").run(req)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return 
  }
  next()
}

