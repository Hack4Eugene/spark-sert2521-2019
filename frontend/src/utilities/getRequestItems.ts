import axios from 'axios';
import getHost from './getHost';

interface Request {
  name: string;
  price: number;
  id: number;
}

export default async () => {
  const items = await axios(getHost() + '/api/items');
  //const mappedItems: Options =
  return items.data.response.map(({ name, price, id }: Request) => {
    const formattedPrice = ((price * 100) / 100).toFixed(2);
    return { label: `${name} - $${formattedPrice}`, value: id };
  });
};
