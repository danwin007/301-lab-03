'use strict';

let imgArr = [];

// constructor function to build the image object
function Builder (buildObj) {
  this.title = buildObj.title;
  this.image_url = buildObj.image_url;
  this.description = buildObj.description;
  this.keyword = buildObj.keyword;
  this.horns = buildObj.horns;
}


Builder.prototype.render = function () {
  //1 get template from html
  let template = $('#horns-template').html();
  //2 use handlerbars to compile html
  let templateRender = Handlebars.compile(template);
  //3 return the html
  // return templateRender(this);
  let templateHTML = templateRender(this);
  $('main').append(templateHTML);
};

// need code to grab info from json file
// Based off of the Dog demo code in class 02
Builder.readJson = () => {
  $.get('./data/page-1.json', 'json')
    .then(data => {
      console.log(Builder);
      data.forEach(item => {
        imgArr.push(new Builder(item));
      });
    })
    .then(Builder.loadImgs);
};

Builder.loadImgs = () => {
  imgArr.forEach(buildObj => buildObj.render());
};

$(() => Builder.readJson());

// summon page 2




// filtering the images handler



// PAGE 2 PAGINATION
function showPageTwo () {
  console.log('clicked');
  Builder.readJson = () => {
    $.get('./data/page-2.json', 'json')
      .then(data => {
        console.log(Builder);
        data.forEach(item => {
          imgArr.push(new Builder(item));
        });
      })
      .then(Builder.loadImgs);
  };

  Builder.loadImgs = () => {
    imgArr.forEach(buildObj => buildObj.render());
  };

  Builder.prototype.render = function () {
    //1 get template from html
    let template = $('#horns-template').html();
    //2 use handlerbars to compile html
    let templateRender = Handlebars.compile(template);
    //3 return the html
    // return templateRender(this);
    let templateHTML = templateRender(this);
    $('main').append(templateHTML);
  };
}


$('#pg2').on('click', showPageTwo);

$('#filter').on('change', function () {
  $('section').hide();
  $(`.${this.value}`).show();
});
// $(() => Builder.readJson());


