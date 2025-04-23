import { isValidURLLength } from '../../utils';
export declare const useRules: () => {
    GIVEN_NAME: {
        required: {
            value: boolean;
            message: string;
        };
        maxLength: {
            value: number;
            message: string;
        };
        pattern: {
            value: RegExp;
            message: string;
        };
    };
    LINK_DESCRIPTION: {
        maxLength: {
            value: number;
            message: string;
        };
    };
    LINK_URL: {
        pattern: {
            value: RegExp;
            message: string;
        };
    };
    STORING_LINK: {
        required: {
            value: boolean;
            message: string;
        };
        pattern: {
            value: RegExp;
            message: string;
        };
        validate: typeof isValidURLLength;
    };
    MOTIVATIONS: {
        maxLength: {
            value: number;
            message: string;
        };
    };
    OBJECTIVES: {
        maxLength: {
            value: number;
            message: string;
        };
    };
    PAYMENT_ADDRESS: {
        validate: (address?: string | undefined) => Promise<string | true>;
    };
    QUALIFICATIONS: {
        maxLength: {
            value: number;
            message: string;
        };
    };
};
