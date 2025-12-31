import Schema from 'validno'
import type { TableFieldItem, UrlSpecs } from '../types.js'
import validateInput from '../../utils/validate-input.js'

enum Constants {
  Name = 'url',
  Title = 'URL',
}

const defaultSpecs = (): UrlSpecs => {
  return {
    allowedDomains: [],
    exceptDomains: [],
    mayBeEmpty: true,
  }
}

export const urlSpecsSchema = new Schema({
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

class TableFieldUrl implements TableFieldItem<UrlSpecs> {
  key: string
  type: string
  title: string
  specs: UrlSpecs

  constructor(key: string, settings: Partial<UrlSpecs> = defaultSpecs()) {
    const settingsCombined: UrlSpecs = { ...defaultSpecs(), ...settings }
    validateInput(urlSpecsSchema, settingsCombined)

    this.key = key
    this.type = Constants.Name
    this.title = Constants.Title
    this.specs = {
      allowedDomains: settingsCombined.allowedDomains,
      exceptDomains: settingsCombined.exceptDomains,
      mayBeEmpty: settingsCombined.mayBeEmpty,
    }
  }
}

export default TableFieldUrl
