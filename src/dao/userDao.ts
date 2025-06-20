import prisma from "config/db.config";
import bcrypt from "bcrypt";



export class UserDAO {
    static async findById(id: string) {
        return await prisma.user.findUnique({ where: { id } });
    }

    static async upsertShop({ shop, accessToken }: { shop: string, accessToken: string }) {
        return await prisma.user.upsert({
            where: { shop },
            update: { accessToken },
            create: { shop, accessToken }
        })
    }
}
