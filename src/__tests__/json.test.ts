import KodzeroToValidnoParser from '../KodzeroToValidnoParser.js';
import { TableField, TableFieldAny } from '../kz-schema-factory/types.js';

describe('KodzeroToValidnoParser: json', () => {
    it('should parse basic json field without mayBeEmpty constraint', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'basicJson',
                    type: 'json',
                    title: 'Basic JSON',
                    specs: {
                        maxSize: 10 * 1024 * 1024,
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;

        expect(parsed.basicJson.type).toBe(String)
        expect(typeof parsed.basicJson.rules?.custom).toBe('function')
        expect(parsed.basicJson.rules?.isNot).toBeUndefined()
    })

    it('should parse json field with mayBeEmpty false', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'requiredJson',
                    type: 'json',
                    title: 'Required JSON',
                    specs: {
                        maxSize: 10 * 1024 * 1024,
                        mayBeEmpty: false,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;

        expect(parsed.requiredJson.type).toBe(String)
        expect(parsed.requiredJson.rules?.isNot).toBe('')
        expect(typeof parsed.requiredJson.rules?.custom).toBe('function')
    })

    it('should validate valid JSON object', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'json',
                    type: 'json',
                    title: 'JSON',
                    specs: {
                        maxSize: 10 * 1024 * 1024,
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.json.rules?.custom as Function;

        const validJson = '{"name": "John", "age": 30}';
        const result = customValidator(validJson, {});
        expect(result.result).toBe(true)
        expect(result.details).toBe('')
    })

    it('should validate valid JSON array', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'json',
                    type: 'json',
                    title: 'JSON',
                    specs: {
                        maxSize: 10 * 1024 * 1024,
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.json.rules?.custom as Function;

        const validJson = '[1, 2, 3, "test"]';
        const result = customValidator(validJson, {});
        expect(result.result).toBe(true)
        expect(result.details).toBe('')
    })

    it('should validate valid nested JSON', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'json',
                    type: 'json',
                    title: 'JSON',
                    specs: {
                        maxSize: 10 * 1024 * 1024,
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.json.rules?.custom as Function;

        const validJson = '{"user": {"name": "John", "address": {"city": "NYC"}}}';
        const result = customValidator(validJson, {});
        expect(result.result).toBe(true)
        expect(result.details).toBe('')
    })

    it('should reject invalid JSON - missing quotes', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'json',
                    type: 'json',
                    title: 'JSON',
                    specs: {
                        maxSize: 10 * 1024 * 1024,
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.json.rules?.custom as Function;

        const invalidJson = '{name: "John"}';
        const result = customValidator(invalidJson, {});
        expect(result.result).toBe(false)
        expect(result.details).toBe('Invalid JSON format')
    })

    it('should reject invalid JSON - trailing comma', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'json',
                    type: 'json',
                    title: 'JSON',
                    specs: {
                        maxSize: 10 * 1024 * 1024,
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.json.rules?.custom as Function;

        const invalidJson = '{"name": "John", "age": 30,}';
        const result = customValidator(invalidJson, {});
        expect(result.result).toBe(false)
        expect(result.details).toBe('Invalid JSON format')
    })

    it('should reject invalid JSON - unclosed brace', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'json',
                    type: 'json',
                    title: 'JSON',
                    specs: {
                        maxSize: 10 * 1024 * 1024,
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.json.rules?.custom as Function;

        const invalidJson = '{"name": "John"';
        const result = customValidator(invalidJson, {});
        expect(result.result).toBe(false)
        expect(result.details).toBe('Invalid JSON format')
    })

    it('should reject plain text as invalid JSON', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'json',
                    type: 'json',
                    title: 'JSON',
                    specs: {
                        maxSize: 10 * 1024 * 1024,
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.json.rules?.custom as Function;

        const invalidJson = 'this is not json';
        const result = customValidator(invalidJson, {});
        expect(result.result).toBe(false)
        expect(result.details).toBe('Invalid JSON format')
    })

    it('should validate JSON with special characters', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'json',
                    type: 'json',
                    title: 'JSON',
                    specs: {
                        maxSize: 10 * 1024 * 1024,
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.json.rules?.custom as Function;

        const validJson = '{"message": "Hello\\nWorld", "emoji": "😀"}';
        const result = customValidator(validJson, {});
        expect(result.result).toBe(true)
        expect(result.details).toBe('')
    })

    it('should validate JSON with null values', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'json',
                    type: 'json',
                    title: 'JSON',
                    specs: {
                        maxSize: 10 * 1024 * 1024,
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.json.rules?.custom as Function;

        const validJson = '{"name": null, "age": 30}';
        const result = customValidator(validJson, {});
        expect(result.result).toBe(true)
        expect(result.details).toBe('')
    })

    it('should validate JSON with boolean values', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'json',
                    type: 'json',
                    title: 'JSON',
                    specs: {
                        maxSize: 10 * 1024 * 1024,
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.json.rules?.custom as Function;

        const validJson = '{"isActive": true, "isDeleted": false}';
        const result = customValidator(validJson, {});
        expect(result.result).toBe(true)
        expect(result.details).toBe('')
    })

    it('should validate empty JSON object', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'json',
                    type: 'json',
                    title: 'JSON',
                    specs: {
                        maxSize: 10 * 1024 * 1024,
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.json.rules?.custom as Function;

        const validJson = '{}';
        const result = customValidator(validJson, {});
        expect(result.result).toBe(true)
        expect(result.details).toBe('')
    })

    it('should validate empty JSON array', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'json',
                    type: 'json',
                    title: 'JSON',
                    specs: {
                        maxSize: 10 * 1024 * 1024,
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.json.rules?.custom as Function;

        const validJson = '[]';
        const result = customValidator(validJson, {});
        expect(result.result).toBe(true)
        expect(result.details).toBe('')
    })

    it('should parse multiple json fields with different specs', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'optionalJson',
                    type: 'json',
                    title: 'Optional JSON',
                    specs: {
                        maxSize: 10 * 1024 * 1024,
                        mayBeEmpty: true,
                    }
                }
            },
            {
                id: 'yyy',
                order: 2,
                isAuto: false,
                item: {
                    key: 'requiredJson',
                    type: 'json',
                    title: 'Required JSON',
                    specs: {
                        maxSize: 5 * 1024 * 1024,
                        mayBeEmpty: false,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;

        expect(parsed.optionalJson.type).toBe(String)
        expect(typeof parsed.optionalJson.rules?.custom).toBe('function')
        expect(parsed.optionalJson.rules?.isNot).toBeUndefined()

        expect(parsed.requiredJson.type).toBe(String)
        expect(typeof parsed.requiredJson.rules?.custom).toBe('function')
        expect(parsed.requiredJson.rules?.isNot).toBe('')
    })

    it('should validate JSON with numeric values', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'json',
                    type: 'json',
                    title: 'JSON',
                    specs: {
                        maxSize: 10 * 1024 * 1024,
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.json.rules?.custom as Function;

        const validJson = '{"count": 42, "price": 19.99, "scientific": 1.5e10}';
        const result = customValidator(validJson, {});
        expect(result.result).toBe(true)
        expect(result.details).toBe('')
    })
})
