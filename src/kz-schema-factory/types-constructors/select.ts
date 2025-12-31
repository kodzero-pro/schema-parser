import Schema from 'validno'
import type { SelectSpecs, TableFieldItem } from '../types.js'
import validateInput from '../../utils/validate-input.js'

enum Constants {
  Name = 'select',
  Title = 'Список',
}

const defaultSpecs = (): SelectSpecs => {
  return {
    multiple: false,
    mayBeEmpty: true,
    allowedValues: [],
  }
}

export const selectSpecsSchema = new Schema({
  allowedValues: {
    type: Array,
    eachType: String,
    required: false,
  },
  multiple: {
    type: Boolean,
    required: false,
  },
  mayBeEmpty: {
    type: Boolean,
    required: false,
  },
})

class TableFieldSelect implements TableFieldItem<SelectSpecs> {
  key: string
  type: string
  title: string
  specs: SelectSpecs

  constructor(key: string, settings: Partial<SelectSpecs> = defaultSpecs()) {
    const settingsCombined: SelectSpecs = { ...defaultSpecs(), ...settings }
    validateInput(selectSpecsSchema, settingsCombined)

    this.key = key
    this.type = Constants.Name
    this.title = Constants.Title
    this.specs = {
      allowedValues: settingsCombined.allowedValues,
      multiple: settingsCombined.multiple,
      mayBeEmpty: settingsCombined.mayBeEmpty,
    }
  }
}

export default TableFieldSelect
