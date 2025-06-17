import prisma from "config/db.config";

export class TimerDAO {
    static async getTimer() {
        return await prisma.timer.findMany();
    }
    static async createTimer(data: any) {
        return await prisma.timer.create({ data });
    }

    static async updateTimer(id: string, data: any) {
        return await prisma.timer.update({ where: { id }, data });
    }
    static async updateTimerStatus(id: string, status: boolean) {
        return await prisma.timer.update({ where: { id }, data: { enabled: status } });
    }
    static async deleteTimer(id: string) {
        return await prisma.timer.delete({ where: { id } });
    }
}