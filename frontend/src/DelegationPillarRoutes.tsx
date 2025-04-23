import { Routes, Route, Outlet } from 'react-router-dom';
import { PATHS } from '@/consts';
import { usePillarContext } from '@/context';
import {
  DRepDirectoryPage,
  DRepDetailsPage,
  EditDRepMetadataPage,
  RegisterAsdRepPage,
  RetireAsDRepPage,
  RegisterAsDirectVoterPage,
  RetireAsDirectVoterPage,
} from '@/pages';

export const DelegationPillarRoutes = () => {
  const { isEnabled } = usePillarContext();

  return (
    <Routes>
      <Route path={PATHS.dRepDirectory} element={<Outlet />}>
        <Route path="" element={<DRepDirectoryPage />} />
        <Route path=":dRepId" element={<DRepDetailsPage />} />
      </Route>
      {isEnabled && (
        <>
          <Route
            path={PATHS.editDRepMetadata}
            element={<EditDRepMetadataPage />}
          />
          <Route path={PATHS.registerAsDRep} element={<RegisterAsdRepPage />} />
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
    </Routes>
  );
};
