import KodzeroToValidnoParser from '../KodzeroToValidnoParser.js';
import { TableField, TableFieldAny } from '../kz-schema-factory/types.js';

describe('KodzeroToValidnoParser: number', () => {
    it('should parse basic number field without specs', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'basicNumber',
                    type: 'number',
                    title: 'Basic Number',
                    specs: {
                        min: -Infinity,
                        max: Infinity,
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const validnoSchema = {
            basicNumber: { type: Number, rules: { min: -Infinity, max: Infinity } },
        }

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema);

        expect(validnoSchema).toEqual(parsed)
    })

    it('should parse number field with min value', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'minNumber',
                    type: 'number',
                    title: 'Number with Min',
                    specs: {
                        min: 0,
                        max: Infinity,
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const validnoSchema = {
            minNumber: { type: Number, rules: { min: 0, max: Infinity } },
        }

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema);

        expect(validnoSchema).toEqual(parsed)
    })

    it('should parse number field with max value', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'maxNumber',
                    type: 'number',
                    title: 'Number with Max',
                    specs: {
                        min: -Infinity,
                        max: 100,
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const validnoSchema = {
            maxNumber: { type: Number, rules: { min: -Infinity, max: 100 } },
        }

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema);

        expect(validnoSchema).toEqual(parsed)
    })

    it('should parse number field with min and max values', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'boundedNumber',
                    type: 'number',
                    title: 'Number with Min and Max',
                    specs: {
                        min: 1,
                        max: 100,
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const validnoSchema = {
            boundedNumber: { type: Number, rules: { min: 1, max: 100 } },
        }

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema);

        expect(validnoSchema).toEqual(parsed)
    })

    it('should parse number field with mayBeEmpty false', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'requiredNumber',
                    type: 'number',
                    title: 'Required Number',
                    specs: {
                        min: -Infinity,
                        max: Infinity,
                        mayBeEmpty: false,
                    }
                }
            },
        ]

        const validnoSchema = {
            requiredNumber: { type: Number, rules: { min: -Infinity, max: Infinity, isNot: 0 } },
        }

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema);

        expect(validnoSchema).toEqual(parsed)
    })

    it('should parse number field with negative min value', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'negativeNumber',
                    type: 'number',
                    title: 'Number with Negative Min',
                    specs: {
                        min: -100,
                        max: Infinity,
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const validnoSchema = {
            negativeNumber: { type: Number, rules: { min: -100, max: Infinity } },
        }

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema);

        expect(validnoSchema).toEqual(parsed)
    })

    it('should parse number field with all specs combined', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'fullSpecNumber',
                    type: 'number',
                    title: 'Number with All Specs',
                    specs: {
                        min: 1,
                        max: 999,
                        mayBeEmpty: false,
                    }
                }
            },
        ]

        const validnoSchema = {
            fullSpecNumber: { type: Number, rules: { min: 1, max: 999, isNot: 0 } },
        }

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema);

        expect(validnoSchema).toEqual(parsed)
    })

    it('should parse number field for age scenario', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'age',
                    type: 'number',
                    title: 'Age',
                    specs: {
                        min: 0,
                        max: 150,
                        mayBeEmpty: false,
                    }
                }
            },
        ]

        const validnoSchema = {
            age: { type: Number, rules: { min: 0, max: 150, isNot: 0 } },
        }

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema);

        expect(validnoSchema).toEqual(parsed)
    })

    it('should parse number field for percentage scenario', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'percentage',
                    type: 'number',
                    title: 'Percentage',
                    specs: {
                        min: 0,
                        max: 100,
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const validnoSchema = {
            percentage: { type: Number, rules: { min: 0, max: 100 } },
        }

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema);

        expect(validnoSchema).toEqual(parsed)
    })

    it('should parse multiple number fields with different specs', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'basicNumber',
                    type: 'number',
                    title: 'Basic Number',
                    specs: {
                        min: -Infinity,
                        max: Infinity,
                        mayBeEmpty: true,
                    }
                }
            },
            {
                id: 'yyy',
                order: 2,
                isAuto: false,
                item: {
                    key: 'positiveNumber',
                    type: 'number',
                    title: 'Positive Number',
                    specs: {
                        min: 1,
                        max: Infinity,
                        mayBeEmpty: false,
                    }
                }
            },
            {
                id: 'zzz',
                order: 3,
                isAuto: false,
                item: {
                    key: 'score',
                    type: 'number',
                    title: 'Score',
                    specs: {
                        min: 0,
                        max: 100,
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const validnoSchema = {
            basicNumber: { type: Number, rules: { min: -Infinity, max: Infinity } },
            positiveNumber: { type: Number, rules: { min: 1, max: Infinity, isNot: 0 } },
            score: { type: Number, rules: { min: 0, max: 100 } },
        }

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema);

        expect(validnoSchema).toEqual(parsed)
    })

    it('should parse number field with zero as min value', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'nonNegativeNumber',
                    type: 'number',
                    title: 'Non-negative Number',
                    specs: {
                        min: 0,
                        max: Infinity,
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const validnoSchema = {
            nonNegativeNumber: { type: Number, rules: { min: 0, max: Infinity } },
        }

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema);

        expect(validnoSchema).toEqual(parsed)
    })

    it('should parse number field for temperature scenario with negative range', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'temperature',
                    type: 'number',
                    title: 'Temperature (Celsius)',
                    specs: {
                        min: -50,
                        max: 50,
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const validnoSchema = {
            temperature: { type: Number, rules: { min: -50, max: 50 } },
        }

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema);

        expect(validnoSchema).toEqual(parsed)
    })
})
