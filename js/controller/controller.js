import MovieListModel from '/js/model/MovieListModel.js';
import MovieItemModel from '/js/model/MovieItemModel.js';
import MovieListView from '../view/MovieListView.js';
import MovieDetailView from '../view/MovieDetailView.js';


class Controller {
    constructor() {

        this.movieListModel = new MovieListModel();
        this.movieListView = new MovieListView(this);
        this.movieDetailView = new MovieDetailView(this);
        this.movieItemModel = new MovieItemModel();
        this.movieObjects = [];

    }
    async init() {
        // this.movieListModel
        //     .fetchUpcomingMovie(this.movieListModel.key)
        //     .then(data => this.getUpcomingMovieData(data))
        //     .then(data => this.displayMovieList(data));
        const result1 = await this.movieListModel.fetchUpcomingMovie(this.movieListModel.key);
        const result2 = await this.getUpcomingMovieData(result1);
        this.displayMovieList(result2);
    }

    async displayDetail(id) {
        /*console.log(this.movieItemModel);
        const promiseResult = this.movieItemModel.fetchMovieDetail(id, this.movieItemModel.key);
        promiseResult.then(data => this.movieDetailView.render(data));*/
        const promiseResult = await this.movieItemModel.fetchMovieDetail(id, this.movieItemModel.key);
        this.movieDetailView.render(promiseResult);
    }

    displayMovieList(movieObjects) {
        const templates = [];
        for (const movieObj of movieObjects) {
            templates.push(this.movieListView.getItemTemplate(movieObj));
        }

        this.movieListView.render(templates);
    }

    changeListView() {
        this.displayMovieList(this.movieObjects);
    }

    getUpcomingMovieData(data) {
        this.movieObjects = [];
        for (let movie of data) {
            const movieObj = new MovieItemModel(movie.id, movie.title, movie.poster_path, movie.overview, "");
            this.movieObjects.push(movieObj);
        }
        return this.movieObjects;
    }


}

export default Controller;