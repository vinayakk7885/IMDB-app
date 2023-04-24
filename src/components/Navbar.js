import React from "react";
// import { StoreContext } from "..";
import { connect } from "react-redux";
import { addMovieToList, handleMoviesSearch } from "../actions";
class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchText: ''
        }
    }
    handleAddMovies=(movie)=>{
        this.props.dispatch(addMovieToList(movie));
        // this.setState({
        //     showSearchResults:false
        // })
    }
    handleSearch=()=>{
        const {searchText}=this.state;
        this.props.dispatch(handleMoviesSearch(searchText));
    }
    handleChange=(e)=>{
        this.setState({
            searchText: e.target.value
        });
    }
    render(){
        const { result: movie, showSearchResults }  = this.props.search;
        return(
            <div className="nav">
                <div className="search-container">
                    <input onChange={this.handleChange} />
                    <button id='search-btn' onClick={this.handleSearch}>Search</button>
                    {showSearchResults &&
                        <div className="search-results">
                            <div className="search-result">
                                <img src={movie.Poster} alt="searchPic"/>
                                <div className="movie-info">
                                    <span>{movie.Title}</span>
                                    <button onClick={()=>this.handleAddMovies(movie)}>
                                        Add To Movies
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
// class NavbarWrapper extends React.Component{
//     render(){
//       return (
//         <StoreContext.Consumer>
//             {(store)=> (
//                 <Navbar dispatch={store.dispatch} search={this.props.search} />
//             )}
//         </StoreContext.Consumer>
//       )
//     }
// }
function mapStateToProps({search}){
    return {
      search, 
    }
  }
  export default connect(mapStateToProps)(Navbar);