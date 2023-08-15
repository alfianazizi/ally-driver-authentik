The package has been configured successfully!

Make sure to first define the mapping inside the `contracts/ally.ts` file as follows.

```ts
import { AuthentikDriver, AuthentikDriverConfig } from 'adonis-ally-authentik/build/standalone'

declare module '@ioc:Adonis/Addons/Ally' {
  interface SocialProviders {
    // ... other mappings
    yourDriver: {
      config: AuthentikDriverConfig
      implementation: AuthentikDriver
    }
  }
}
```
