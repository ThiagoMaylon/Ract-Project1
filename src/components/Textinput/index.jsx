import './styles.css'
export const Textinput = ({searchValue, handleChange}) => (
    <input 
          className='text-input'
          type="search"
          onChange={handleChange}
          value={searchValue}
          placeholder='Search...'
        />
)