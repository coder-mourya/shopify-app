import prisma from "config/db.config";

export class CartDao {
    static async getAllCarts() {
        return await prisma.cart.findMany();
    }
    static async createCart(data: any) {
        return await prisma.cart.create({ data });
    }

    static async updateCart(id: string, data: any) {
        return await prisma.cart.update({ where: { id }, data });
    }

    static async updateCartEnabledStatus(id: string, type: 'stickyCart' | 'cartDrawer', status: boolean) {
        const data: any = {};
        data[type] = { update: { enabled: status } };

        return await prisma.cart.update({
            where: { id },
            data,
        });
    }

}