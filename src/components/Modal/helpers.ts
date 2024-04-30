import { ORDER, SIDE } from '../../const/config';
import { OrderDataTypes } from '../../types/queryResponse';

export const validateForm = (formData: OrderDataTypes, actions: number[]) => {
  const { quantity, side, type, price } = formData;
  const totalActions = actions.reduce((acc, curr) => acc + curr, 0);
  const formActions = +quantity;
  const errorsForm = {
    priceError: '',
    quantityError: '',
  };

  if (formActions < 1) {
    errorsForm.quantityError = 'Debes comprar/vender como mínimo 1 acción.';
  }

  if (!Number.isInteger(formActions)) {
    errorsForm.quantityError = 'Las acciones no pueden ser fraccionadas.';
  }

  if (side === SIDE.SELL && formActions > totalActions) {
    errorsForm.quantityError = `No tienes esa cantidad de acciones, dispones de ${totalActions}.`;
  }

  if (type === ORDER.LIMIT && !price) {
    errorsForm.priceError = 'El precio es obligatorio para órdenes con límite.';
  }

  return errorsForm;
};

export const setOrderDataObject = (
  formData: OrderDataTypes,
): OrderDataTypes => {
  const { type, quantity, price, ...rest } = formData;

  if (type === ORDER.LIMIT && price) {
    return {
      ...rest,
      type,
      quantity: +quantity,
      price: +price,
    };
  }

  return {
    ...rest,
    type,
    quantity: +quantity,
  };
};
