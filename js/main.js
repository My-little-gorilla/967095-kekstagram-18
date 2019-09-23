'use strict';
(function () {
  var TOTAL_POSTS = 25;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getElement = function (element) {
    return document.querySelector(element);
  };

  var names = [
    'guuu',
    'juuu',
    'kuuu',
    'luuu',
    'buuu',
    'duuu'
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
  ];
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
      avatar: getRandomPostItem(avatars),
      message: getRandomPostItem(comments),
      name: getRandomPostItem(names)
    };
    return userComment;
  };


  var getRandomPicture = function () {
    var photo = photos.pop();
    var likes = getRandomLikes();

    var picture = {
      url: photo,
      likes: likes,
      comments: getRandomPostItem(comments),
      description: getRandomPostItem(descriptions)
    };
    return picture;
  };


  var randomComments = getRandomItems(getRandomComment);
  var randomPictures = getRandomItems(getRandomPicture);

  var renderPictures = function (pictures) {
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


  var renderComment = function () {
    var containerPostPicture = getElement('.big-picture');
    containerPostPicture.classList.remove('hidden');


    var socialBigPicture = getElement('.big-picture__img img');
    socialBigPicture.src = randomPictures[getRandomNumber(0, randomPictures.length)].url;

    var likeCount = getElement('.likes-count');
    likeCount.textContent = randomPictures[getRandomNumber(0, randomPictures.length)].likes;

    var commentCount = getElement('.comments-count');
    commentCount.textContent = getRandomNumber(0, randomPictures.length);


    var avatarsImg = document.querySelectorAll('.social__picture');
    for (var i = 0; i < avatars.length; i++) {
      avatarsImg[i].src = randomComments[getRandomNumber(0, avatars.length)].avatar;
      avatarsImg[i].alt = randomComments[getRandomNumber(0, randomComments.length)].name;
    }

    var commentsText = document.querySelectorAll('.social__text');
    for (var j = 0; j < commentsText.length; j++) {
      commentsText[j].textContent = randomComments[getRandomNumber(0, comments.length)].message;
    }

    var userMessage = getElement('.social__caption');
    userMessage.textContent = randomPictures[getRandomNumber(0, descriptions.length)].description;
  };
  renderComment();

  var commentCount = getElement('.social__comment-count');
  commentCount.classList.add('visually-hidden');
  var commentLoader = getElement('.comments-loader');
  commentLoader.classList.add('visually-hidden');

})();
