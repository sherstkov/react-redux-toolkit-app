import { Transmission } from '@customTypes/Cars';

const FilterOptions = () => {
  const elements = Object.values(Transmission).map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));
  return <>{elements}</>;
};

export default FilterOptions;
