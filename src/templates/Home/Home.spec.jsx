import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title 1',
          body: 'body 1',
        },
        {
          userId: 2,
          id: 2,
          title: 'title 2',
          body: 'body 2',
        },
        {
          userId: 3,
          id: 3,
          title: 'title 3',
          body: 'body 3',
        },
        {
          userId: 4,
          id: 4,
          title: 'title 4',
          body: 'body 4',
        },
      ]),
    );
  }),
  rest.get('https://jsonplaceholder.typicode.com/photos', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          url: 'img1.jpg',
        },
        {
          url: 'img2.jpg',
        },
        {
          url: 'img3.jpg',
        },
        {
          url: 'img4.jpg',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => server.resetHandlers);
  afterAll(() => {
    server.close();
  });

  it('should render search, posts and more', async () => {
    render(<Home />);
    const noMorePosts = screen.queryByText('não existe poste para:');
    expect.assertions(3);
    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/Search.../i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);

    const button = screen.getByRole('button', { name: /Load more Posts/i });
    expect(button).toBeInTheDocument();
  });
  it('should search more posts', async () => {
    render(<Home />);
    const noMorePosts = screen.queryByText('não existe poste para:');
    expect.assertions(13);
    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/Search.../i);

    expect(screen.getByRole('heading', { name: /title 1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title 2/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title 3' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title 4' })).not.toBeInTheDocument();

    userEvent.type(search, 'title 1');
    expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title 2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title 3' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title 4' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'search: title 1' })).toBeInTheDocument();

    userEvent.clear(search);
    expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title 2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title 3' })).toBeInTheDocument();

    userEvent.type(search, 'asdd');
    expect(screen.getByText('não existe poste para: asdd')).toBeInTheDocument();
  });
  it('should render button load posts', async () => {
    render(<Home />);
    const noMorePosts = screen.queryByText('não existe poste para:');
    expect.assertions(4);
    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /Load more Posts/i });
    expect(button).toBeEnabled();
    expect(screen.queryByRole('heading', { name: 'title 4' })).not.toBeInTheDocument();

    userEvent.click(button);
    expect(screen.getByRole('heading', { name: 'title 4' })).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
