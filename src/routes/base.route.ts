import { Router } from "hyper-express";

abstract class BaseRoute {
  route: Router = new Router();

  abstract initializeRoutes(): void;
}

export default BaseRoute;
