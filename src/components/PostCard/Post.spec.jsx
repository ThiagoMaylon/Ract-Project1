import { render, screen } from "@testing-library/react";
import { PostCard } from ".";
import { PostCardPropsMock } from "./mock";

const props = PostCardPropsMock;

describe('<PostCard />', () =>{
    it('should render postcard correctly', () => {
        render(<PostCard {...props} />);
       //verifica se a imgem tem o titulo correto
        expect(screen.getByRole('img', {name: props.title})) 
        // verifica se tem a imagem no caminho correto
            .toHaveAttribute('src', props.cover); 
        //verifica se tem o titulo correto no H1 ate o h6 ou header
        expect(screen.getByRole('heading', {name: props.title})).toBeInTheDocument();
        //verifica se tem o texto correto
        expect(screen.getByText(`${props.body}`)).toBeInTheDocument();
    });
    it('should match snapshot', () => {
        const {container} = render(<PostCard {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    })
})