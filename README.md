# Adonis Ally Authentik Driver
[![NPM version](https://img.shields.io/npm/v/adonis-ally-authentik
)](https://www.npmjs.com/package/adonis-ally-authentik)

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

### 3. Validate environment variables

```ts
AUTHENTIK_CLIENT_ID: Env.schema.string(),
AUTHENTIK_CLIENT_SECRET: Env.schema.string(),
AUTHENTIK_CALLBACK_URL: Env.schema.string(),
AUTHENTIK_AUTHORIZE_URL: Env.schema.string(),
AUTHENTIK_USERINFO_URL: Env.schema.string(),
AUTHENTIK_ACCESSTOKEN_URL: Env.schema.string(),
```

### 4. Add variables to your ally configuration

```ts
const allyConfig: AllyConfig = {
  // ... other drivers
  authentik: {
    driver: 'authentik',
    clientId: Env.get('AUTHENTIK_CLIENT_ID'),
    clientSecret: Env.get('AUTHENTIK_CLIENT_SECRET'),
    callbackUrl: Env.get('AUTHENTIK_CALLBACK_URL'),
    authorizeUrl: Env.get('AUTHENTIK_AUTHORIZE_URL'),
    userInfoUrl: Env.get('AUTHENTIK_USERINFO_URL'),
    accessTokenUrl: Env.get('AUTHENTIK_ACCESSTOKEN_URL'),
  },
}
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
