import APIDataModel from "./APIModel.js";


class MovieListModel extends APIDataModel {
   
    getUpcomingApiUrl(key){
        return this.rootURL + this.upcoming_path.replace("<<api_key>>",key);
    }

    // fetchUpcomingMovie(key){
    //     return fetch(this.getUpcomingApiUrl(key))
    //         .then(res => res.json())
    //         .then(data=> data.results);
    // }

    async fetchUpcomingMovie(key){
        const fetchedResult = await fetch(this.getUpcomingApiUrl(key));
        const jsonResult = await fetchedResult.json();
        return jsonResult.results;
    }

   
    
}

export default MovieListModel;