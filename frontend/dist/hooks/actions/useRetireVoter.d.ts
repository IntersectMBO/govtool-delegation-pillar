export declare const useRetireVoter: () => {
    retireVoter: (type: 'Drep' | 'DirectVoter') => Promise<void>;
    isRetiring: boolean;
};
