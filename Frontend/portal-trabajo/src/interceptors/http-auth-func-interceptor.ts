import { HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';

const routesToIgnore: string[] = ['/login', '/ofertas/activas'];

export function authInterceptor( req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log(req.url);
  if (intercept(req)) {
    console.log('request intercepted');
    const modifiedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    //console.log(modifiedRequest);
    // Pass the modified request to the next handler in the chain
    return next(modifiedRequest);
  }

  console.log('request not intercepted');
  return next(req);
}

function intercept(req: HttpRequest<unknown>): boolean {
  for (let r of routesToIgnore) {
    if (req.url.indexOf(r) > 0) return false;
  }
  return true;
}