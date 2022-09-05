import P from 'prop-types';
import './styles.css';
export const TextInput = ({ searchValue, handleChange }) => (
  <input className="text-input" type="search" onChange={handleChange} value={searchValue} placeholder="Search..." />
);

TextInput.propTypes = {
  searchValue: P.string.isRequired,
  handleChange: P.func.isRequired,
};
