import Schema from 'validno'
import validateInput from '../../utils/validate-input.js'
import { RelationSpecs, TableFieldItem } from '../types.js'

enum Constants {
  Name = 'relation',
  Title = 'Связанные записи',
}

const defaultSpecs = (): RelationSpecs => {
  return {
    collection: '',
    multiple: false,
    mayBeEmpty: true,
  }
}

export const relationSpecsSchema = new Schema({
  collection: {
    type: String,
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

class TableFieldRelation implements TableFieldItem<RelationSpecs> {
  key: string
  type: string
  title: string
  specs: RelationSpecs

  constructor(key: string, settings: Partial<RelationSpecs> = defaultSpecs()) {
    const settingsCombined: RelationSpecs = { ...defaultSpecs(), ...settings }
    validateInput(relationSpecsSchema, settingsCombined)

    this.key = key
    this.type = Constants.Name
    this.title = Constants.Title

    this.specs = {
      collection: settingsCombined.collection,
      multiple: settingsCombined.multiple,
      mayBeEmpty: settingsCombined.mayBeEmpty,
    }
  }
}

export default TableFieldRelation
