import type { Request, Response, NextFunction } from "express"
import { body, param, validationResult } from "express-validator"
import Acompanante from "../models/Acompanante"

declare global {
  namespace Express {
    interface Request {
      acompanante?: Acompanante
    }
  }
}

export const validateAcompananteId = async (req: Request, res: Response, next: NextFunction) => {
  await param("acompananteId")
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
    const acompanante = await Acompanante.findByPk(Number.parseInt(req.params.acompananteId))
    if (!acompanante) {
        res.status(404).json({ error: "Acompanante no encontrado" })
        return 
    }
    req.acompanante = acompanante
    next()
  } catch (error) {
    res.status(500).json({ error: "Error al buscar el acompañante" })
  }
}

export const validateAcompananteInput = async (req: Request, res: Response, next: NextFunction) => {
  await body("nombre").notEmpty().withMessage("El nombre es requerido").run(req)
  await body("numero").notEmpty().withMessage("El numero es obligatorio").run(req)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return 
  }
  next()
}

