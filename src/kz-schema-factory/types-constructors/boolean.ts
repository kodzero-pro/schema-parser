import Schema from 'validno'
import type { BooleanSpecs, TableFieldItem } from '../types.js'
import validateInput from '../../utils/validate-input.js'

enum Constants {
  Name = 'boolean',
  Title = 'Да/Нет',
}

const defaultSpecs = (): BooleanSpecs => {
  return {
    onlyTrue: false,
  }
}

export const booleanSpecsSchema = new Schema({
  onlyTrue: {
    type: Boolean,
  },
})

class TableFieldBoolean implements TableFieldItem<BooleanSpecs> {
  key: string
  type: string
  title: string
  specs: BooleanSpecs

  constructor(key: string, settings: Partial<BooleanSpecs> = defaultSpecs()) {
    const combinedSettings: BooleanSpecs = { ...defaultSpecs(), ...settings }
    validateInput(booleanSpecsSchema, combinedSettings)

    this.key = key
    this.type = Constants.Name
    this.title = Constants.Title
    this.specs = {
      onlyTrue: combinedSettings.onlyTrue,
    }
  }
}

export default TableFieldBoolean
