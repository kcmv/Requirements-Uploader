import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
@Injectable()
export class DocumentInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request.body.field_id) {
      request.body.field_id = parseInt(request.body.field_id);
    }

    return next.handle().pipe();
  }
}
