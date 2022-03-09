export const addressToPost = (address) => {
  const street = address.street ? `${address.street}, ` : '';
  const number = address.number ? `${address.number} - ` : '';
  const zipCode = address.zipCode ? `${address.zipCode}, ` : '';
  const district = address.district ? `${address.district}, ` : '';
  const city = address.city ? `${address.city}/` : '';
  const state = address.state ? `${address.state}. ` : '';
  const complement = address.complement ? `${address.complement}` : '';
  const result = street.concat(number, zipCode, district, city, state, complement);
  return result;
};
