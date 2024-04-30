import React, { type ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/reducers/modalSlice';
import { OrderMutationResponse } from '../../types/queryResponse';
import { Status } from '../../const/config';

const OrderSuccessModal = ({
  order,
}: {
  order: OrderMutationResponse;
}): ReactElement => {
  const dispatch = useDispatch();
  const { id, side, type, status, price, quantity } = order;
  const formatOrder = `Orden Nro ${id}`;
  const formatPrice = `ARS ${price?.toLocaleString('es-ar')}`;

  const formatStatus = (status: Status): string => {
    if (status === 'FILLED') return 'cocos__order-modal-box__value-filled';
    if (status === 'REJECTED') return 'cocos__order-modal-box__value-rejected';
    return 'cocos__order-modal-box__value-pending';
  };

  return (
    <div>
      <h4>{formatOrder}</h4>
      <div className="cocos__order-modal-box">
        <div>Operacion</div>
        <div className="cocos__order-modal-box__value">{side}</div>
      </div>
      <div className="cocos__order-modal-box">
        <div>Tipo</div>
        <div className="cocos__order-modal-box__value">{type}</div>
      </div>
      <div className="cocos__order-modal-box">
        <div>Precio ejecutado</div>
        <div className="cocos__order-modal-box__value">{formatPrice}</div>
      </div>
      <div className="cocos__order-modal-box">
        <div>Cantidad de acciones</div>
        <div className="cocos__order-modal-box__value">{quantity}</div>
      </div>
      <div className={`${formatStatus(status)} cocos__order-modal-box`}>
        <div>Estado</div>
        <div className="cocos__order-modal-box__value">{status}</div>
      </div>
      <div>
        <button
          onClick={() => dispatch(closeModal())}
          className="cocos__modal-footer-buttons__send"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
