import Schema from 'validno'
import type { JsonSpecs, TableFieldItem } from '../types.js'
import validateInput from '../../utils/validate-input.js'

enum Constants {
  Name = 'json',
  Title = 'JSON',
}

const defaultSpecs = (): JsonSpecs => {
  return {
    maxSize: 10 * 1024 * 1024, // in bytes
    mayBeEmpty: true,
  }
}

export const jsonSpecsSchema = new Schema({
  maxSize: {
    type: Number,
    rules: {
      min: 0,
    },
  },
  mayBeEmpty: {
    type: Boolean,
    required: false,
  },
})

class TableFieldJson implements TableFieldItem<JsonSpecs> {
  key: string
  type: string
  title: string
  specs: JsonSpecs

  constructor(key: string, settings: Partial<JsonSpecs> = defaultSpecs()) {
    const combinedSettings: JsonSpecs = { ...defaultSpecs(), ...settings }
    validateInput(jsonSpecsSchema, combinedSettings)

    this.key = key
    this.type = Constants.Name
    this.title = Constants.Title
    this.specs = {
      maxSize: combinedSettings.maxSize,
      mayBeEmpty: combinedSettings.mayBeEmpty,
    }
  }
}

export default TableFieldJson
