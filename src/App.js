import './App.css';
import { Component } from 'react';
import {LoadPosts} from './utils/Load-Post';
import { Posts } from './components/Posts';

//componente usnado classe
class App extends Component{
    state = {
      posts: []
    }
  
  async componentDidMount() {
    await this.loadPosts();
  }
  loadPosts = async () => {
    const PostAndPhoto = await LoadPosts();
    this.setState({posts: PostAndPhoto});
  }


  render(){
    const { posts } = this.state;

    return(
      <section className='conteiner'>
        <Posts posts={posts}/>
      </section>
    )
  }
}

// componente de função
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//          {1 + 2} olá mundoooo!!!!!!
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
