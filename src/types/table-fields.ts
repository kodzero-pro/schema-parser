export interface TableFieldItem<S = Record<string, unknown>> {
  key: string
  type: string
  title: string
  specs: S
}
