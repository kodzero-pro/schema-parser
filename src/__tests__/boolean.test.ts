import KodzeroToValidnoParser from '../KodzeroToValidnoParser.js';
import { TableField, TableFieldAny } from '../kz-schema-factory/types.js';

describe('KodzeroToValidnoParser: boolean', () => {
    it('should parse basic boolean field (onlyTrue: false)', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'basicBoolean',
                    type: 'boolean',
                    title: 'Basic Boolean',
                    specs: {
                        onlyTrue: false,
                    }
                }
            },
        ]

        const validnoSchema = {
            basicBoolean: { type: Boolean },
        }

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema);

        expect(validnoSchema).toEqual(parsed)
    })

    it('should parse boolean field with onlyTrue: true', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'onlyTrueBoolean',
                    type: 'boolean',
                    title: 'Only True Boolean',
                    specs: {
                        onlyTrue: true,
                    }
                }
            },
        ]

        const validnoSchema = {
            onlyTrueBoolean: { type: Boolean, rules: { is: true } },
        }

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema);

        expect(validnoSchema).toEqual(parsed)
    })

    it('should parse multiple boolean fields with different specs', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'booleanTrue',
                    type: 'boolean',
                    title: 'Is Active',
                    specs: {
                        onlyTrue: true,
                    }
                }
            },
            {
                id: 'yyy',
                order: 2,
                isAuto: false,
                item: {
                    key: 'booleanAny',
                    type: 'boolean',
                    title: 'Is Enabled',
                    specs: {
                        onlyTrue: false,
                    }
                }
            },
        ]

        const validnoSchema = {
            booleanTrue: { type: Boolean, rules: { is: true } },
            booleanAny: { type: Boolean },
        }

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema);

        expect(validnoSchema).toEqual(parsed)
    })

    it('should parse boolean field for agreement/consent scenarios', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'termsAccepted',
                    type: 'boolean',
                    title: 'Terms Accepted',
                    specs: {
                        onlyTrue: true,
                    }
                }
            },
        ]

        const validnoSchema = {
            termsAccepted: { type: Boolean, rules: { is: true } },
        }

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema);

        expect(validnoSchema).toEqual(parsed)
    })

    it('should parse boolean field for toggle scenarios', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'xxx',
                order: 1,
                isAuto: false,
                item: {
                    key: 'isActive',
                    type: 'boolean',
                    title: 'Is Active',
                    specs: {
                        onlyTrue: false,
                    }
                }
            },
        ]

        const validnoSchema = {
            isActive: { type: Boolean },
        }

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema);

        expect(validnoSchema).toEqual(parsed)
    })

    it('should parse mixed boolean fields (onlyTrue and regular)', () => {
        const kodzeroSchema: TableField<TableFieldAny>[] = [
            {
                id: 'aaa',
                order: 1,
                isAuto: false,
                item: {
                    key: 'privacyPolicyAccepted',
                    type: 'boolean',
                    title: 'Privacy Policy Accepted',
                    specs: {
                        onlyTrue: true,
                    }
                }
            },
            {
                id: 'bbb',
                order: 2,
                isAuto: false,
                item: {
                    key: 'newsletterSubscribed',
                    type: 'boolean',
                    title: 'Newsletter Subscribed',
                    specs: {
                        onlyTrue: false,
                    }
                }
            },
            {
                id: 'ccc',
                order: 3,
                isAuto: false,
                item: {
                    key: 'marketingEmailsAccepted',
                    type: 'boolean',
                    title: 'Marketing Emails Accepted',
                    specs: {
                        onlyTrue: true,
                    }
                }
            },
        ]

        const validnoSchema = {
            privacyPolicyAccepted: { type: Boolean, rules: { is: true } },
            newsletterSubscribed: { type: Boolean },
            marketingEmailsAccepted: { type: Boolean, rules: { is: true } },
        }

        const parsed = KodzeroToValidnoParser.parseSchema(kodzeroSchema);

        expect(validnoSchema).toEqual(parsed)
    })
})