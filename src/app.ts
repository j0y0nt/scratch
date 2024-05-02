import express, {NextFunction, json, urlencoded} from "express";
import {Response as ExResponse, Request as ExRequest } from 'express';
import { RegisterRoutes } from "../build/routes";
import swaggerUi from "swagger-ui-express";
import { ValidateError } from "tsoa";

export const app = express();

app.use(
    urlencoded({
        extended: true,
    })
);
app.use(json());

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
    return res.send(
        swaggerUi.generateHTML(await import("../build/swagger.json"))
    );
});
RegisterRoutes(app);

app.use(function notFoundHandler(_req, res: ExResponse) {
    res.status(404).send({
        messgae: "Resource not found."
    });
});

app.use(function errorHandler(
    err: unknown,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction
): ExResponse | void {

    if(err instanceof ValidateError) {
        console.warn(`Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
            message: "Valdiation Error",
            details: err?.fields,
        });
    }

    if (err instanceof Error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }

    next();
});