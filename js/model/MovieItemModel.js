import APIDataModel from "./APIModel.js";

class Movie extends APIDataModel{
    constructor(id,title,poster,overview,link){
        super();
        this.id = id;
        this.title = title;
        this.poster = poster;
        this.overview = overview;
        this.link =link;        
    }
    

    getDetailApiUrl(movie_id,key){
        return this.generateApiPath(this.detail_path,movie_id,key);
    }

    getVideoApiUrl(movie_id,key){
        return this.generateApiPath(this.videos_path,movie_id,key);
    }


    generateApiPath(raw_url,movie_id,key){
        return this.rootURL + raw_url.replace("{movie_id}",movie_id).replace("<<api_key>>",key);
    }

    // fetchMovieDetail(movie_id,key){
    //     return fetch(this.getDetailApiUrl(movie_id,key))
    //         .then(res => res.json())
    //         .then(data=> this.updateData(data));
    // }

    async fetchMovieDetail(movie_id,key){
        //Detail information
        const fetchResult = await fetch(this.getDetailApiUrl(movie_id,key));
        const jsonData = await fetchResult.json();

        //List of videos
        const fetchVideoResult = await fetch(this.getVideoApiUrl(movie_id,key));
        const videoJsonData = await fetchVideoResult.json();
        const videoArrray = videoJsonData.results;

        return this.updateData(jsonData,videoArrray);
    }

    updateData(data,videos){
        console.log(data);
        this.id = data.id;
        this.title = data["original_title"];
        this.poster = data["poster_path"];
        this.overview = data["overview"];
        this.videos = videos;
        return this;
    }

}

export default Movie;