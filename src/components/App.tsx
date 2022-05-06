import '@styles/globals.css';
import { CarsList, CarAddForm, CarsFilters } from '@components/index';
import { FC } from 'react';

const App: FC = () => {
  return (
    <main>
      <CarsList />
      <div>
        <CarAddForm />
        <CarsFilters />
      </div>
    </main>
  );
};

export default App;
