import type Configure from '@adonisjs/core/commands/configure'

export async function configure(command: Configure) {
  const codemods = await command.createCodemods()

  await codemods.defineEnvVariables({
    AUTHENTIK_CLIENT_ID: '',
    AUTHENTIK_CLIENT_SECRET: '',
    AUTHENTIK_CALLBACK_URL: '',
    AUTHENTIK_AUTHORIZE_URL: '',
    AUTHENTIK_USERINFO_URL: '',
    AUTHENTIK_ACCESSTOKEN_URL: '',
  })

  await codemods.defineEnvValidations({
    variables: {
      AUTHENTIK_CLIENT_ID: 'Env.schema.string()',
      AUTHENTIK_CLIENT_SECRET: 'Env.schema.string()',
      AUTHENTIK_CALLBACK_URL: 'Env.schema.string()',
      AUTHENTIK_AUTHORIZE_URL: 'Env.schema.string()',
      AUTHENTIK_USERINFO_URL: 'Env.schema.string()',
      AUTHENTIK_ACCESSTOKEN_URL: 'Env.schema.string()',
    },
    leadingComment: 'Variables for adonis-ally-authentik',
  })
}
