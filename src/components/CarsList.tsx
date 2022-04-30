import { Loader } from '@components/index';
import styles from '@styles/CarsList.module.css';
import { FC, useCallback } from 'react';
import { useGetCarsQuery, useDeleteCarMutation } from '../api/apiSlice';
import { Cars, Car } from '@customTypes/Cars';

const CarsList: FC = () => {
  const { data: cars = [], isLoading, isError } = useGetCarsQuery(null);
  const [deleteCar] = useDeleteCarMutation();
  console.log('render'); //TODO delete

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    <h2>Loading error</h2>;
  }

  const renderCarsList = (carsList: Cars) => {
    if (carsList.length === 0) {
      return <h2>No cars yet</h2>;
    }
    return carsList.map((car: Car) => (
      <div key={car.id} className={styles.card}>
        <h3>name: {car.name}</h3>
        <h3>Color: {car.color}</h3>
        <h3>transmission: {car.transmission}</h3>
        <h3>mileage: {car.mileage}</h3>
        <h3>description: {car.description}</h3>
        <button onClick={() => deleteCar(car.id)}>Delete</button>
      </div>
    ));
  };
  const elements = renderCarsList(cars as Cars);
  return (
    <div>
      <h1>CarsList</h1>
      {elements}
    </div>
  );
};

export default CarsList;
