'use strict';
(function () {
var TOTAL_POSTS = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;

var getRandomNumber = function (min , max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var names = [
  "guuu",
  "juuu",
  "kuuu",
  "luuu",
  "buuu",
  "duuu"
];

var avatars = [
  'img/avatar-1.svg',
  'img/avatar-2.svg',
  'img/avatar-3.svg',
  'img/avatar-4.svg',
  'img/avatar-5.svg',
  'img/avatar-6.svg'
];

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var descriptions = [
  'weeeeeeeeeeeeee666',
  'weeeeeeeeeeeeee7543',
  'weeeeeeeeeeeeee99',
  'weeeeeeeeeeeeee78',
  'weeeeeeeeeeeeee278',
  'weeeeeeeeeeeeee33',
  'weeeeeeeeeeeeee894',
  'weeeeeeeeeeeeee677',
  'weeeeeeeeeeeeee67',
  'weeeeeeeeeeeeee23'
]
var getUrlPicture = function () {
  var pictures = [];
  for (var i = 1; i <= TOTAL_POSTS; i++) {
    pictures[i] = 'photos/' + i + '.jpg';
  }
  return pictures;
}
var photos = getUrlPicture();


var getRandomLikes = function() {
  return getRandomNumber(MIN_LIKES, MAX_LIKES);
};

var getRandomPostItem = function (item) {
  return item[getRandomNumber(0, item.length)];
}

var getRandomItems = function(currentArr, returnedFunction) {
  var currentArr = [];
  for (var i = 0; i <= TOTAL_POSTS; i++) {
    currentArr[i] = returnedFunction();
  }
  return currentArr;
};


var getRandomComment = function() {
  var userComment = {
    avatar: getRandomPostItem(avatars),
    message: getRandomPostItem(comments),
    name: getRandomPostItem(names)
  };
  return userComment;
};


var getRandomPicture = function() {
  var photo = photos.pop();
  var likes = getRandomLikes();

  var picture = {
  url: photo,
  likes: likes,
  comments: getRandomPostItem(comments),
  description: getRandomPostItem(descriptions)
}
  return picture;
};


var randomComments = getRandomItems('userRandomComments', getRandomComment);
var randomPictures = getRandomItems('userRandomPictures', getRandomPicture);


var renderPictures = function(pictures) {
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('#picture').content.querySelector('.picture');
  var container = document.querySelector('.pictures');

  for (var i = 0; i < pictures.length; i++) {
    var picture = pictures[i];
    var pictureElement = template.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    fragment.appendChild(pictureElement);
  }
  container.appendChild(fragment);
};


renderPictures(randomPictures);
})()
