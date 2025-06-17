import { Request, Response } from "express";
import { TimerDAO } from "dao/timer.dao";
import { RESPONSE_MESSAGES } from "constants/response";
import { updateStatus } from "validations/badgeValidation";

const timerController = {
    createTimer: async (req: Request, res: Response): Promise<void> => {
        try {
            const {
                name,
                endTime,
                style,
                position,
                backgroundColor,
                textColor,
                fontSize,
                showDays,
                showHours,
                showMinutes,
                showSeconds,
                products
            } = req.body;

            const data = {
                name,
                endTime,
                style,
                position,
                backgroundColor,
                textColor,
                fontSize,
                showDays,
                showHours,
                showMinutes,
                showSeconds,
                products
            };
            await TimerDAO.createTimer(data);
            res.status(201).json(RESPONSE_MESSAGES.SUCCESS.TIMER_CREATED);
        } catch (error) {
            console.log(error);
            res.status(500).json(RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
        }
    },

    updateTimer: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const {
                name,
                endTime,
                style,
                position,
                backgroundColor,
                textColor,
                fontSize,
                showDays,
                showHours,
                showMinutes,
                showSeconds,
                products
            } = req.body;

            const data = {
                name,
                endTime,
                style,
                position,
                backgroundColor,
                textColor,
                fontSize,
                showDays,
                showHours,
                showMinutes,
                showSeconds,
                products
            };
            await TimerDAO.updateTimer(id, data);
            res.status(202).json(RESPONSE_MESSAGES.SUCCESS.TIMER_UPDATED);
        } catch (error) {
            console.log(error);
            res.status(500).json(RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
        }
    },

    updateStatus: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            await TimerDAO.updateTimerStatus(id, status);
            res.status(202).json(RESPONSE_MESSAGES.SUCCESS.TIMER_STATUS_UPDATED);
        } catch (error) {
            console.log(error);
            res.status(500).json(RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
        }
    },

    deleteTimer: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            await TimerDAO.deleteTimer(id);
            res.status(200).json(RESPONSE_MESSAGES.SUCCESS.TIMER_DELETED);
        } catch (error) {
            console.log(error);
            res.status(500).json(RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
        }
    },

    getTimer: async (req: Request, res: Response): Promise<void> => {
        try {
            const timers = await TimerDAO.getTimer();
            res.status(200).json(RESPONSE_MESSAGES.SUCCESS.FETCH_TIMER(timers));
        } catch (error) {
            console.log(error);
            res.status(500).json(RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
        }
    }
}

export default timerController;