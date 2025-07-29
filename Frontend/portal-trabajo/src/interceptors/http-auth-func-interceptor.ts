import { HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';

const routesToIgnore: string[] = ['/login', '/ofertas/activas'];

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  try {
    console.log(req.url);
    if (intercept(req)) {
      const modifiedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      //console.log(modifiedRequest);
      // Pass the modified request to the next handler in the chain
      return next(modifiedRequest);
    }
    
    return next(req);
  } catch (e) {
    console.log('Error en http auth intercept', e);
    return next(req);
  }
}

function intercept(req: HttpRequest<unknown>): boolean {
  for (let r of routesToIgnore) {
    if (req.url.indexOf(r) > 0) return false;
  }
  return true;
}