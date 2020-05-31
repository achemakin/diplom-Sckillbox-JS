import Unsplash, { toJson } from 'unsplash-js';
import fetch from 'node-fetch';
global.fetch = fetch;

export const unsplash = new Unsplash({
  accessKey: "xM8TJwVqlJ9X1X0hlmn-L7rLfesPasIISOAVyJVpdlo",
  secret: "ilupiW84mp4XShKkbqpMbL3UOOcMBnBxQgJguetNfBo",
  callbackUrl: "http://ct77550.tmweb.ru/photo_tape/"
});

export const authenticationUrl = unsplash.auth.getAuthenticationUrl([
    "public",
    "write_likes"
]);

export const setAccessTokenUnplash = (code) => {
    unsplash.auth.userAuthentication(code)
      .then(res => res.json())
      .then(json =>
        localStorage.setItem('token', json.access_token)
      );        
};

export const listPhoto = (start, token) => {
    unsplash.auth.setBearerToken(token);

    return unsplash.photos.listPhotos(start, 10, "latest")
      .then(res => res.json());       
};

export const likePhoto = (id, token) => {
  unsplash.auth.setBearerToken(token);
  unsplash.photos.likePhoto(id)
  .then(toJson)
  .then(json => {  
  });
};

export const unlikePhoto = (id, token) => {
  unsplash.auth.setBearerToken(token);
  unsplash.photos.unlikePhoto(id)
  .then(toJson)
  .then(json => { 
  });          
};