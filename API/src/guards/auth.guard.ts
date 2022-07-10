import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class RouteGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.headers.authorization) {
      const auth = `Basic ${request.headers.authorization.split(" ")[1]}`;
      return auth !== process.env.AUTHORIZATION;
    }

    return false;
  }
}
