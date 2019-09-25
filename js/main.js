'use strict';
(function () {
  var TOTAL_POSTS = 25;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var NAMES = ['guuu', 'juuu', 'kuuu', 'luuu', 'buuu', 'duuu'];
  var AVATARS = ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'];
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var DESCRIPTIONS = [
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
    ];

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };


  var findElement = function (query, element, all) {
  if (!element) {
    element = document;
  }
  var method = 'querySelector' + (all ? 'All' : '');
  return element[method](query);
}


  var template = findElement('#picture').content.querySelector('.picture');
  var container = findElement('.pictures');


  var getUrlPicture = function (sumPictures) {
    var pictures = [];
    for (var i = 1; i <= sumPictures; i++) {
      pictures[i] = 'photos/' + i + '.jpg';
    }
    return pictures;
  };
  var photos = getUrlPicture(TOTAL_POSTS);


  var getRandomLikes = function () {
    return getRandomNumber(MIN_LIKES, MAX_LIKES);
  };

  var getRandomPostItem = function (item) {
    return item[getRandomNumber(0, item.length)];
  };

  var getRandomItems = function (returnedFunction) {
    var currentArr = [];
    for (var i = 1; i <= TOTAL_POSTS; i++) {
      currentArr[i - 1] = returnedFunction();
    }
    return currentArr;
  };


  var getRandomComment = function () {
    var userComment = {
      avatar: getRandomPostItem(AVATARS),
      message: getRandomPostItem(COMMENTS),
      name: getRandomPostItem(NAMES)
    };
    return userComment;
  };


  var getRandomPicture = function () {
    var photo = photos.pop();
    var likes = getRandomLikes();

    var picture = {
      url: photo,
      likes: likes,
      comments: getRandomPostItem(COMMENTS),
      description: getRandomPostItem(DESCRIPTIONS)
    };
    return picture;
  };


  var randomComments = getRandomItems(getRandomComment);
  var randomPictures = getRandomItems(getRandomPicture);

  var renderPictures = function (pictures) {
    var fragment = document.createDocumentFragment();

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

})();
