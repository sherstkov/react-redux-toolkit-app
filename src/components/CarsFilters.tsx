import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@store/store';
import {
  setLeftFilter,
  setRightFilter,
  filtersChanged,
} from 'slices/filtersSlice';
import store from '@store/store';
import { Transmission } from '@customTypes/Cars';
import styles from '@styles/Forms.module.css';

const CarsFilters: FC = () => {
  // const [inputFilterLeft, setInputFilter] = useState()

  const { activeFilter, checkboxFilters } = useAppSelector(
    (state) => state.filters
  );

  const dispatch = useAppDispatch();

  const handleClick = (filter: string) => {
    if (activeFilter.includes(filter)) {
      const newFilters = activeFilter.filter((item) => item !== filter);
      dispatch(filtersChanged(newFilters));
    } else {
      dispatch(filtersChanged([...activeFilter, filter]));
    }
  };

  const renderBoxFilters = (array: Array<string>) => {
    return array.map((filter) => {
      return (
        <div key={filter}>
          <input
            type='checkbox'
            id={filter}
            name={filter}
            onClick={() => handleClick(filter)}
          ></input>
          <label htmlFor={filter}>{filter}</label>
        </div>
      );
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    e.target.name === 'leftInput'
      ? dispatch(setLeftFilter(value))
      : dispatch(setRightFilter(value));
  };

  const checkboxElements = renderBoxFilters(checkboxFilters);
  return (
    <form className={styles.carForm}>
      <label className={styles.label} htmlFor='checkbox'>
        Filters:
      </label>
      {checkboxElements}
      <label className={styles.label} htmlFor='input'>
        Price:
      </label>
      <div className={styles['price-container']}>
        <input
          type='number'
          name='leftInput'
          className={styles['price-input']}
          onChange={handleChange}
        />
        <input
          type='number'
          name='rightInput'
          className={styles['price-input']}
          onChange={handleChange}
        />
      </div>{' '}
    </form>
  );
};

export default CarsFilters;
