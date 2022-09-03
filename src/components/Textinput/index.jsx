import './styles.css'
export const TextInput = ({searchValue, handleChange}) => (
    <input 
          className='text-input'
          type="search"
          onChange={handleChange}
          value={searchValue}
          placeholder='Search...'
        />
)