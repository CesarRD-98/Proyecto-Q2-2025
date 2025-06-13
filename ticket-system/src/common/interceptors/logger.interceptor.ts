import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url, body, params, query, ip } = req;

    console.log('📝 Request Log =>', {
      method,
      url,
      ip,
      body,
      params,
      query,
      timestamp: new Date().toISOString(),
    });

    return next.handle().pipe(tap(() => {}));
  }
}
