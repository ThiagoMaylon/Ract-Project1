import P from 'prop-types';
import { PostCard } from '../PostCard';
import './styles.css';

export const Posts = ({ posts = [] }) => (
  <div className="Posts">
    {posts.map((post) => (
      <PostCard key={post.id} title={post.title} id={post.id} body={post.body} cover={post.cover} post={post} />
    ))}
  </div>
);

Posts.defaultProps = {
  posts: [],
};

Posts.propTypes = {
  posts: P.array,
};
