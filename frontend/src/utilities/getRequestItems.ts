import axios from 'axios';

interface Request {
  name: string;
  price: number;
  id: number;
}

export default async () => {
  const items = await axios('http://localhost:8080/api/items');
  //const mappedItems: Options =
  return items.data.response.map(({ name, price, id }: Request) => {
    price = Number(((price * 100) / 100).toFixed(2));
    return { label: `${name} - $${price}`, value: id };
  });
};
