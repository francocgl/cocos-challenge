import React, { Suspense, lazy, useState } from 'react';
import { useSelector } from 'react-redux';
import { COMPONENT_STATE, ComponentStateTypes } from '../../const/config';
import { RootState } from '../../redux/store';
import MessageWrapper from '../common/MessageWrapper';
import { Navbar, Modal } from '../index';

const InstrumentsTable = lazy(() => import('../InstrumentsTable'));
const PortfolioTable = lazy(() => import('../PortfolioTable'));

const Dashboard = () => {
  const isModalOpen = useSelector(
    (state: RootState) => state.modal.isModalOpen,
  );
  const [componentState, setComponentState] = useState<ComponentStateTypes>(
    COMPONENT_STATE.INSTRUMENTS,
  );

  return (
    <Suspense fallback={<MessageWrapper text="Cargando..." />}>
      <main className="cocos__main">
        <Navbar
          componentState={componentState}
          setComponentState={setComponentState}
        />
        <div>
          {componentState === COMPONENT_STATE.PORTFOLIO && <PortfolioTable />}
          {componentState === COMPONENT_STATE.INSTRUMENTS && (
            <InstrumentsTable />
          )}
        </div>
        {isModalOpen && <Modal />}
      </main>
    </Suspense>
  );
};

export default Dashboard;
