import KodzeroToValidnoParser from '../KodzeroToValidnoParser.js';
import { TableField, TableFieldAny } from '../kz-schema-factory/types.js';

describe('KodzeroToValidnoParser: url', () => {
    it('should parse basic url field without specs', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'basicUrl',
                    type: 'url',
                    title: 'Basic URL',
                    specs: {
                        allowedDomains: [],
                        exceptDomains: [],
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;

        expect(parsed.basicUrl.type).toBe(String)
        expect(parsed.basicUrl.rules).toBeUndefined()
    })

    it('should parse url field with mayBeEmpty false', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'requiredUrl',
                    type: 'url',
                    title: 'Required URL',
                    specs: {
                        allowedDomains: [],
                        exceptDomains: [],
                        mayBeEmpty: false,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;

        expect(parsed.requiredUrl.type).toBe(String)
        expect(parsed.requiredUrl.rules?.isNot).toBe('')
        // When mayBeEmpty is false but no domain specs, custom function is NOT added
        expect(parsed.requiredUrl.rules?.custom).toBeUndefined()
    })

    it('should parse url field with allowedDomains', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'corporateUrl',
                    type: 'url',
                    title: 'Corporate URL',
                    specs: {
                        allowedDomains: ['company.com', 'company.org'],
                        exceptDomains: [],
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;

        expect(parsed.corporateUrl.type).toBe(String)
        expect(typeof parsed.corporateUrl.rules?.custom).toBe('function')
    })

    it('should parse url field with exceptDomains', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'publicUrl',
                    type: 'url',
                    title: 'Public URL',
                    specs: {
                        allowedDomains: [],
                        exceptDomains: ['spam-site.com', 'malicious.com'],
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;

        expect(parsed.publicUrl.type).toBe(String)
        expect(typeof parsed.publicUrl.rules?.custom).toBe('function')
    })

    it('should parse url field with both allowedDomains and exceptDomains', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'restrictedUrl',
                    type: 'url',
                    title: 'Restricted URL',
                    specs: {
                        allowedDomains: ['company.com'],
                        exceptDomains: ['spam.company.com'],
                        mayBeEmpty: false,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;

        expect(parsed.restrictedUrl.type).toBe(String)
        expect(parsed.restrictedUrl.rules?.isNot).toBe('')
        expect(typeof parsed.restrictedUrl.rules?.custom).toBe('function')
    })

    it('should validate url with allowedDomains - accepted domain', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'corporateUrl',
                    type: 'url',
                    title: 'Corporate URL',
                    specs: {
                        allowedDomains: ['company.com', 'company.org'],
                        exceptDomains: [],
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.corporateUrl.rules?.custom as Function

        const result = customValidator('https://company.com/page', {})
        expect(result.result).toBe(true)
    })

    it('should validate url with allowedDomains - rejected domain', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'corporateUrl',
                    type: 'url',
                    title: 'Corporate URL',
                    specs: {
                        allowedDomains: ['company.com'],
                        exceptDomains: [],
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.corporateUrl.rules?.custom as Function

        const result = customValidator('https://google.com/page', {})
        expect(result.result).toBe(false)
        expect(result.details).toBe('URL domain is not allowed')
    })

    it('should validate url with exceptDomains - rejected domain', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'publicUrl',
                    type: 'url',
                    title: 'Public URL',
                    specs: {
                        allowedDomains: [],
                        exceptDomains: ['spam-site.com'],
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.publicUrl.rules?.custom as Function

        const result = customValidator('https://spam-site.com/page', {})
        expect(result.result).toBe(false)
        expect(result.details).toBe('URL domain is not allowed')
    })

    it('should validate url with exceptDomains - accepted domain', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'publicUrl',
                    type: 'url',
                    title: 'Public URL',
                    specs: {
                        allowedDomains: [],
                        exceptDomains: ['spam-site.com'],
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.publicUrl.rules?.custom as Function

        const result = customValidator('https://google.com/page', {})
        expect(result.result).toBe(true)
    })

    it('should validate url format - invalid url', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'url',
                    type: 'url',
                    title: 'URL',
                    specs: {
                        allowedDomains: ['company.com'],
                        exceptDomains: [],
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.url.rules?.custom as Function

        // Test with a string that doesn't match the domain
        const result = customValidator('https://invalid-domain.com', {})
        expect(result.result).toBe(false)
        expect(result.details).toBe('URL domain is not allowed')
    })

    it('should allow empty url when mayBeEmpty is true', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'optionalUrl',
                    type: 'url',
                    title: 'Optional URL',
                    specs: {
                        allowedDomains: ['company.com'],
                        exceptDomains: [],
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.optionalUrl.rules?.custom as Function

        const result = customValidator('', {})
        expect(result.result).toBe(true)
    })

    it('should validate url with www prefix', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'url',
                    type: 'url',
                    title: 'URL',
                    specs: {
                        allowedDomains: ['company.com'],
                        exceptDomains: [],
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.url.rules?.custom as Function

        const result = customValidator('https://www.company.com/page', {})
        expect(result.result).toBe(true)
    })

    it('should validate url without protocol', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'url',
                    type: 'url',
                    title: 'URL',
                    specs: {
                        allowedDomains: ['company.com'],
                        exceptDomains: [],
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.url.rules?.custom as Function

        const result = customValidator('company.com/page', {})
        expect(result.result).toBe(true)
    })

    it('should validate url domain case-insensitively', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'corporateUrl',
                    type: 'url',
                    title: 'Corporate URL',
                    specs: {
                        allowedDomains: ['Company.COM'],
                        exceptDomains: [],
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.corporateUrl.rules?.custom as Function

        const result = customValidator('https://company.com/page', {})
        expect(result.result).toBe(true)
    })

    it('should parse multiple url fields with different specs', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'basicUrl',
                    type: 'url',
                    title: 'Basic URL',
                    specs: {
                        allowedDomains: [],
                        exceptDomains: [],
                        mayBeEmpty: true,
                    }
                }
            },
            {
                id: 'yyy',
                order: 2,
                isAuto: false,
                item: {
                    key: 'corporateUrl',
                    type: 'url',
                    title: 'Corporate URL',
                    specs: {
                        allowedDomains: ['company.com'],
                        exceptDomains: [],
                        mayBeEmpty: false,
                    }
                }
            },
            {
                id: 'zzz',
                order: 3,
                isAuto: false,
                item: {
                    key: 'publicUrl',
                    type: 'url',
                    title: 'Public URL',
                    specs: {
                        allowedDomains: [],
                        exceptDomains: ['spam-site.com', 'malicious.com'],
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;

        expect(parsed.basicUrl.type).toBe(String)
        expect(parsed.corporateUrl.type).toBe(String)
        expect(parsed.corporateUrl.rules?.isNot).toBe('')
        expect(parsed.publicUrl.type).toBe(String)
        expect(typeof parsed.corporateUrl.rules?.custom).toBe('function')
        expect(typeof parsed.publicUrl.rules?.custom).toBe('function')
    })
})
