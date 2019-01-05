import React, { Component } from 'react'
import { getMovies } from '../services/fakeMovieService'
import { getGenres } from '../services/fakeGenreService'
import '../App.css'
import ListGroup from './common/listgroup'
import Pagination from './common/pagination'
import { paginate } from '../utils/paginate'
import MoviesTable from './moviesTable'
import _ from 'lodash'  

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: 'title', order:'asc'}
  }

  componentDidMount () {
    const genres = [{_id: '', name: 'All genres' }, ...getGenres()]
    this.setState({ movies: getMovies(), genres })
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id)
    this.setState({ movies })
  }

  handleLike = movie => {
    const movies = [...this.state.movies]
    const index = this.state.movies.indexOf(movie)
    movies[index].liked = !movies[index].liked
    this.setState({ movies })
  }

  handleGenreSelected = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 })
  }

  handlePageChange = page => {
    this.setState({ currentPage: page })
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn })
  }

  getPagedData = () =>{
    const {
      currentPage,
      selectedGenre,
      pageSize,
      sortColumn,
      movies: allMovies
    } = this.state
    
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies


    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
    const movies = paginate(sorted, currentPage, pageSize)

    return { totalCount: filtered.length, data: movies}
  }

  render () {
    const { length: count } = this.state.movies
    const {
      currentPage,
      pageSize,
      sortColumn
    } = this.state
    if (count === 0) return <p>There are no movies in database</p>

    const {totalCount, data: movies} = this.getPagedData();

    return (
      <div className='row'>
        <div className='col-3'>
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelected}
          />
        </div>
        <div className='col'>
          <p>There are {totalCount} Movies</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    )
  }
}

export default Movies
