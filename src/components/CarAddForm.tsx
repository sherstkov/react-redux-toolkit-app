import { useState, useEffect } from 'react';
import styles from '@styles/Forms.module.css';
import { Car, Transmission } from '@customTypes/Cars';
import { useCreateCarMutation } from '../slices/apiSlice';
import { FilterOptions } from './index';
import { v4 as uuidv4 } from 'uuid';
import { useForm, SubmitHandler } from 'react-hook-form';

const CarAddForm = () => {
  const [carName, setCarName] = useState('');
  const [carColor, setCarColor] = useState('');
  const [carDescription, setCarDescription] = useState('');
  const [carTransmission, setCarTransmission] = useState(
    'Default' as Transmission
  );
  const [carPrice, setCarPrice] = useState(0);

  const [createCar] = useCreateCarMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<Car>();

  //reset react-hook-form registers
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ name: '', color: '' });
    }
  }, [isSubmitSuccessful, reset]);

  //handle submit
  const onSubmit: SubmitHandler<Car> = () => sendData();

  //send new car to firestore
  const sendData = () => {
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

    clearInputs();
  };

  const clearInputs = () => {
    setCarName('');
    setCarColor('');
    setCarDescription('');
    setCarTransmission('Default' as Transmission);
    setCarPrice(0);
  };

  return (
    <form className={styles.carForm} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className={styles.label} htmlFor='name'>
          New car name:
        </label>
        <input
          {...register('name', { required: true, maxLength: 20 })}
          type='text'
          name='name'
          placeholder='Type a new car name here'
          value={carName}
          onChange={(e) => setCarName(e.target.value)}
        />
        {errors.name && errors.name.type === 'required' && (
          <span>This is required</span>
        )}
        {errors.name && errors.name.type === 'maxLength' && (
          <span>Max length exceeded</span>
        )}
      </div>
      <div>
        <label className={styles.label} htmlFor='name'>
          New car color:
        </label>
        <input
          {...register('color', { required: true, maxLength: 20 })}
          type='text'
          name='color'
          placeholder='Type a new car color here'
          value={carColor}
          onChange={(e) => setCarColor(e.target.value)}
        />
        {errors.color && errors.color.type === 'required' && (
          <span>This is required</span>
        )}
        {errors.color && errors.color.type === 'maxLength' && (
          <span>Max length exceeded</span>
        )}
      </div>
      <div>
        <label className={styles.label} htmlFor='element'>
          New car transmission:
        </label>
        <select
          {...register('transmission', { required: true })}
          name='transmission'
          value={carTransmission}
          onChange={(e) => setCarTransmission(e.target.value as Transmission)}
        >
          <option value='' hidden>
            Select transmission
          </option>
          <FilterOptions />
        </select>
        {errors.transmission && errors.transmission.type === 'required' && (
          <span>This is required</span>
        )}
      </div>
      <div>
        <label className={styles.label} htmlFor='name'>
          New car price:
        </label>
        <input
          {...register('price', { min: 1, max: 20000000 })}
          type='number'
          name='price'
          placeholder='Type a new car name here'
          value={carPrice}
          onChange={(e) => setCarPrice(+e.target.value)}
        />
        {errors.price && errors.price.type === 'max' && (
          <span>Price is large</span>
        )}
        {errors.price && errors.price.type === 'min' && (
          <span>This is small</span>
        )}
      </div>
      <div>
        <label className={styles.label} htmlFor='text'>
          New car description:
        </label>
        <textarea
          {...register('description', { maxLength: 300 })}
          name='description'
          className={styles.description}
          placeholder='Type your description'
          value={carDescription}
          onChange={(e) => setCarDescription(e.target.value)}
        />
        {errors.description && errors.description.type === 'maxLength' && (
          <span>Text is too big</span>
        )}
      </div>
      <button type='submit'>Sumbit</button>
    </form>
  );
};

export default CarAddForm;
