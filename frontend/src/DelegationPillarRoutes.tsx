import { PATHS } from 'consts';
import { usePillarContext } from 'context';
import {
  IntroPage,
  Features,
  DRepDirectoryPage,
  DRepDetailsPage,
  EditDRepMetadataPage,
  RegisterAsdRepPage,
  RetireAsDRepPage,
  RegisterAsDirectVoterPage,
  RetireAsDirectVoterPage,
} from 'pages';
import { Routes, Route, Navigate } from 'react-router-dom';

export const DelegationPillarRoutes = () => {
  const { isEnabled } = usePillarContext();
  return (
    <Routes>
      <Route path="/home" element={<IntroPage />} />
      <Route path="/" element={<Features />}>
        <Route path={PATHS.dRepDirectory} element={<DRepDirectoryPage />} />
        <Route path={PATHS.dRepDetails} element={<DRepDetailsPage />} />
        {isEnabled && (
          <>
            <Route
              path={PATHS.editDRepMetadata}
              element={<EditDRepMetadataPage />}
            />
            <Route
              path={PATHS.registerAsDRep}
              element={<RegisterAsdRepPage />}
            />
            <Route path={PATHS.retireAsDrep} element={<RetireAsDRepPage />} />
            <Route
              path={PATHS.registerAsDirectVoter}
              element={<RegisterAsDirectVoterPage />}
            />
            <Route
              path={PATHS.retireAsDirectVoter}
              element={<RetireAsDirectVoterPage />}
            />
          </>
        )}
        <Route path="/*" element={<Navigate to="/home" />} />
      </Route>
    </Routes>
  );
};
