import Schema from 'validno'
import type { NumberSpecs, TableFieldItem } from '../types.js'
import validateInput from '../../utils/validate-input.js'

enum Constants {
  Name = 'number',
  Title = 'Число',
}

const defaultSpecs = (): NumberSpecs => {
  return {
    min: -Infinity,
    max: Infinity,
    mayBeEmpty: true,
  }
}

export const numberSpecsSchema = new Schema({
  min: {
    type: [Number, null],
  },
  max: {
    type: [Number, null],
  },
  mayBeEmpty: {
    type: Boolean,
    required: false,
  },
})

class TableFieldNumber implements TableFieldItem<NumberSpecs> {
  key: string
  type: string
  title: string
  specs: NumberSpecs

  constructor(key: string, settings: Partial<NumberSpecs> = defaultSpecs()) {
    const combinedSettings: NumberSpecs = { ...defaultSpecs(), ...settings }
    validateInput(numberSpecsSchema, combinedSettings)

    this.key = key
    this.type = Constants.Name
    this.title = Constants.Title
    this.specs = {
      min: combinedSettings.min,
      max: combinedSettings.max,
      mayBeEmpty: combinedSettings.mayBeEmpty,
    }
  }
}

export default TableFieldNumber
