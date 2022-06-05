import bodyParser from 'body-parser';
import compress from 'compression';
//import errorHandler from "errorhandler";
import express, { NextFunction, Request, Response } from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';
import httpStatus from 'http-status';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
//import Logger from "../../../Contexts/Shared/domain/Logger";
//import container from "./dependency-injection";
import { registerRoutes } from './routes';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export class Server {
    private express: express.Express;
    private port: string;
    //private logger: Logger;
    private httpServer?: http.Server;

    constructor(port: string) {
        this.port = port;
        //this.logger = container.get("Shared.Logger");
        this.express = express();
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(helmet.xssFilter());
        this.express.use(helmet.noSniff());
        this.express.use(helmet.hidePoweredBy());
        this.express.use(helmet.frameguard({ action: 'deny' }));
        this.express.use(compress());
        const router = Router();
        //router.use(errorHandler());
        this.express.use(router);

        registerRoutes(router);

        router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            //this.logger.error(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
        });

        this.connectDatabase();
        this.startApolloServer(typeDefs, resolvers);
    }

    async startApolloServer(typeDefs: any, resolvers: any) {
        const httpServer = http.createServer(this.express);
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            csrfPrevention: true,
            plugins: [
                ApolloServerPluginDrainHttpServer({ httpServer }),
                ApolloServerPluginLandingPageGraphQLPlayground(),
            ],
            introspection: true,
        });
        await server.start();
        server.applyMiddleware({ app: this.express });
        await new Promise<void>((resolve) => httpServer.listen({ port: 4001 }, resolve));
        console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`);
    }

    async connectDatabase() {
        try {
            await mongoose.connect(process.env.Mongo_Connect as string);
        } catch (e) {
            console.log(e);
        }
    }

    async listen(): Promise<void> {
        return new Promise((resolve) => {
            this.httpServer = this.express.listen(this.port, () => {
                // this.logger.info(
                //   `  Mock Backend App is running at http://localhost:${
                //     this.port
                //   } in ${this.express.get("env")} mode`
                // );
                // this.logger.info("  Press CTRL-C to stop\n");
                resolve();
            });
        });
    }

    getHTTPServer() {
        return this.httpServer;
    }

    async stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.httpServer) {
                this.httpServer.close((error) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve();
                });
            }

            return resolve();
        });
    }
}
