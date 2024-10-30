# @intersect.mbo/govtool-delegation-pillar

The `@intersect.mbo/govtool-delegation-pillar` is a React.js package that provides the essential logic and UI components for managing and conducting delegation within a Cardano governance.

## Table of content:

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Running locally](#running-locally)

## Installation

To install this pacakge, use npm or yarn:

### `npm install @intersect.mbo/govtool-delegation-pillar`

or

### `yarn add @intersect.mbo/govtool-delegation-pillar`

## Usage

After installation, you can import the component and use it in your project.

#### This is an example of implementing a package in a [NextJs](https://nextjs.org/) application

```tsx
'use client';
import dynamic from 'next/dynamic';
import { useAppContext } from '@/context';

const DelegationPillar = dynamic(
  () => import('@intersect.mbo/govtool-delegation-pillar'),
  {
    ssr: false,
  }
);

export default function Page() {
  const {
    apiUrl,
    walletApi,
    validationApiUrl,
    cExplorerBaseUrl,
    epochParams,
    connectWallet,
    openFeedbackWindow,
    addSuccessAlert,
    addErrorAlert,
    validateMetadata,
    generateMetadata,
    createJsonLD,
    createHash,
    ...context
    // Or from any other context you need
  } = useAppContext();

  return (
    <DelegationPillar
      walletApi={walletApi}
      apiUrl={process.env.NEXT_PUBLIC_DELEGATIOn_API_URL}
      validationApiUrl={process.env.NEXT_PUBLIC_DELEGATION_API_URL}
      cExplorerBaseUrl={process.env.NEXT_PUBLIC_DELEGATIOn_BASE_URL}
      epochParams={epochParams}
      connectWallet={connectWallet}
      openFeedbackWindow={openFeedbackWindow}
      addSuccessAlert={addSuccessAlert}
      addErrorAlert={addErrorAlert}
      validateMetadata={validateMetadata}
      generateMetadata={generateMetadata}
      createJsonLD={createJsonLD}
      createHash={createHash}
    />
  );
}
```

#### Example of Implementing a Package Using CommonJS Modules (CJS):

```tsx
import React from 'react';
import { useAppContext } from '@/context';

const VotingPillar = React.lazy(
  () => import('@intersect.mbo/govtool-delegation-pillar/cjs')
);

export const VotingComponent = () => {
  const {
    apiUrl,
    walletApi,
    validationApiUrl,
    cExplorerBaseUrl,
    epochParams,
    connectWallet,
    openFeedbackWindow,
    addSuccessAlert,
    addErrorAlert,
    validateMetadata,
    generateMetadata,
    createJsonLD,
    createHash,
    ...context
    // Or from any other context you need
  } = useAppContext();

  return (
    <VotingPillar
      walletApi={walletApi}
      apiUrl={process.env.NEXT_PUBLIC_DELEGATION_API_URL}
      validationApiUrl={process.env.NEXT_PUBLIC_VALIDATION_API_URL}
      cExplorerBaseUrl={process.env.NEXT_PUBLIC_CEXPLORER_BASE_URL}
      epochParams={epochParams}
      connectWallet={connectWallet}
      openFeedbackWindow={openFeedbackWindow}
      addSuccessAlert={addSuccessAlert}
      addErrorAlert={addErrorAlert}
      validateMetadata={validateMetadata}
      generateMetadata={generateMetadata}
      createJsonLD={createJsonLD}
      createHash={createHash}
    />
  );
};
```

## Project Structure

```govtool-delegation-pillar/frontend
├── dist
├── jest.config.cjs
├── node_modules
├── package.json
├── package-lock.json
├── public
├── README.md
├── rollup.config.mjs
├── setupTests.ts
├── src
│   ├── components
│   ├── consts
│   ├── context
│   ├── DelegationPillarRoutes.tsx
│   ├── DelegationPillar.tsx
│   ├── features
│   ├── hooks
│   ├── i18n
│   ├── index.tsx
│   ├── pages
│   ├── react-app-env.d.ts
│   ├── services
│   ├── theme
│   ├── types
│   └── utils
└── tsconfig.json
└── yarn.lock
```

- **components/**: The `@intersect.mbo/govtool-delegation-pillar` components.
- **consts/**: Constants for the application.
- **context/**: Context for global application state.
- **features/**: Features for the application.
- **hooks/**: Custom hooks.
- **i18n/**: Internationalization configuration.
- **pages/**: Application pages.
- **services/**: Services for fetching data.
- **stories/**: Storybook stories.
- **theme/**: Theme configuration.
- **types/**: Typescript types.
- **utils/**: Utility functions.
- **rollup.config.js**: Configuration for the Rollup bundler.

## Prerequisites

Before starting, please ensure you have the following:

- Node.js and npm - Latest versions. You can download them from [here](https://nodejs.org/en/download/).

## Running locally

To run the application locally, you need to have Node.js installed.
Copy `.env.example` to `.env` and fill in the required environment variables.

Run the Voting Pillar backend server.

Start the frontend server:

```bash
npm install
npm start
```
