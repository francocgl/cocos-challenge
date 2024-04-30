import React, { type ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/reducers/modalSlice';
import useSearchByTickerQuery from '../../hooks/useSearchByTickerQuery';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';
import { RootState } from '../../redux/store';
import ModalForm from './ModalForm';

const Modal = (): ReactElement => {
  useLockBodyScroll();
  const dispatch = useDispatch();
  const ticker = useSelector((state: RootState) => state.modal.ticker);
  const side = useSelector((state: RootState) => state.modal.side);
  const { data: instrument, isLoading } = useSearchByTickerQuery(ticker);

  return (
    <div className="cocos__modal-container">
      {!isLoading ? (
        <div className="cocos__modal-content">
          <div className="cocos__modal-header">
            <h2 className="cocos__modal-header__title">{instrument.ticker}</h2>
            <button
              onClick={() => dispatch(closeModal())}
              className="cocos__modal-header__button"
            >
              Cerrrar
            </button>
          </div>
          <ModalForm instrument={instrument} side={side} />
        </div>
      ) : (
        'Cargando..'
      )}
    </div>
  );
};

export default Modal;
