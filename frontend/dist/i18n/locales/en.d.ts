export declare const en: {
    translation: {
        alerts: {
            delegate: {
                failed: string;
                warning: string;
                success: string;
            };
            createGovAction: {
                failed: string;
                success: string;
            };
            registerAsDrep: {
                failed: string;
                warning: string;
                success: string;
            };
            registerAsDirectVoter: {
                failed: string;
                warning: string;
                success: string;
            };
            retireAsDrep: {
                failed: string;
                warning: string;
                success: string;
            };
            retireAsDirectVoter: {
                failed: string;
                warning: string;
                success: string;
            };
            updateMetaData: {
                failed: string;
                success: string;
            };
            vote: {
                failed: string;
                success: string;
            };
            changesSaved: string;
            copiedToClipboard: string;
            transactionInProgress: string;
            walletConnected: string;
        };
        dashboard: {
            headingOne: string;
            headingTwo: string;
            title: string;
            cards: {
                drepName: string;
                showTransaction: string;
                drep: {
                    changeMetadata: string;
                    dRepRegistration: string;
                    dRepRetirement: string;
                    dRepUpdate: string;
                    holdersCanDelegate: string;
                    ifYouWant: string;
                    metadataUpdateInProgress: string;
                    notRegisteredDescription: string;
                    notRegisteredTitle: string;
                    notRegisteredWasRegisteredDescriptionWithGivenName: string;
                    notRegisteredWasRegisteredDescription: string;
                    notRegisteredWasRegisteredTitle: string;
                    register: string;
                    registerAgain: string;
                    registerAsDRep: string;
                    registeredDescription: string;
                    registeredTitle: string;
                    registrationInProgress: string;
                    reRegister: string;
                    retire: string;
                    retirementInProgress: string;
                    retirementInProgressWithGivenName: string;
                    viewDetails: string;
                    youAreRegistered: string;
                    yourDRepId: string;
                };
                govActions: {
                    description: string;
                    reviewAndVote: string;
                    title: string;
                };
                proposeGovernanceAction: {
                    title: string;
                    description: string;
                    propose: string;
                    view: string;
                };
                directVoter: {
                    isRegisteredDescription: string;
                    register: string;
                    registerDescription: string;
                    registerTitle: string;
                    reRegister: string;
                    registration: string;
                    registrationInProgress: string;
                    retire: string;
                    wasDirectVoterTitle: string;
                    retirement: string;
                    retirementInProgress: string;
                    wasRegisteredDescription: string;
                    youAreDirectVoterTitle: string;
                };
                delegation: {
                    noDelegationTitle: string;
                    delegateToAnotherDRep: string;
                    noDelegationDescription: string;
                    noDelegationActionButton: string;
                    dRepDelegationTitle: string;
                    noConfidenceDelegationTitle: string;
                    abstainDelegationTitle: string;
                    abstainDescription: string;
                    noDescription: string;
                    inProgress: {
                        title: string;
                        dRep: string;
                        abstain: string;
                        no: string;
                    };
                };
            };
        };
        createGovernanceAction: {
            chooseGATypeTitle: string;
            creatingAGovernanceAction: string;
            creatingAGovernanceActionDescription: string;
            editSubmission: string;
            fields: {
                declarations: {
                    abstract: {
                        label: string;
                        placeholder: string;
                        tip: string;
                    };
                    amount: {
                        label: string;
                        placeholder: string;
                    };
                    motivation: {
                        label: string;
                        placeholder: string;
                        tip: string;
                    };
                    rationale: {
                        label: string;
                        placeholder: string;
                        tip: string;
                    };
                    receivingAddress: {
                        label: string;
                        placeholder: string;
                    };
                    title: {
                        label: string;
                        placeholder: string;
                    };
                };
                validations: {
                    bech32: string;
                    maxLength: string;
                    number: string;
                    required: string;
                    url: string;
                    positive: string;
                };
            };
            formTitle: string;
            references: string;
            reviewSubmission: string;
            storeDataCheckboxLabel: string;
            storeDataLink: string;
            storeDataTitle: string;
            storingInformationDescription: string;
            storingInformationStep1Label: string;
            storingInformationStep2Label: string;
            storingInformationStep2Link: string;
            storingInformationStep3Label: string;
            storingInformationTitle: string;
            storingInformationURLPlaceholder: string;
            supportingLinks: string;
            title: string;
            modals: {
                submitTransactionSuccess: {
                    message: string;
                    title: string;
                };
            };
        };
        delegation: {
            description: string;
            dRepIdDescription: string;
            heading: string;
            otherOptions: string;
            pasteDRepId: string;
            votingPowerToDelegate: string;
            whereFindDRepId: string;
            abstain: {
                subtitle: string;
                title: string;
            };
            noConfidence: {
                subtitle: string;
                title: string;
            };
            toDRep: {
                subtitle: string;
                title: string;
            };
            toMyself: {
                subtitle: string;
                title: string;
            };
        };
        dRepDirectory: {
            abstainCardDefaultDescription: string;
            abstainCardDefaultTitle: string;
            automatedVotingOptions: string;
            editBtn: string;
            delegatedToAbstainTitle: string;
            delegatedToNoConfidenceTitle: string;
            delegatedToAbstainDescription: string;
            delegatedToNoConfidenceDescription: string;
            delegationOptions: string;
            directVoter: string;
            filterTitle: string;
            goToDRepDirectory: string;
            meAsDRep: string;
            myDelegation: string;
            myDelegationToYourself: string;
            myDRep: string;
            listTitle: string;
            noConfidenceDefaultDescription: string;
            noConfidenceDefaultTitle: string;
            noResultsForTheSearchTitle: string;
            noResultsForTheSearchDescription: string;
            title: string;
            votingPower: string;
        };
        errorPage: {
            backToDashboard: string;
            backToHomepage: string;
            error: string;
            serverError: string;
            whoops: string;
        };
        errors: {
            appCannotCreateTransaction: string;
            appCannotGetDeposit: string;
            appCannotGetUtxos: string;
            appCannotGetVkeys: string;
            checkIsWalletConnected: string;
            dRepIdNotFound: string;
            insufficientBalanceDescription: string;
            insufficientBalanceTitle: string;
            invalidGovernanceActionType: string;
            invalidTreasuryGovernanceActionType: string;
            noAddressesFound: string;
            noStakeKeySelected: string;
            notUsingAnchor: string;
            registeringStakeKey: string;
            somethingWentWrong: string;
            tryingConnectTo: string;
            useCardano: string;
            walletNoCIP30Nor90Support: string;
            walletNoCIP30Support: string;
            walletNoCIP90FunctionsEnabled: string;
            dRep: {
                description: {
                    notVerifiable: string;
                    dataMissing: string;
                    incorrectFormat: string;
                };
                message: {
                    notVerifiable: string;
                    dataMissing: string;
                    incorrectFormat: string;
                };
            };
            gAMetadata: {
                description: {
                    notVerifiable: string;
                    dataMissing: string;
                    incorrectFormat: string;
                };
                message: {
                    notVerifiable: string;
                    dataMissing: string;
                    incorrectFormat: string;
                };
                title: {};
            };
        };
        footer: {
            copyright: string;
            privacyPolicy: string;
            termOfService: string;
        };
        forms: {
            link: string;
            createGovernanceAction: {
                typeLabel: string;
                typeTip: string;
            };
            dRepData: {
                givenName: string;
                givenNameHelpfulText: string;
                objectives: string;
                objectivesHelpfulText: string;
                motivations: string;
                motivationsHelpfulText: string;
                qualifications: string;
                qualificationsHelpfulText: string;
                paymentAddress: string;
                paymentAddressHelpfulText: string;
                doNotList: string;
                doNotListHelpfulText: string;
                referenceTypes: {
                    link: {
                        title: string;
                        description: string;
                    };
                    identity: {
                        title: string;
                        description: string;
                    };
                };
                references: string;
                referenceDescription: string;
                referenceDescriptionHelpfulText: string;
                referenceURL: string;
            };
            errors: {
                tooLongUrl: string;
                mustBeStakeAddress: string;
                mustBeReceivingAddress: string;
            };
        };
        proposalDiscussion: {
            title: string;
            proposeAGovernanceAction: string;
        };
        govActions: {
            about: string;
            abstract: string;
            backToGovActions: string;
            castVote: string;
            castVoteDeadline: string;
            changeVote: string;
            changeYourVote: string;
            chooseHowToVote: string;
            contextAboutYourVote: string;
            dataMissing: string;
            dataMissingTooltipExplanation: string;
            details: string;
            expiresDateWithEpoch: string;
            expiryDate: string;
            filterTitle: string;
            forGovAction: string;
            dReps: string;
            sPos: string;
            ccCommittee: string;
            governanceActionId: string;
            governanceActionType: string;
            goToVote: string;
            protocolParamsDetails: {
                existing: string;
                proposed: string;
            };
            hardforkDetails: {
                currentVersion: string;
                proposedVersion: string;
                previousGAId: string;
            };
            motivation: string;
            myVote: string;
            noResultsForTheSearch: string;
            onChainTransactionDetails: string;
            optional: string;
            provideContext: string;
            provideContextAboutYourVote: string;
            provideNewContextAboutYourVote: string;
            rationale: string;
            seeExternalData: string;
            selectDifferentOption: string;
            showVotes: string;
            submissionDate: string;
            submittedDateWithEpoch: string;
            supportingLinks: string;
            title: string;
            toVote: string;
            viewDetails: string;
            viewDetailsAndVote: string;
            viewOtherDetails: string;
            viewProposalDetails: string;
            vote: string;
            voteContextFileName: string;
            votedOnByMe: string;
            voteOnGovActions: string;
            voteSubmitted: string;
            voteTransaction: string;
            votes: string;
            votesSubmitted: string;
            votesSubmittedOnChain: string;
            youCanProvideContext: string;
            youHaventVotedYet: string;
            withCategoryNotExist: {
                partOne: string;
                optional: string;
                partTwo: string;
            };
            withIdNotExist: {
                partOne: string;
                partTwo: string;
            };
            tooltips: {
                info: string;
                treasury: string;
            };
            type: {
                noConfidence: {
                    title: string;
                    label: string;
                };
                newCommittee: {
                    title: string;
                    label: string;
                };
                newConstitution: {
                    title: string;
                    label: string;
                };
                hardFork: {
                    title: string;
                    label: string;
                };
                parameterChange: {
                    title: string;
                    label: string;
                };
                treasuryWithdrawals: {
                    title: string;
                    label: string;
                };
                infoAction: {
                    title: string;
                    label: string;
                };
            };
        };
        hero: {
            connectWallet: string;
            description: string;
            headline: string;
        };
        home: {
            cards: {
                delegate: {
                    description: string;
                    firstButtonLabel: string;
                    title: string;
                };
                governanceActions: {
                    description: string;
                    firstButtonLabel: string;
                    title: string;
                };
                proposeAGovernanceAction: {
                    description: string;
                    secondButtonLabel: string;
                    firstButtonLabel: string;
                    title: string;
                };
                registerAsDRep: {
                    description: string;
                    firstButtonLabel: string;
                    title: string;
                };
                registerAsDirectVoter: {
                    description: string;
                    firstButtonLabel: string;
                    title: string;
                };
            };
        };
        menu: {
            faqs: string;
            guides: string;
            help: string;
        };
        metadataUpdate: {
            description: string;
            info: string;
            title: string;
        };
        modals: {
            common: {
                goToDashboard: string;
                oops: string;
            };
            createGovernanceAction: {
                cancelModalDescription: string;
                cancelModalTitle: string;
            };
            delegation: {
                message: string;
                title: string;
            };
            externalDataDoesntMatch: {
                buttonText: string;
                cancelRegistrationText: string;
                feedbackText: string;
                message: string;
                title: string;
            };
            externalLink: {
                beCareful: string;
                continueTo: string;
                description: string;
                safety: string;
                thisIs: string;
                youAreAboutToOpen: string;
            };
            registration: {
                cancelTitle: string;
                cancelDescription: string;
                message: string;
                title: string;
            };
            retirement: {
                message: string;
                title: string;
            };
            urlCannotBeFound: {
                buttonText: string;
                cancelRegistrationText: string;
                feedbackText: string;
                linkText: string;
                message: string;
                title: string;
            };
            votingPower: {
                govActionsVotes: string;
                votesSubmittedByDReps: string;
                yourVote: string;
            };
            waitForTransaction: {
                title: string;
                message: string;
            };
            pendingValidation: {
                title: string;
                message: string;
            };
        };
        dRepData: {
            aboutYou: string;
            dRepName: string;
            dRepNameDescription: string;
            optional: string;
            required: string;
        };
        editMetadata: {
            pageTitle: string;
            storeDataCheckboxLabel: string;
            storeDataLink: string;
            storeDataTitle: string;
            storingInformationDescription: string;
            storingInformationStep1Label: string;
            storingInformationStep2Label: string;
            storingInformationStep2Link: string;
            storingInformationStep3Label: string;
            storingInformationTitle: string;
            storingInformationURLPlaceholder: string;
            fields: {
                validations: {
                    maxLength: string;
                    required: string;
                    url: string;
                };
            };
        };
        registration: {
            addInformationDescription: string;
            addInformationTitle: string;
            alreadyRegistered: {
                title: string;
                description: string;
                viewDetails: string;
            };
            becomeADRep: string;
            descriptionStepTwo: string;
            headingStepTwo: string;
            register: string;
            rolesAndResponsibilitiesDescription: string;
            rolesAndResponsibilitiesTitle: string;
            storeDataCheckboxLabel: string;
            storeDataLink: string;
            storeDataTitle: string;
            storingInformationDescription: string;
            storingInformationStep1Label: string;
            storingInformationStep2Label: string;
            storingInformationStep2Link: string;
            storingInformationStep3Label: string;
            storingInformationTitle: string;
            storingInformationURLPlaceholder: string;
            fields: {
                validations: {
                    maxLength: string;
                    required: string;
                    url: string;
                    noSpaces: string;
                };
            };
        };
        retirement: {
            notADRep: {
                title: string;
                description: string;
            };
            continue: string;
            retireAsDrep: string;
            whatRetirementMeansTitle: string;
            whatRetirementMeansDescription: string;
        };
        slider: {
            showAll: string;
            viewAll: string;
        };
        directVoter: {
            alreadyRegistered: {
                title: string;
                description: string;
            };
            becomeDirectVoter: string;
            notDirectVoter: {
                title: string;
                description: string;
            };
            registerDescription: string;
            registerHeading: string;
            retirementDescription: string;
            retirementHeading: string;
            retireDirectVoter: string;
        };
        system: {
            description: string;
            title: string;
            bootstrappingWarning: string;
        };
        tooltips: {
            delegateTodRep: {
                abstain: {
                    heading: string;
                    paragraphOne: string;
                };
                noConfidence: {
                    heading: string;
                    paragraphOne: string;
                };
                todRep: {
                    heading: string;
                    paragraphOne: string;
                };
                toMyself: {
                    heading: string;
                    paragraphOne: string;
                };
            };
            expiryDate: {
                heading: string;
                paragraphOne: string;
                paragraphTwo: string;
            };
            submissionDate: {
                heading: string;
                paragraphOne: string;
            };
            votingPower: {
                heading: string;
                paragraphOne: string;
                paragraphTwo: string;
            };
        };
        wallet: {
            cantSeeWalletQuestion: string;
            chooseWallet: string;
            connect: string;
            connectWallet: string;
            connectYourWallet: string;
            connectYourWalletButton: string;
            connectedWallet: string;
            disconnect: string;
            noWalletsToConnect: string;
            pickStakeKey: string;
            selectStakeKey: string;
        };
        warnings: {
            usingUnregisteredStakeKeys: string;
        };
        dataMissingErrors: {
            dataMissing: string;
            notVerifiable: string;
            incorrectFormat: string;
        };
        votes: {
            abstain: string;
            constitutional: string;
            no: string;
            unconstitutional: string;
            yes: string;
        };
        usefulLinks: {
            title: string;
            ccPortal: {
                title: string;
                description: string;
                link: string;
            };
            intersectWebsite: {
                title: string;
                description: string;
                link: string;
            };
        };
        about: string;
        addLink: string;
        back: string;
        backToDashboard: string;
        backToList: string;
        cancel: string;
        clear: string;
        clickToCopyLink: string;
        close: string;
        confirm: string;
        connectToDelegate: string;
        continue: string;
        copiedLink: string;
        delegate: string;
        drepId: string;
        email: string;
        feedback: string;
        filter: string;
        goBack: string;
        goToMainnet: string;
        here: string;
        info: string;
        inProgress: string;
        learnMore: string;
        linkCopied: string;
        loading: string;
        moreInformation: string;
        myDRepId: string;
        nextStep: string;
        network: string;
        ok: string;
        optional: string;
        register: string;
        required: string;
        seeTransaction: string;
        select: string;
        share: string;
        showLess: string;
        showMore: string;
        skip: string;
        sort: string;
        sortBy: string;
        status: string;
        submit: string;
        thisLink: string;
        viewDetails: string;
        votingPower: string;
        yourself: string;
    };
};
