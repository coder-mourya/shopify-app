import prisma from "config/db.config";

export class BannerDao {
    static async getAllBanners() {
        return await prisma.banner.findMany();
    }
    static async createBanner(data: any) {
        return await prisma.banner.create({ data });
    }
    static async updateBanner(id: string, data: any) {
        return await prisma.banner.update({ where: { id }, data });
    }
    static async deleteBanner(id: string) {
        return await prisma.banner.delete({ where: { id } });
    }
    static async updateStatus(id: string, status: boolean) {
        return await prisma.banner.update({ where: { id }, data: { enabled: status } });
    }
}