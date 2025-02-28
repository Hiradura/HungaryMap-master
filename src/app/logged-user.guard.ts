import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export const loggedUserGuard: CanActivateFn = async (route, state) => {
  const authservice = inject(AuthService);
  
  const user = await firstValueFrom(authservice.getCurrentUser());
  
  return !!user;
};
