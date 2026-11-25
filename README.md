# Adonis Ally Authentik Driver

[![NPM version](https://img.shields.io/npm/v/adonis-ally-authentik)](https://www.npmjs.com/package/adonis-ally-authentik)

An [Authentik](https://goauthentik.io/) driver for [AdonisJS Ally](https://docs.adonisjs.com/guides/auth/social). It lets users log in to your AdonisJS app with their Authentik account.

The driver uses standard OAuth2 and OpenID Connect endpoints. It may also work with other OIDC providers such as Keycloak, but nobody has tested that.

> **Maintenance status:** If you need features such as ID token verification, PKCE or logout, look at [`@aginix/adonis-ally-oidc`](https://www.npmjs.com/package/@aginix/adonis-ally-oidc).

## Compatibility

| Package version | AdonisJS | `@adonisjs/ally` |
| --------------- | -------- | ---------------- |
| 2.x             | 6 and 7  | 5 and 6          |
| 1.x             | 5        | 4                |

## 1. Set up Authentik

1. In the Authentik admin interface, create an **OAuth2/OpenID Provider**.
2. Set **Client type** to **Confidential**.
3. Add your callback URL to **Redirect URIs**, for example `https://your-app.com/authentik/callback`. It must match `AUTHENTIK_CALLBACK_URL` exactly.
4. Create an **Application** and select the provider from step 1.
5. Copy the **Client ID** and **Client Secret** from the provider page.

## 2. Install the package

```bash
npm install adonis-ally-authentik
```

## 3. Configure the package

```bash
node ace configure adonis-ally-authentik
```

This command adds the environment variables to `.env` and their validation rules to `start/env.ts`. Fill them in:

```dotenv
AUTHENTIK_CLIENT_ID=<client id from step 1>
AUTHENTIK_CLIENT_SECRET=<client secret from step 1>
AUTHENTIK_CALLBACK_URL=https://your-app.com/authentik/callback
AUTHENTIK_AUTHORIZE_URL=https://authentik.example.com/application/o/authorize/
AUTHENTIK_ACCESSTOKEN_URL=https://authentik.example.com/application/o/token/
AUTHENTIK_USERINFO_URL=https://authentik.example.com/application/o/userinfo/
```

Replace `authentik.example.com` with the host of your Authentik server. Keep the trailing slashes.

## 4. Register the driver in `config/ally.ts`

```ts
import env from '#start/env'
import { defineConfig } from '@adonisjs/ally'
import type { InferSocialProviders } from '@adonisjs/ally/types'
import { AuthentikDriverService } from 'adonis-ally-authentik'

const allyConfig = defineConfig({
  authentik: AuthentikDriverService({
    driver: 'authentik',
    clientId: env.get('AUTHENTIK_CLIENT_ID'),
    clientSecret: env.get('AUTHENTIK_CLIENT_SECRET'),
    callbackUrl: env.get('AUTHENTIK_CALLBACK_URL'),
    authorizeUrl: env.get('AUTHENTIK_AUTHORIZE_URL'),
    accessTokenUrl: env.get('AUTHENTIK_ACCESSTOKEN_URL'),
    userInfoUrl: env.get('AUTHENTIK_USERINFO_URL'),
  }),
})

export default allyConfig

declare module '@adonisjs/ally/types' {
  interface SocialProviders extends InferSocialProviders<typeof allyConfig> {}
}
```

The `declare module` block gives `ally.use('authentik')` its types.

## 5. Add the routes

```ts
// start/routes.ts
import router from '@adonisjs/core/services/router'

router.get('/authentik/redirect', ({ ally }) => {
  return ally.use('authentik').redirect()
})

router.get('/authentik/callback', async ({ ally }) => {
  const authentik = ally.use('authentik')

  if (authentik.accessDenied()) {
    return 'You cancelled the login'
  }
  if (authentik.stateMisMatch()) {
    return 'The request expired. Please try again'
  }
  if (authentik.hasError()) {
    return authentik.getError()
  }

  const user = await authentik.user()
  // Find or create the user in your database, then log them in.
  return user
})
```

## The user object

`authentik.user()` returns these fields:

| Field                    | Value                                                    |
| ------------------------ | -------------------------------------------------------- |
| `id`                     | The Authentik `sub` claim. Use it as the unique user ID. |
| `email`                  | The `email` claim                                        |
| `name`                   | The `name` claim                                         |
| `preferred_username`     | The `preferred_username` claim                           |
| `nickName`               | The `nickname` claim                                     |
| `emailVerificationState` | Always `'unsupported'`                                   |
| `avatarUrl`              | Always `'unsupported'`                                   |
| `token`                  | The access token, refresh token and expiry               |
| `original`               | The full userinfo response from Authentik                |

The value of `id` depends on the **Subject mode** setting of the Authentik provider. If you change that setting later, the IDs of existing users change too.

If you already have an access token, call `authentik.userFromToken(token)` to get the same fields without a redirect.

## Scopes

The driver requests `openid email profile` by default. To request other scopes, set `scopes` in the config:

```ts
AuthentikDriverService({
  // ...
  scopes: ['openid', 'email', 'profile', 'offline_access'],
})
```

Authentik only returns a claim when the provider has a scope mapping for it.

## Upgrading from 1.x

In 1.x, `id` read the `aud` claim. Authentik does not return `aud` from the userinfo endpoint, so `id` was `undefined`. It now reads `sub`.

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'feat: add some feature'`
4. Push the branch: `git push origin my-new-feature`
5. Open a pull request.

## License

[MIT](LICENSE)
