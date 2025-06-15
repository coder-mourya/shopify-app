import prisma from "config/db.config";

export class BadgeDao {
    static  async createBadge(data: any){
        return await prisma.badges.create({ data });
    }

    static async getAllBadges(){
        return await prisma.badges.findMany();
    }

    static async updateBadge(id: string, data: any){
        return await prisma.badges.update({ where: { id }, data });
    }
    static async deleteBadge(id: string){
        return await prisma.badges.delete({ where: { id } });
    }
    static async updateStatus(id: string, status: boolean){
        return await prisma.badges.update({ where: { id }, data: { enabled: status } });
    }
}