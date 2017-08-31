var request = require('request');
var cheerio = require('cheerio');
var rp = require('request-promise');

// function parseImages(url) {
//     var list = [];
//     var test = request(url, function (error, response, body) {
//         // var list = [];
//         var $ = cheerio.load(body);
//         console.log($("img"))
//         var listTest = $('img').map(function(){
//             return $(this).attr("src");
//             // list.push(src);
//             // console.log("__________________")
//             // console.log(list`);
//             // console.log(src)
//             // console.log("_____&&____")
//         });
//         return listTest;
//     });
// }

var imgArr = [];
var newObj = [];

// route
// var url = req.body.url;
// parseImages3(url);
// function parseImages3(url) {
//     var test = request(url, function (error, response, body) {
//         var $ = cheerio.load(body);
//         console.log("______________________")
//         // console.log($)
//         var listTest = $('img').map(function(){
//             return $(this).attr("src");
//         }).get();
//         // console.log(listTest);
//         imgArr = listTest;
//         gimmeTheArray(imgArr);
//         // throwInImageTag(imgArr)
//     });
// }


class ImageList{
    constructor(url){
        this.images = [];
        this.url = url;
    }

    switchArrs(arr,obj) {
        obj.images = arr;
        newObj = obj.images;
        return newObj;
    }

    parseImages3(callback,obj) {
        request(this.url, function (error, response, body) {
            var $ = cheerio.load(body);
            var listTest = $('img').map(function(){
                return $(this).attr("src");
            }).get();
            callback(listTest, obj);
        });
    };

}

let test = new ImageList('http://www.fromvalerieskitchen.com/blackberry-lemonade-margaritas/');
test.parseImages3(test.switchArrs, test);
console.log(test);
console.log(newObj);









// function gimmeTheArray(arr){
//     return arr;
// }


// function parseImages2(url) {
//     var options = {
//         uri: url,
//         transform: function (body) {
//             return cheerio.load(body);
//         }
//     }
//     var list = [];
//     var callback = function(){
//         rp(options).then(function($){
//         // var list = [];
//         $('img').each(function(){
//             var src = $(this).attr("src");
//             list.push(src);
//             // console.log("__________________")
//             // console.log(list`);
//             // console.log(src)
//             // console.log("_____&&____")
//         });
//         return list;
//     });
//     }
//     var results = {
//         one: callback(),
//         two: list
//     }
//     return results;
// }

// var $ = request('http://www.fromvalerieskitchen.com/blackberry-lemonade-margaritas/', function (error, response, body) {
//     return cheerio.load(body)
// });

// function parseImages(url) {
//     $('img').each(function(){
//         var src = $(this).attr("src");
//         list.push(src);
//             // console.log("__________________")
//             // console.log(list`);
//             // console.log(src)
//             // console.log("_____&&____")
//     });
//     console.log(list);
//     return list;
// }    
// console.log(imgArr);
// parseImages3('http://www.fromvalerieskitchen.com/blackberry-lemonade-margaritas/');
// console.log(imgArr);

// console.log(body);

// function collectImages(url){
//     request(url, function (error, response, body) {
//         var $ = cheerio.load(body);
//         return $('img').map(function(){
//             return $(this).attr("src");
//         });
//     });
// }

// var berries = new imageList('http://www.fromvalerieskitchen.com/blackberry-lemonade-margaritas/')
// console.log(berries.list);

// function collectImages($) {
//     var list = [];
//     console.log($("img"))
//     list = $("img").map(function() {
//         return $(this).attr("src");
//     });
//     console.log("collect imgs");
//     return list;
// }

// console.log(parseImages('http://www.fromvalerieskitchen.com/blackberry-lemonade-margaritas/'))

// function parseImages(url){
//     request(url, function (error, response, body) {
//         var $ = cheerio.load(body);
//         collectImages($);
//         return;
//     });
    
// }

// var imageReturn = parseImages('http://www.fromvalerieskitchen.com/blackberry-lemonade-margaritas/');
// console.log(imageReturn);
// console.log(parseImages('http://www.fromvalerieskitchen.com/blackberry-lemonade-margaritas/'))

// console.log(collectImages('http://www.fromvalerieskitchen.com/blackberry-lemonade-margaritas/', parseImages));
// console.log(parseImages('http://www.fromvalerieskitchen.com/blackberry-lemonade-margaritas/'));

function crawl() {
   if(numPagesVisited >= MAX_PAGES_TO_VISIT) {
     console.log("Reached max limit of number of pages to visit.");
     return;
   }
   var nextPage = pagesToVisit.pop();
   if (nextPage in pagesVisited) {
     // We've already visited this page, so repeat the crawl
     crawl();
    } else {
       // New page we haven't visited
       visitPage(nextPage, crawl);
     }
   }

   function visitPage(url, callback) {
    // Add page to our set
    pagesVisited[url] = true;
    numPagesVisited++;

     // Make the request
    console.log("Visiting page " + url);
    request(url, function(error, response, body) {
    var $ = cheerio.load(body);
      // Check status code (200 is HTTP OK)
      console.log("Status code: " + response.statusCode);
      collectImages($);
      if(response.statusCode !== 200) {
        callback();

          return;
       }
      // Parse the document body

     // var isWordFound = searchForWord($, SEARCH_WORD);

    // if(isWordFound) {
     //   console.log('Word ' + SEARCH_WORD + ' found at page ' + url);
    // } else {
       collectInternalLinks($);
       // In this short program, our callback is just calling crawl()
       callback();
   //  }
   });
}

   function searchForWord($, word) {
   var bodyText = $('html > body').text().toLowerCase();
  return(bodyText.indexOf(word.toLowerCase()) !== -1);
    }

function collectImages($) {

   return $("img").map(function() {
        return $(this).text();
     }).get();
      }

 function collectInternalLinks($) {

     var relativeLinks = $("a[href^='/']");
     console.log("Found " + relativeLinks.length + " relative links on page");
     relativeLinks.each(function() {
         pagesToVisit.push(baseUrl + $(this).attr('href'));
     });
 }
