import Vue from 'vue'
import store from 'store/index'

function tweetFromStatus (status) {
  return {
    id: status.id_str,
    author: {
      image_url: status.user.profile_image_url,
      name: status.user.name,
      screen_name: status.user.screen_name
    },
    created_at: status.created_at,
    content: status.text
  }
}

export function getTweetsFromAPI () {
  return new Promise( (resolve, reject) => {
    let hashtag = store.state.hashtag
    Vue.http.get(`search/${hashtag}`)
    .then((response) => {
      if(response.data.statuses.length > 20) {
        console.log('success: ', response.data)
        response.data.statuses.forEach((status) => {
          //TODO (Victor) : gérer les différents types de tweets (médias différents, image, vidéo)
          //TODO (Victor) : faire une factory qui crée un type selon son type de média
          let tweet = tweetFromStatus(status)
          store.dispatch('addTweet', tweet)
        })
        resolve()
      } else {
        console.log('Sorry but your hashtag seems to be not very famous')
        reject()
      }
    }, (response) => {
      console.log('error: ', response)
      reject()
    })
  })
}
