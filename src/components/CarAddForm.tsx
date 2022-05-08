import { FC, useState, FormEvent } from 'react';
import styles from '@styles/Forms.module.css';
import { Car, Transmission } from '@customTypes/Cars';
import { useCreateCarMutation } from '../slices/apiSlice';
import { FilterOptions } from './index';
import { v4 as uuidv4 } from 'uuid';

const CarAddForm: FC = () => {
  const [carName, setCarName] = useState('');
  const [carColor, setCarColor] = useState('');
  const [carDescription, setCarDescription] = useState('');
  const [carTransmission, setCarTransmission] = useState(
    'Defaul22t' as Transmission
  );
  const [carPrice, setCarPrice] = useState(0);

  const [createCar] = useCreateCarMutation();

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    const newCar: Car = {
      id: uuidv4(),
      name: carName,
      color: carColor,
      transmission: carTransmission,
      description: carDescription,
      price: carPrice,
      image: null,
    };

    createCar(newCar);
  };

  return (
    <form className={styles.carForm} onSubmit={onSubmitHandler}>
      <div>
        <label className={styles.label} htmlFor='name'>
          New car name:
        </label>
        <input
          required
          type='text'
          name='name'
          placeholder='Type a new car name here'
          value={carName}
          onChange={(e) => setCarName(e.target.value)}
        />
      </div>
      <div>
        <label className={styles.label} htmlFor='name'>
          New car color:
        </label>
        <input
          required
          type='text'
          name='color'
          placeholder='Type a new car color here'
          value={carColor}
          onChange={(e) => setCarColor(e.target.value)}
        />
      </div>
      <div>
        <label className={styles.label} htmlFor='element'>
          New car transmission:
        </label>
        <select
          required
          name='transmission'
          value={carTransmission}
          onChange={(e) => setCarTransmission(e.target.value as Transmission)}
        >
          <option value='Default'>Select transmission</option>
          <FilterOptions />
        </select>
      </div>
      <div>
        <label className={styles.label} htmlFor='name'>
          New car price:
        </label>
        <input
          required
          type='number'
          name='mileage'
          placeholder='Type a new car name here'
          value={carPrice}
          onChange={(e) => setCarPrice(+e.target.value)}
        />
      </div>
      <div>
        <label className={styles.label} htmlFor='text'>
          New car description:
        </label>
        <textarea
          required
          name='description'
          className={styles.description}
          placeholder='Type your description'
          value={carDescription}
          onChange={(e) => setCarDescription(e.target.value)}
        />
      </div>
      <button type='submit'>Sumbit</button>
    </form>
  );
};

export default CarAddForm;
