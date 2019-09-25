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


  // перенести в модуль

  var postContainer = find('.big-picture__preview');
  var containerPostPicture = findElement('.big-picture', postContainer);
  var socialBigPicture = findElement('.big-picture__img img', postContainer);
  var likeCount = findElement('.likes-count', postContainer);
  var commentCount = findElement('.comments-count', postContainer);
  var AVATARS = findElement('.social__picture', postContainer, true);
  var commentsText = findElement('.social__text', postContainer, true);
  var userMessage = findElement('.social__caption', postContainer);

  var renderPost = function (postElement) {
    containerPostPicture.classList.remove('hidden');
    socialBigPicture.src = postElement[getRandomNumber(0, postElement.length)].url;
    likeCount.textContent = postElement[getRandomNumber(0, postElement.length)].likes;
    commentCount.textContent = getRandomNumber(0, postElement.length);
    userMessage.textContent = postElement[getRandomNumber(0, DESCRIPTIONS.length)].description;
  }

  var renderComment = function (commentElement) {
    for (var i = 0; i < AVATARS.length; i++) {
      AVATARS[i].src = commentElement[getRandomNumber(0, AVATARS.length)].avatar;
      AVATARS[i].alt = commentElement[getRandomNumber(0, commentElement.length)].name;
    }
    for (var j = 0; j < commentsText.length; j++) {
      commentsText[j].textContent = commentElement[getRandomNumber(0, COMMENTS.length)].message;
    }
  };
  renderPost(randomPictures);
  renderComment(randomComments);

  var commentCount = findElement('.social__comment-count');
  commentCount.classList.add('visually-hidden');
  var commentLoader = findElement('.comments-loader');
  commentLoader.classList.add('visually-hidden');

// перенести в модуль^^^

})();
