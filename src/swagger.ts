// src/swagger.ts
import swaggerAutogen from "swagger-autogen";

import { swaggerSchemas } from "./doc/schemas";

const isProduction = process.env.NODE_ENV === "production";

const doc = {
    info: {
        title: "Shop bolt",
        description: "Automatically generated Swagger documentation",
    },
    host: isProduction ? "" : "localhost:5000",
    schemes: isProduction ? ["http"] : ["http"],
    basePath: "/api",
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
        {
            name: "User",
            description: "User-related endpoints",
        },
    ],
    securityDefinitions: {
        BearerAuth: {
            type: "apiKey",
            in: "header",
            name: "Authorization",
            description: "Enter your token as 'Bearer <TOKEN>'",
        },
    },

    security: [{ BearerAuth: [] }],

};

(doc as any).definitions = {
    // badge
    createBadgeSchema: swaggerSchemas.createBadgeSchema,
    updateBadgeSchema: swaggerSchemas.updateBadgeSchema,
    updateBadgeStatusSchema: swaggerSchemas.updateBadgeStatusSchema
};


const outputFile = "./src/swagger.json";
// const routes = ["./src/app.ts"];
const endpointsFiles = ["./src/routes/index.ts", "./src/validation/*.ts"];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
    // import("./app"); // Start the app after generating Swagger JSON
    console.log("Swagger JSON generated");
});
