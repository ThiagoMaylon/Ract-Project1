import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from '.';

describe('<TextInput />', () => {
  it('should have a value of searchValue', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue="testing" />);
    const input = screen.getByPlaceholderText(/search/i);
    expect(input.value).toBe('testing');
  });
  it('should call handleChange function on each key pressed', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue="o valor" />);

    const input = screen.getByPlaceholderText(/search/i);
    const value = 'valor';

    userEvent.type(input, value);

    expect(input.value).toBe('o valor');
    expect(fn).toHaveBeenCalledTimes(value.length);
  });
  it('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<TextInput handleChange={fn} searchValue="" />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
