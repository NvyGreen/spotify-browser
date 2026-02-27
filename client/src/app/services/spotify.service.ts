import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first, firstValueFrom } from 'rxjs';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { keyframes } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://127.0.0.1:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //Specifically, update the URI according to the base URL for express and the endpoint.
    var uri:string = `${this.expressBaseUrl}${endpoint}`;

    //firstValueFrom generates a Promise for whatever is returned first from the GET request.
    //You shouldn't need to update this part.
    return firstValueFrom(this.http.get(uri)).then((response) => {
      return response;
    }, (err) => {
      return err;
    });
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    var endpoint:string = `/search/${category}/${encodeURIComponent(resource)}`;
    
    return this.sendRequestToExpress(endpoint).then((response) => {
      if (category == 'artist') {
        let items = response["artists"]["items"];
        let artistObjects = Object.entries(items).map(([key, value]) => {
          return new ArtistData(value);
        });
        return artistObjects
      } else if (category == 'album') {
        let items = response["albums"]["items"];
        let albumObjects = Object.entries(items).map(([key, value]) => {
          return new AlbumData(value);
        });
        return albumObjects;
      } else {
        let items = response["tracks"]["items"];
        let trackObjects = Object.entries(items).map(([key, value]) => {
          return new TrackData(value);
        });
        return trackObjects;
      }
    }, (err) => {
      return err;
    })
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    var endpoint:string = `/artist/${encodeURIComponent(artistId)}`;

    return this.sendRequestToExpress(endpoint).then((response) => {
      return new ArtistData(response);
    }, (err) => {
      return err;
    });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    var endpoint:string = `/artist-top-tracks/${encodeURIComponent(artistId)}`;

    return this.sendRequestToExpress(endpoint).then((response) => {
      let items = response["tracks"];
      let trackObjects = Object.entries(items).map(([key, value]) => {
        return new TrackData(value);
      });
      return trackObjects;
    }, (err) => {
      return err;
    });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    var endpoint:string = `/artist-albums/${encodeURIComponent(artistId)}`;

    return this.sendRequestToExpress(endpoint).then((response) => {
      let items = response["items"];
      let albumObjects = Object.entries(items).map(([key, value]) => {
        return new AlbumData(value);
      });
      return albumObjects;
    }, (err) => {
      return err;
    });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    var endpoint:string = `/album/${encodeURIComponent(albumId)}`;

    return this.sendRequestToExpress(endpoint).then((response) => {
      return new AlbumData(response);
    }, (err) => {
      return err;
    });
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    var endpoint:string = `/album-tracks/${encodeURIComponent(albumId)}`;

    return this.sendRequestToExpress(endpoint).then((response) => {
      let items = response["items"];
      let trackObjects = Object.entries(items).map(([key, value]) => {
        return new TrackData(value);
      });
      return trackObjects;
    }, (err) => {
      return err;
    });
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    var endpoint:string = `/track/${encodeURIComponent(trackId)}`;

    return this.sendRequestToExpress(endpoint).then((response) => {
      return new TrackData(response);
    }, (err) => {
      return err;
    });
  }
}