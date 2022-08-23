import './styles.css';
import { Component, useEffect, useState } from 'react';
import {LoadPosts} from '../../utils/Load-Post';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { Textinput } from '../../components/Textinput';
import { useCallback } from 'react';



export const Home = () => {

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const [searchValue, setSearchValue] = useState("");



    const noMorePost = page + postsPerPage >= allPosts.length;

    const filteredPost = !!searchValue ? allPosts.filter((post) => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      )
    }) 
    : posts;

    
    const handleLoadPosts = useCallback( async (page, postsPerPage) => {
      const PostAndPhoto = await LoadPosts();
      setPosts(PostAndPhoto.slice(page, postsPerPage),);
      setAllPosts(PostAndPhoto)
    }, [])


    useEffect(() => {
      handleLoadPosts(0, postsPerPage);
    }, [handleLoadPosts, postsPerPage]);

    const loadMorePosts = () => {

    const nextPage = page + postsPerPage;
    const nextPost = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPost)

    setPosts(posts);
    setPage(nextPage)
  }
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value)
  }

  return(

    <section className='conteiner'>
      <div className="search-conteiner">
        {!!searchValue && (
            <h1>search: {searchValue}</h1>
            
        )}
        
        <Textinput 
        searchValue={searchValue}
        handleChange={handleChange}/>
      </div>

      {filteredPost.length > 0 &&(
        <Posts posts={filteredPost}/>
      )}
      {filteredPost.length === 0 &&(
        <p>não esxiste postes para: {searchValue}</p>
      )}

      <div className="button-conteiner">
        {!searchValue &&(
          <Button 
          text="Load more Posts"
          onClick={loadMorePosts}
          disabled={noMorePost}
          />
        )}
       
      </div>
      
    </section>
  )
}





// export class Home extends Component{
//     state = {
//       posts: [],
//       allPosts: [],
//       page: 0,
//       postsPerPage: 3,
//       searchValue: ''
//     }
  
//   async componentDidMount() {
//     await this.loadPosts();
//   }
//   loadPosts = async () => {
//     const PostAndPhoto = await LoadPosts();
//     const { page, postsPerPage} = this.state;
//     this.setState({
//       posts: PostAndPhoto.slice(page, postsPerPage),
//       allPosts: PostAndPhoto
//     });
//   }
//   loadMorePosts = () => {
//     const {
//       page,
//       allPosts, 
//       postsPerPage,
//       posts,

//     } = this.state;

//     const nextPage = page + postsPerPage;
//     const nextPost = allPosts.slice(nextPage, nextPage + postsPerPage);
//     posts.push(...nextPost)

//     this.setState({posts, page: nextPage})
//   }
//   handleChange = (e) => {
//     const { value } = e.target;
//     this.setState({searchValue: value})
//   }

//   render(){
//     const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
//     const noMorePost = page + postsPerPage >= allPosts.length;

//     const filteredPost = !!searchValue ? allPosts.filter((post) => {
//       return post.title.toLowerCase().includes(
//         searchValue.toLowerCase()
//       )
//     }) : posts;

    
//     return(
//       <section className='conteiner'>
//         <div className="search-conteiner">
//           {!!searchValue && (
//               <h1>search: {searchValue}</h1>
              
//           )}
          
//           <Textinput 
//           searchValue={searchValue}
//           handleChange={this.handleChange}/>
//         </div>

//         {filteredPost.length > 0 &&(
//           <Posts posts={filteredPost}/>
//         )}
//         {filteredPost.length === 0 &&(
//           <p>não esxiste postes para: {searchValue}</p>
//         )}

//         <div className="button-conteiner">
//           {!searchValue &&(
//             <Button 
//             text="Load more Posts"
//             onClick={this.loadMorePosts}
//             disabled={noMorePost}
//             />
//           )}
         
//         </div>
        
//       </section>
//     )
//   }
// }
