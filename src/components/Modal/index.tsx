import React, { type ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/reducers/modalSlice';
import useSearchByTickerQuery from '../../hooks/useSearchByTickerQuery';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';
import { RootState } from '../../redux/store';
import ModalForm from './ModalForm';
import { MessageWrapper } from '../common';

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
          <ModalForm
            id={instrument.id}
            side={side}
            closePrice={instrument.close_price}
          />
        </div>
      ) : (
        <MessageWrapper text="Cargando..." />
      )}
    </div>
  );
};

export default Modal;
