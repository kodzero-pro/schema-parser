import Schema from 'validno'
import type { StringSpecs, TableFieldItem } from '../types.js'
import validateInput from '../../utils/validate-input.js'

enum Constants {
  Name = 'string',
  Title = 'Текст',
}

const defaultSpecs = (): StringSpecs => {
  return {
    lengthMin: null,
    lengthMax: null,
    mayBeEmpty: true,
    pattern: null,
  }
}

export const stringSpecsSchema = new Schema({
  lengthMin: {
    type: [Number, null],
  },
  lengthMax: {
    type: [Number, null],
  },
  mayBeEmpty: {
    type: Boolean,
    required: false,
  },
  pattern: {
    type: [String, null],
    required: false,
  },
})

class TableFieldString implements TableFieldItem<StringSpecs> {
  key: string
  type: string
  title: string
  specs: StringSpecs

  constructor(key: string, settings: Partial<StringSpecs> = defaultSpecs()) {
    const settingsCombined: StringSpecs = { ...defaultSpecs(), ...settings }
    validateInput(stringSpecsSchema, settingsCombined)

    this.key = key
    this.type = Constants.Name
    this.title = Constants.Title

    this.specs = {
      lengthMin: settingsCombined.lengthMin,
      lengthMax: settingsCombined.lengthMax,
      pattern: settingsCombined.pattern,
      mayBeEmpty: settingsCombined.mayBeEmpty,
    }
  }
}

export default TableFieldString
