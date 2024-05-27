import { PassedInitialConfig } from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
  config: {
              authority: 'http://localhost:9000/oauth2/authority',
              redirectUrl: window.location.origin,
              postLogoutRedirectUri: window.location.origin,
              clientId: 'airqualityhome-app',
              scope: 'openid offline_access api', // 'openid profile offline_access ' + your scopes
              responseType: 'code',
              silentRenew: true,
              silentRenewUrl: `${window.location.origin}/silent-renew.html`,
              useRefreshToken: true,
              renewTimeBeforeTokenExpiresInSeconds: 30
          }
}
