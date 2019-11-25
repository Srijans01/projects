document.getElementById('myForm').addEventListener('submit',saveBookmark);


function saveBookmark(e){
    var siteName = document.getElementById('siteName').value    ;
    var siteUrl = document.getElementById('siteUrl').value    ;

   
    
    if(!validateForm(siteName,siteUrl))
    {
        return false;
    }
    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    if(localStorage.getItem('bookmarks') === null)
    {
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    else{
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    fetchBookmarks();

    document.getElementById('myForm').reset();

    e.preventDefault();
}

function deleteBookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i=0;i<bookmarks.length;i++)
    {
        if(bookmarks[i].url == url)
        {
            bookmarks.splice(i,1)
        }
    }

localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

fetchBookmarks();
}

function fetchBookmarks()
    {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        var bookmarksResults = document.getElementById('bookmarksResults');
        bookmarksResults.innerHTML='';
        for(var i=0;i < bookmarks.length;i++)
        {
            var name = bookmarks[i].name;
            var url = bookmarks[i].url;
            bookmarksResults.innerHTML += '<div class="well">'+
                                            '<h3>'+name+
                                            '<a class="btn btn-default" target="_blank" href="'+addhttp(url)+'">VISIT</a>'+
                                            '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">DELETE</a>'+
                                            '</h3>'+
                                            '</div>';
        }
    }

    function validateForm(siteName,siteUrl)
    {
    if(!siteName || !siteUrl)
    {
        alert('please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
      alert('please use a valid url')
      return false
  }

        return true;
    }
    function addhttp(url) {
        if (!!url && !!url.trim()) { //Check if url is not blank
            url = url.trim(); //Removes blank spaces from start and end
            if (!/^(https?:)?\/\//i.test(url)) { //Checks for if url doesn't match either of: http://example.com, https://example.com AND //example.com
                url = 'http://' + url; //Prepend http:// to the URL
            }
        } else {
            //Handle empty url
        }
        return url;
    }