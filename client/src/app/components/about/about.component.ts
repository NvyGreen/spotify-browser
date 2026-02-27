import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    standalone: false
})
export class AboutComponent implements OnInit {
  name:string = null;
  profile_pic:string = "assets/unknown.jpg";
  profile_link:string = null;


  //TODO: inject the Spotify service
  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
    this.spotifyService.aboutMe().then((userInfo) => {
      this.name = userInfo.name;
      this.profile_pic = userInfo.imageURL;
      this.profile_link = userInfo.spotifyProfile;
    }).catch((err) => {
      console.error('Error fetching user info:', err);
    });
  }

   /*TODO: create a function which gets the "about me" information from Spotify when the button in the view is clicked.
  In that function, update the name, profile_pic, and profile_link fields */
  aboutUser() {
    this.spotifyService.aboutMe().then((userInfo) => {
      this.name = userInfo.name;
      this.profile_pic = userInfo.imageURL;
      this.profile_link = userInfo.spotifyProfile;
    }).catch((err) => {
      console.error('Error fetching user info:', err);
    });
  }

}
