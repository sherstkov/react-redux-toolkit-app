import '@styles/globals.css';
import { CarsList, CarAddForm } from '@components/index';
import { FC } from 'react';

const App: FC = () => {
  return (
    <main>
      <CarsList />
      <CarAddForm />
    </main>
  );
};

export default App;
