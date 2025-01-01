The package has been configured successfully!

Make sure to first define the mapping inside the `config/ally.ts` file as follows.

```ts
import { AuthentikDriverService } from 'adonis-ally-authentik'

const allyConfig = defineConfig({
  authentik: AuthentikDriverService({
    driver: 'authentik',
    clientId: env.get('AUTHENTIK_CLIENT_ID', ''),
    clientSecret: env.get('AUTHENTIK_CLIENT_SECRET', ''),
    callbackUrl: env.get('AUTHENTIK_CALLBACK_URL', ''),
    authorizeUrl: env.get('AUTHENTIK_AUTHORIZE_URL', ''),
    accessTokenUrl: env.get('AUTHENTIK_ACCESSTOKEN_URL', ''),
    userInfoUrl: env.get('AUTHENTIK_USERINFO_URL', ''),
  })
})
```
