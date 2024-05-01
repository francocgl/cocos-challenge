import { ORDER, SIDE } from '../../const/config';
import { OrderDataTypes } from '../../types/queryResponse';

export const validateForm = (
  formData: OrderDataTypes,
  actions: number[],
  closePrice: number,
) => {
  const { quantity, side, type, price } = formData;
  const totalActions = actions.reduce((acc, curr) => acc + curr, 0);
  const totalSellPrice = totalActions * closePrice;
  const formActions = +quantity;
  const errorsForm = {
    priceError: '',
    quantityError: '',
  };

  if (!Number.isInteger(formActions)) {
    errorsForm.quantityError = 'Las acciones no pueden ser fraccionadas.';
  }

  if (type === ORDER.MARKET) {
    if (formActions < 1) {
      errorsForm.quantityError = 'Debes comprar/vender como mínimo 1 acción.';
    }
    if (side === SIDE.SELL) {
      if (formActions > totalActions) {
        errorsForm.quantityError = `No tienes esa cantidad de acciones, dispones de ${totalActions}.`;
      }
    }
  }

  if (type === ORDER.LIMIT) {
    if (!price) {
      errorsForm.priceError =
        'El precio es obligatorio para órdenes con límite.';
    }
    if (price) {
      if (side === SIDE.SELL && price > totalSellPrice) {
        errorsForm.priceError = `Solo dispones de ARS ${totalSellPrice.toLocaleString('es-en')}.`;
      }
      if (price < closePrice) {
        errorsForm.priceError = `Debes comprar/vender como mínimo ARS ${closePrice}.`;
      }
    }
  }

  return errorsForm;
};

export const setOrderDataObject = (
  formData: OrderDataTypes,
  lastPrice: number,
): OrderDataTypes => {
  const { type, quantity, price, ...rest } = formData;

  if (type === ORDER.LIMIT && price) {
    const calculateQuantity = Math.floor(+price / lastPrice);
    return {
      ...rest,
      type,
      quantity: calculateQuantity,
      price: +price,
    };
  }

  return {
    ...rest,
    type,
    quantity: +quantity,
  };
};
