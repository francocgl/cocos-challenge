import React, { type ReactElement, useState } from 'react';
import { ORDER, SIDE, SideType } from '../../const/config';
import useOrderMutationQuery from '../../hooks/useOrderMutationQuery';
import {
  GetInstrumentsResponse,
  GetPortfolioResponse,
} from '../../types/queryResponse';
import OrderSuccessModal from './OrderSuccessModal';
import useGetPortfolio from '../../hooks/useGetPortfolio';
import { setOrderDataObject, validateForm } from './helpers';
import { MessageWrapper } from '../common';

type FormErrors = {
  priceError: string;
  quantityError: string;
};

const ModalForm = ({
  instrument,
  side,
}: {
  instrument: GetInstrumentsResponse;
  side: SideType;
}): ReactElement => {
  const { data: portfolio, isSuccess } = useGetPortfolio();
  const sendOrderMutation = useOrderMutationQuery();
  const { id } = instrument;
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);
  const [order, setOrder] = useState(null);
  const [isError, setIsError] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({
    priceError: '',
    quantityError: '',
  });
  const [formData, setFormData] = useState({
    instrument_id: id,
    side: side,
    type: ORDER.MARKET,
    quantity: 0,
    price: 0,
  });

  const hasPortfolioActions =
    isSuccess &&
    portfolio
      .filter((action: GetPortfolioResponse) => action.instrument_id === id)
      .map((item: GetPortfolioResponse) => item.quantity);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitDisabled(true);
    setIsError(false);

    // Validacion
    const errors = validateForm(formData, hasPortfolioActions);
    setFormErrors(errors);

    // Si no hay errores hago la llamada a la API
    if (Object.values(errors).some(error => error !== '')) {
      setIsSubmitDisabled(false);
      return;
    } else {
      const dataObject = setOrderDataObject(formData);
      try {
        console.log('dataObject', dataObject);
        const res = await sendOrderMutation.mutateAsync(dataObject);
        console.log('response', res);
        setOrder(res);
        setIsSubmitDisabled(false);
      } catch (err) {
        setIsError(true);
      }
    }
  };

  if (isError)
    return (
      <MessageWrapper text="Disculpe, por favor intente nuevamente mas tarde." />
    );
  if (order) return <OrderSuccessModal order={order} />;

  return (
    <form onSubmit={handleSubmit} method="post">
      <div className="cocos__modal-form-control">
        <label htmlFor="side" className="cocos__modal-form-control__label">
          Tipo de Operacion
        </label>
        <select
          id="side"
          name="side"
          className="cocos__modal-form-control__input"
          value={formData.side}
          onChange={handleChange}
        >
          <option value={SIDE.BUY}>Compra</option>
          {hasPortfolioActions.length > 0 && (
            <option value={SIDE.SELL}>Venta</option>
          )}
        </select>
      </div>
      <div className="cocos__modal-form-control">
        <label htmlFor="type" className="cocos__modal-form-control__label">
          Tipo de Orden
        </label>
        <select
          id="type"
          name="type"
          className="cocos__modal-form-control__input"
          value={formData.type}
          onChange={handleChange}
        >
          <option value={ORDER.MARKET}>Market</option>
          <option value={ORDER.LIMIT}>Limit</option>
        </select>
      </div>

      <div className="cocos__modal-form-control">
        <label htmlFor="quantity" className="cocos__modal-form-control__label">
          Cantidad de acciones
        </label>
        <input
          type="number"
          name="quantity"
          className="cocos__modal-form-control__input"
          id="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
        {formErrors.quantityError && (
          <span className="cocos__modal-form-control__input-error">
            {formErrors.quantityError}
          </span>
        )}
      </div>
      {formData.type === ORDER.LIMIT && (
        <div className="cocos__modal-form-control">
          <label htmlFor="price" className="cocos__modal-form-control__label">
            Precio
          </label>
          <input
            type="number"
            className="cocos__modal-form-control__input"
            id="price"
            value={formData.price}
            name="price"
            onChange={handleChange}
          />
          {formErrors.priceError && (
            <span className="cocos__modal-form-control__input-error">
              {formErrors.priceError}
            </span>
          )}
        </div>
      )}
      <div className="cocos__modal-form-control">
        <button
          type="submit"
          disabled={isSubmitDisabled}
          aria-label="Submit"
          className="cocos__modal-footer-buttons__send"
        >
          {isSubmitDisabled ? 'Cargando' : 'Enviar Orden'}
        </button>
      </div>
    </form>
  );
};

export default ModalForm;
