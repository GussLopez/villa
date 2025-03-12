import type { Request, Response } from "express";
import Invitado from "../models/Invitados";
import Acompanante from "../models/Acompanante";

export class InvitadosController {
    static create = async (req: Request, res: Response) => {
        const { nombre, numero } = req.body;

        try {
            const invitado = new Invitado(req.body);
            await invitado.save();

            res.status(201).json("Invitado creado");
        } catch (error) {
            res.status(500).json({ error: "Hubo un error" });
        }
    };

    static getAll = async (req: Request, res: Response) => {
        try {
            const invitados = await Invitado.findAll();
            res.json(invitados);
        } catch (error) {
            res.status(500).json({ error: "Hubo un error" });
        }
    };

    static getById = async (req: Request, res: Response) => {
        if (!req.invitado) {
            res.status(404).json({ error: "Invitado no encontrado" });
            return;
        }
        res.json(req.invitado);
    };

    static updateById = async (req: Request, res: Response) => {
        if (!req.invitado) {
            res.status(404).json({ error: "Invitado no encontrado" });
            return;
        }
        await req.invitado.update(req.body);
        res.json("Invitado actualizado correctamente");
    };

    static deleteById = async (req: Request, res: Response) => {
        if (!req.invitado) {
            res.status(404).json({ error: "Invitado no encontrado" });
            return;
        }
        await req.invitado.destroy();
        res.json("Invitado eliminado correctamente");
    };


    static getAcompanantes = async (req: Request, res: Response) => {
        const { invitadoId } = req.params;

        try {
            const invitado = await Invitado.findByPk(invitadoId);
            if (!invitado) {
                res.status(404).json({ error: "Invitado no encontrado" });
                return 
            }

            const acompanantes = await Acompanante.findAll({ where: { invitadoId } });

            res.json({
                invitado,
                acompanantes,
                total: acompanantes.length,
                capacidad: invitado.acom,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Hubo un error al obtener los acompañantes" });
        }
    };

    static addAcompanante = async (req: Request, res: Response) => {
        const { invitadoId } = req.params;
        const { nombre, numero } = req.body;

        if (!nombre || !numero) {
            res.status(400).json({ error: "El nombre y número del acompañante son requeridos",});
            return 
        }

        try {
            const invitado = await Invitado.findByPk(invitadoId);
            if (!invitado) {
                res.status(404).json({ error: "Invitado no encontrado" });
                return 
            }

            const acompanantesActuales = await Acompanante.count({
                where: { invitadoId },
            });

            if (acompanantesActuales >= invitado.acom) {
                return 
                res.status(400).json({ error: `El invitado ya tiene el máximo de acompañantes permitidos (${invitado.acom})` });
            }

            const acompanante = await Acompanante.create({ nombre, numero, invitadoId });

            res.status(201).json({ message: "Acompañante agregado exitosamente",
                acompanante,
                acompanantesActuales: acompanantesActuales + 1,
                capacidadMaxima: invitado.acom,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Hubo un error al agregar el acompañante"});
        }
    };

    static removeAcompanante = async (req: Request, res: Response) => {
        const { invitadoId, acompananteId } = req.params;

        try {
            const invitado = await Invitado.findByPk(invitadoId);
            if (!invitado) {
                res.status(404).json({ error: "Invitado no encontrado" });
                return 
            }

            const acompanante = await Acompanante.findOne({where: {
                id: acompananteId,
                invitadoId,
            }});

            if (!acompanante) {
                res.status(404).json({ error: "Acompañante no encontrado o no pertenece a este invitado"});
                return 
            }

            await acompanante.destroy();

            res.json({ message: "Acompañante eliminado exitosamente",acompanantesRestantes: await Acompanante.count({ where: { invitadoId } })});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Hubo un error al eliminar el acompañante" });
        }
    };
}
