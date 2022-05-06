import { Loader } from '@components/index';
import styles from '@styles/CarsList.module.css';
import { FC, useMemo } from 'react';
import { useGetCarsQuery, useDeleteCarMutation } from '../slices/apiSlice';
import { Cars, Car } from '@customTypes/Cars';
import unknownCarImage from '@images/unknownCar.png';
import { useAppSelector } from '@store/store';

const CarsList: FC = () => {
  const { data: cars = [], isLoading, isError } = useGetCarsQuery(null);
  const [deleteCar] = useDeleteCarMutation();

  const { activeFilter, leftInputFilter, rightInputFilter } = useAppSelector(
    (state) => state.filters
  );

  const filteredCars = useMemo(() => {
    if (activeFilter.length === 0) {
      return cars.filter(
        (item) =>
          item.price >= leftInputFilter && item.price <= rightInputFilter
      );
    } else {
      return cars.filter(
        (item) =>
          activeFilter.includes(item.transmission) &&
          item.price >= leftInputFilter &&
          item.price <= rightInputFilter
      );
    }
  }, [cars, activeFilter, leftInputFilter, rightInputFilter]);

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
        <div className={styles['img-container']}>
          <img
            className={styles.img}
            src={car.image || unknownCarImage}
            alt="Car's image"
          />
        </div>
        <div className={styles['info-container']}>
          <h2>{car.name}</h2>
          <p>
            {car.color}, {car.transmission}
          </p>
          <p>{car.description}</p>
        </div>
        <div className={styles['price-info']}>
          <h3>Price: {car.price}</h3>
          <span onClick={() => deleteCar(car.id)}>
            <svg
              fill='#000000'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 50 50'
              width='30px'
              height='30px'
            >
              <path d='M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z' />
            </svg>
          </span>
        </div>
      </div>
    ));
  };
  const elements = renderCarsList(filteredCars as Cars);
  return (
    <div>
      <h1>CarsList</h1>
      {elements}
    </div>
  );
};

export default CarsList;
