import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AuthentikDriverProvider {
  constructor(protected app: ApplicationContract) {}

  public async boot() {
    const Ally = this.app.container.resolveBinding('Adonis/Addons/Ally')
    const { AuthentikDriver } = await import('../src/AuthentikDriver')

    Ally.extend('authentik', (_, __, config, ctx) => {
      return new AuthentikDriver(ctx, config)
    })
  }
}
