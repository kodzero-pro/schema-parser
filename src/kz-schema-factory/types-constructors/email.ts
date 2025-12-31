import Schema from 'validno'
import type { EmailSpecs, TableFieldItem } from '../types.js'
import validateInput from '../../utils/validate-input.js'

enum Constants {
  Name = 'email',
  Title = 'Email',
}

const defaultSpecs = (): EmailSpecs => {
  return {
    allowedDomains: [],
    exceptDomains: [],
    mayBeEmpty: true,
  }
}

export const emailSpecsSchema = new Schema({
  allowedDomains: {
    type: Array,
    eachType: String,
    required: false,
  },
  exceptDomains: {
    type: Array,
    eachType: String,
    required: false,
  },
  mayBeEmpty: {
    type: Boolean,
    required: false,
  },
})

class TableFieldEmail implements TableFieldItem<EmailSpecs> {
  key: string
  type: string
  title: string
  specs: EmailSpecs

  constructor(key: string, settings: Partial<EmailSpecs> = defaultSpecs()) {
    const combinerSettings: EmailSpecs = { ...defaultSpecs(), ...settings }
    validateInput(emailSpecsSchema, combinerSettings)

    this.key = key
    this.type = Constants.Name
    this.title = Constants.Title
    this.specs = {
      allowedDomains: combinerSettings.allowedDomains,
      exceptDomains: combinerSettings.exceptDomains,
      mayBeEmpty: combinerSettings.mayBeEmpty,
    }
  }
}

export default TableFieldEmail
