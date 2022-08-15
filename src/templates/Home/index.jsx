import './styles.css';
import { Component } from 'react';
import {LoadPosts} from '../../utils/Load-Post';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';

export class Home extends Component{
    state = {
      posts: [],
      allPosts: [],
      page: 0,
      postsPerPage: 3,
    }
  
  async componentDidMount() {
    await this.loadPosts();
  }
  loadPosts = async () => {
    const PostAndPhoto = await LoadPosts();
    const { page, postsPerPage} = this.state;
    this.setState({
      posts: PostAndPhoto.slice(page, postsPerPage),
      allPosts: PostAndPhoto
    });
  }
  loadMorePosts = () => {
    const {
      page,
      allPosts, 
      postsPerPage,
      posts

    } = this.state;

    const nextPage = page + postsPerPage;
    const nextPost = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPost)

    this.setState({posts, page: nextPage})
  }


  render(){
    const { posts, page, postsPerPage, allPosts } = this.state;
    const noMorePost = page + postsPerPage >= allPosts.length;

    return(
      <section className='conteiner'>
        <Posts posts={posts}/>

        <div className="button-conteiner">
          <Button 
            text="Load more Posts"
            onClick={this.loadMorePosts}
            disabled={noMorePost}
            />
        </div>
        
      </section>
    )
  }
}