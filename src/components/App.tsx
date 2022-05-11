import '@styles/globals.css';
import styles from '@styles/App.module.css';
import {
  CarsList,
  CarAddForm,
  CarsFilters,
  ErrorBoundary,
} from '@components/index';

const App = () => {
  return (
    <main className={styles.container}>
      <ErrorBoundary>
        <CarsList />
      </ErrorBoundary>
      <div className={styles.aside}>
        <CarAddForm />
        <CarsFilters />
      </div>
    </main>
  );
};

export default App;
