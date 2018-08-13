 // --- variables ---//
const tweetlist = document.getElementById('tweet-list');



// --- Event listener  --- //
(function eventListener() {
    // form submission
    document.querySelector('#form').addEventListener('submit', newTweet);

    // remove tweet from the list
    tweetlist.addEventListener('click' , removeTweet);

    // document
    document.addEventListener('DOMContentLoaded' , localStorageOnLoad )
}());



// ----- functions ---------// 


function newTweet(e) {
    // read the text area value
    
    const tweet = document.getElementById('tweet').value;
    
    // create remove button
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'x';
   
    // create <li> element
    const li = document.createElement('li');
    li.textContent = tweet;

    // add tweet to tweetlist
    tweetlist.appendChild(li);

    //add rmeovebtn to each tweet
    li.appendChild(removeBtn);
    
    //add to localstorage
    addTweetLocalStorage(tweet);

    //display the alert message
    alert('tweet added');

    console.log(this);
    this.reset();

};

// removetweet function

function removeTweet(e) {
    if(e.target.classList.contains('remove-tweet')) {
       e.target.parentElement.remove();
    } 
    
    // remove from storage
    removeTweetLocalStorage( e.target.parentElement.textContent )

};

//adds the tweet into the local storage
function addTweetLocalStorage(tweet) {
    let tweets = getTweetsFromStorage();

    // add the tweets into the array
    tweets.push(tweet);

    // convert the tweets array into string
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function getTweetsFromStorage() {
    let tweets;
    const tweetsLS = localStorage.getItem('tweets');
    // get the values, if null is returned then we can create an empty array
    if( tweetsLS === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(tweetsLS);
    }
    return tweets;
}

// prints localstorage tweets on load
function localStorageOnLoad() {
    let tweets = getTweetsFromStorage()
    
    //(forEach)loops through storage(tweets) and print the values
    tweets.forEach(function(tweet){
    
        // create remove button
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'x';
       
        // create <li> element
        const li = document.createElement('li');
        li.textContent = tweet;
    
        // add tweet to tweetlist
        tweetlist.appendChild(li);
    
        //add rmeovebtn to each tweet
        li.appendChild(removeBtn);
    })
}

//remove tweet from localstorage
function removeTweetLocalStorage(tweet) {
     let tweets = getTweetsFromStorage();

     //remove the x from the tweet
     const tweetDelete = tweet.substring(0, tweet.length -1);
     
     //loop through the tweets and remove the the tweet thats equal
     tweets.forEach(function(tweetLS, index){
        if(tweetDelete === tweetLS) {
            tweets.splice(index, 1);
        }
     })
     
      //save the data
     localStorage.setItem('tweets' , JSON.stringify(tweets));
}

