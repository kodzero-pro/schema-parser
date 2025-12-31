import type Schema from 'validno'

const validateInput = (schema: InstanceType<typeof Schema>, settings: unknown) => {
  const validation = schema.validate(settings)

  if (!validation.ok) {
    throw new Error(`Invalid settings for TableFieldNumber: ${validation.errors}`)
  }
}

export default validateInput
