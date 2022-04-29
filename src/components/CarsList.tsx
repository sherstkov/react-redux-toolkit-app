import { Loader } from '@components/index';
import styles from '@styles/CarsList.module.css';
import { FC } from 'react';
import { useGetCarsQuery } from '../api/apiSlice';
import { Cars, Car } from '@customTypes/Cars';

const CarsList: FC = () => {
  const { data: cars = [], isLoading, isError } = useGetCarsQuery();

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
      <div key='123' className={styles.card}>
        <h3>Color: {car.color}</h3>
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
