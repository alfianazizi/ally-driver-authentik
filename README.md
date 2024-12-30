# Adonis Ally Authentik Driver

[![NPM version](https://img.shields.io/npm/v/adonis-ally-authentik)](https://www.npmjs.com/package/adonis-ally-authentik)

[Authentik](https://goauthentik.io/) driver for [AdonisJS Ally](https://docs.adonisjs.com/guides/auth/social)

You can test this for another IdP like Keycloak i guess (not tested)

## Getting started

### 1. Install the package

Install the package from your command line.

```bash
npm install --save adonis-ally-authentik
```

or

```bash
yarn add adonis-ally-authentik
```

### 2. Configure the package

```bash
node ace configure adonis-ally-authentik
```

### 3. Register the service inside the configuration file `config/ally.ts`

```ts
// config/ally.ts
import { defineConfig } from '@adonisjs/ally'
import { AuthentikDriver } from 'adonis-ally-authentik'
import env from '#start/env'

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

## Scopes

The default scopes is "openid email profile", you can define it on the config with `scopes`

## Contributing

1. Fork the repo
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'feat: Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## License

[MIT](LICENSE)
