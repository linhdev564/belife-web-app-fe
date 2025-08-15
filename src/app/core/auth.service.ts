import { Injectable } from '@angular/core';
import { SessionInfo } from './models/session-info.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private storageSessionKey = 'sessionInfo';
  constructor() { }

  
  isLoggedIn(): boolean {
    const session = this.getSessionInfo();
    var sessionId = session?.sessionId;
    return !!session?.sessionId;
  }

  getSessionInfo(): SessionInfo | null {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const json = localStorage.getItem(this.storageSessionKey);
      try {
        return json ? (JSON.parse(json) as SessionInfo) : null;
      } catch {
        console.error('Invalid session data in localStorage');
        return null;
      }
    }
    return null;
  }

  setSessionInfo(info: SessionInfo): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageSessionKey, JSON.stringify(info));
    }
  }

  clearSession(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.storageSessionKey);
    }
  }
}
