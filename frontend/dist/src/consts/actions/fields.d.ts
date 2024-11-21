import { isReceivingAddress, isValidURLLength } from 'utils';
export declare const Rules: {
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
        validate: typeof isReceivingAddress;
    };
    QUALIFICATIONS: {
        maxLength: {
            value: number;
            message: string;
        };
    };
};
