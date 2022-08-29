import { Button } from '.';
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';


describe('<Button />', () => {
    it("should render the button with the text", () => {
       render(<Button text='Load more'/>)
       expect.assertions(1)
       const button = screen.getByRole('button', {name: /load more/i});
       expect(button).toBeInTheDocument();
    });
    it('should call function on button click', () => {
        const fn = jest.fn();
        render(<Button text="Load more" onClick={fn} />);
        const button = screen.getByRole('button', {name: /load more/i});

        userEvent.click(button);

        expect(fn).toHaveBeenCalled();
    });
    it('button is disabled', () => {
        render(<Button text='Load more' disabled={true}/> );
        const button = screen.getByRole('button', {name: /load more/i});

        expect(button).toBeDisabled();
    });
    it('button is eneblad', () => {
        render(<Button text='Load more' disabled={false}/>);
        const button = screen.getByRole('button', {name: /load more/i});

        expect(button).toBeEnabled();
    });
    it('should match snapshot', () => {
        const {container} = render(<Button text='Load more'/>);

        expect(container.firstChild).toMatchSnapshot();
    })
})