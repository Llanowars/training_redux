import React, { Component } from 'react';
import ReactDOM from 'react-dom'; 
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyDmb6Al9P1LrVQGctwbOzGmy7SS4emh2YI';

// Creer un composant qui rend du HTML
class App extends Component {
  constructor(props) {
    super(props);
    this.state = 
    { 
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('chicago music exchange');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({ 
        videos: videos,
        selectedVideo: videos[0] 
      });
    }); 
  }

  render() {
    return (
      <div>
        <SearchBar onSearchTermChange={term => this.videoSearch(term)}/>
        <div className="flexed">
          <VideoDetail video={this.state.selectedVideo} />
          <VideoList
            onVideoSelect={selectedVideo => this.setState({selectedVideo}) } 
            videos={this.state.videos} />
        </div>
      </div>
    );
  }
}

// Rendre ce composant dans le DOM 
ReactDOM.render(<App />, document.querySelector('.container'));