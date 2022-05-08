import '@styles/globals.css';
import styles from '@styles/App.module.css';
import { CarsList, CarAddForm, CarsFilters } from '@components/index';
import { FC } from 'react';

const App: FC = () => {
  return (
    <main className={styles.container}>
      <CarsList />
      <div className={styles.aside}>
        <CarAddForm />
        <CarsFilters />
      </div>
    </main>
  );
};

export default App;
