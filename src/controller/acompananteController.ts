import type { Request, Response } from "express";
import Acompanante from "../models/Acompanante";
import Invitado from "../models/Invitados";

export class AcompananteController {
    static create = async (req: Request, res: Response) => {
        const { nombre, numero, invitadoId, numeroInvitado } = req.body;

        if (!invitadoId) {
            res.status(400).json({ error: "El ID del invitado es requerido" });
            return;
        }

        if (!numeroInvitado) {
            res.status(400).json({ error: 'El numero del invitado es requerido'})
            return
        }

        
        try {
            const invitado = await Invitado.findByPk(invitadoId);
            if (!invitado) {
                res.status(404).json({ error: "Invitado no encontrado" });
                return
            }

            if (invitado.numero !== numeroInvitado) {
                res.status(400).json({ error: 'El númeor del invitado es incorrecto'})
                return
            }

            const acompanantesActuales = await Acompanante.count({where: { invitadoId }});

            if (acompanantesActuales >= invitado.acom) {
                res.status(400).json({error: `Alcanzaste el máximo de acompañantes permitidos (${invitado.acom})`,});
                return 
            }

            const acompanante = new Acompanante(req.body);
            await acompanante.save();

            res.status(201).json({
                message: "Acompañante creado",
                acompanante
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Hubo un error al crear el acompañante" });
        }
    };

    static getAll = async (req: Request, res: Response) => {
        try {
            const acompanante = await Acompanante.findAll();
            res.json(acompanante);
        } catch (error) {
            res.status(500).json({ error: "Hubo un error" });
        }
    };

    static getById = async (req: Request, res: Response) => {
        if (!req.acompanante) {
            res.status(404).json({ error: "Acompañante no encontrado" });
            return;
        }
        res.json(req.acompanante);
    };

    static updateById = async (req: Request, res: Response) => {
        if (!req.acompanante) {
            res.status(404).json({ error: "Acompañante no encontrado" });
            return;
        }
        await req.acompanante.update(req.body);
        res.json("Acompañante actualizado correctamente");
    };

    static deleteById = async (req: Request, res: Response) => {
        if (!req.acompanante) {
            res.status(404).json({ error: "Acompañante no encontrado" });
            return;
        }
        await req.acompanante.destroy();
        res.json("Acompanante eliminado correctamente");
    };
}
