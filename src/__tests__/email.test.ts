import KodzeroToValidnoParser from '../KodzeroToValidnoParser.js';
import { TableField, TableFieldAny } from '../kz-schema-factory/types.js';

describe('KodzeroToValidnoParser: email', () => {
    it('should parse basic email field without specs', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'basicEmail',
                    type: 'email',
                    title: 'Basic Email',
                    specs: {
                        allowedDomains: [],
                        exceptDomains: [],
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;

        expect(parsed.basicEmail.type).toBe(String)
        expect(typeof parsed.basicEmail.rules?.custom).toBe('function')
    })

    it('should parse email field with mayBeEmpty false', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'requiredEmail',
                    type: 'email',
                    title: 'Required Email',
                    specs: {
                        allowedDomains: [],
                        exceptDomains: [],
                        mayBeEmpty: false,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;

        expect(parsed.requiredEmail.type).toBe(String)
        expect(parsed.requiredEmail.rules?.isNot).toBe('')
        // When mayBeEmpty is false AND no domain specs, custom function is NOT added
        expect(parsed.requiredEmail.rules?.custom).toBeUndefined()
    })

    it('should parse email field with allowedDomains', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'corporateEmail',
                    type: 'email',
                    title: 'Corporate Email',
                    specs: {
                        allowedDomains: ['company.com', 'company.org'],
                        exceptDomains: [],
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;

        expect(parsed.corporateEmail.type).toBe(String)
        expect(typeof parsed.corporateEmail.rules?.custom).toBe('function')
    })

    it('should parse email field with exceptDomains', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'publicEmail',
                    type: 'email',
                    title: 'Public Email',
                    specs: {
                        allowedDomains: [],
                        exceptDomains: ['temp-mail.com', 'disposable.com'],
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;

        expect(parsed.publicEmail.type).toBe(String)
        expect(typeof parsed.publicEmail.rules?.custom).toBe('function')
    })

    it('should parse email field with both allowedDomains and exceptDomains', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'restrictedEmail',
                    type: 'email',
                    title: 'Restricted Email',
                    specs: {
                        allowedDomains: ['company.com'],
                        exceptDomains: ['spam.company.com'],
                        mayBeEmpty: false,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;

        expect(parsed.restrictedEmail.type).toBe(String)
        expect(parsed.restrictedEmail.rules?.isNot).toBe('')
        expect(typeof parsed.restrictedEmail.rules?.custom).toBe('function')
    })

    it('should validate email with allowedDomains - accepted domain', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'corporateEmail',
                    type: 'email',
                    title: 'Corporate Email',
                    specs: {
                        allowedDomains: ['company.com', 'company.org'],
                        exceptDomains: [],
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.corporateEmail.rules?.custom as Function

        const result = customValidator('user@company.com', {})
        expect(result.result).toBe(true)
    })

    it('should validate email with allowedDomains - rejected domain', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'corporateEmail',
                    type: 'email',
                    title: 'Corporate Email',
                    specs: {
                        allowedDomains: ['company.com'],
                        exceptDomains: [],
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.corporateEmail.rules?.custom as Function

        const result = customValidator('user@gmail.com', {})
        expect(result.result).toBe(false)
        expect(result.details).toBe('Email domain is not allowed')
    })

    it('should validate email with exceptDomains - rejected domain', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'publicEmail',
                    type: 'email',
                    title: 'Public Email',
                    specs: {
                        allowedDomains: [],
                        exceptDomains: ['temp-mail.com'],
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.publicEmail.rules?.custom as Function

        const result = customValidator('user@temp-mail.com', {})
        expect(result.result).toBe(false)
        expect(result.details).toBe('Email domain is not allowed')
    })

    it('should validate email with exceptDomains - accepted domain', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'publicEmail',
                    type: 'email',
                    title: 'Public Email',
                    specs: {
                        allowedDomains: [],
                        exceptDomains: ['temp-mail.com'],
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.publicEmail.rules?.custom as Function

        const result = customValidator('user@gmail.com', {})
        expect(result.result).toBe(true)
    })

    it('should validate email format - invalid email', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'email',
                    type: 'email',
                    title: 'Email',
                    specs: {
                        allowedDomains: [],
                        exceptDomains: [],
                        mayBeEmpty: true,  // Changed to true so custom function is added
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.email.rules?.custom as Function

        const result = customValidator('invalid-email', {})
        expect(result.result).toBe(false)
        expect(result.details).toBe('Invalid email format')
    })

    it('should allow empty email when mayBeEmpty is true', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'optionalEmail',
                    type: 'email',
                    title: 'Optional Email',
                    specs: {
                        allowedDomains: ['company.com'],
                        exceptDomains: [],
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.optionalEmail.rules?.custom as Function

        const result = customValidator('', {})
        expect(result.result).toBe(true)
    })

    it('should parse multiple email fields with different specs', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'basicEmail',
                    type: 'email',
                    title: 'Basic Email',
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
                    key: 'corporateEmail',
                    type: 'email',
                    title: 'Corporate Email',
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
                    key: 'publicEmail',
                    type: 'email',
                    title: 'Public Email',
                    specs: {
                        allowedDomains: [],
                        exceptDomains: ['temp-mail.com', 'disposable.com'],
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;

        expect(parsed.basicEmail.type).toBe(String)
        expect(parsed.corporateEmail.type).toBe(String)
        expect(parsed.corporateEmail.rules?.isNot).toBe('')
        expect(parsed.publicEmail.type).toBe(String)
        expect(typeof parsed.corporateEmail.rules?.custom).toBe('function')
        expect(typeof parsed.publicEmail.rules?.custom).toBe('function')
    })

    it('should validate email domain case-insensitively', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'corporateEmail',
                    type: 'email',
                    title: 'Corporate Email',
                    specs: {
                        allowedDomains: ['Company.COM'],
                        exceptDomains: [],
                        mayBeEmpty: true,
                    }
                }
            },
        ]

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema) as any;
        const customValidator = parsed.corporateEmail.rules?.custom as Function

        const result = customValidator('user@company.com', {})
        expect(result.result).toBe(true)
    })
})
