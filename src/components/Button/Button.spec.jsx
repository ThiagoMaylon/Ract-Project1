import { Button } from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<Button />', () => {
  it('should render the button with the text', () => {
    const fn = jest.fn();
    render(<Button text="Load more" disabled={false} onClick={fn} />);
    expect.assertions(1);
    const button = screen.getByRole('button', { name: /load more/i });
    expect(button).toBeInTheDocument();
  });
  it('should call function on button click', () => {
    const fn = jest.fn();
    render(<Button text="Load more" disabled={false} onClick={fn} />);
    const button = screen.getByRole('button', { name: /load more/i });

    userEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);
  });
  it('button is disabled', () => {
    const fn = jest.fn();
    render(<Button text="Load more" disabled={true} onClick={fn} />);
    const button = screen.getByRole('button', { name: /load more/i });
    expect(button).toBeDisabled();
  });
  it('button is enabled', () => {
    const fn = jest.fn();
    render(<Button text="Load more" disabled={false} onClick={fn} />);
    const button = screen.getByRole('button', { name: /load more/i });
    expect(button).toBeEnabled();
  });
  it('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<Button text="Load more" disabled={false} onClick={fn} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
