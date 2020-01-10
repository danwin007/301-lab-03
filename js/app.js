'use strict';

let imgArr = [];

// constructor function to build the image object
// function Builder (buildObj) {
//   this.title = buildObj.title;
//   this.image_url = buildObj.image_url;
//   this.description = buildObj.description;
//   this.keyword = buildObj.keyword;
//   this.horns = buildObj.horns;
//   imgArr.push(this);
// }

function Builder (buildObj) {
  for (let key in buildObj) {
    this[key] = buildObj[key];
  }
}

//function that fires on page render to add images to page
// (CREDIT) Krystal had code from a previous iteration that we used as base for our lab
Builder.prototype.render = function () {

  // add titles to dropdown list
  const $addOption = $(`<option>${this.title}</option>`);
  $addOption.attr('value', this.keyword);
  $addOption.attr('class', this.keyword);
  $addOption.text(this.title);

  $('#filter').append($addOption);

  // HELPER VARS
  //selects the photo-template ID in the HTML
  // const addTemplate = $('#photo-template').html();

  // //adds title of image as drop down option
  // const $addOption = $(`<option>${this.title}</option>`);

  // //adds <section> to page
  // const $addSection = $(`<section></section>`);

  // //jquery to add pieces to page
  // //below adds to html
  // $addSection.html(addTemplate);
  // // need to add h2, img, p, alt, class elements
  // $addSection.find('h2').text(this.title);
  // $addSection.find('img').attr('src', this.image_url);
  // $addSection.find('p').text(this.description);
  // $addSection.find('img').attr('alt', this.title);
  // $addSection.attr('class', this.keyword);
  $('main').append($addSection);

};

// Handlebars template prototype
Builder.prototype.toHTML = function () {
  //1 get template from html
  let template = $('#horns-template').html();
  //2 use handlerbars to compile html
  let templateRender = Handlebars.compile(template);
  //3 return the html
  return templateRender(this);
}

//first access json via ajax .get

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

imgArr.forEach(newHorn => {
  $('#photo-template').append(newHorn.toHtml());
  imgArr.push(new Builder(newHorn));
});

// // filtering the images handler
// $('#filter').on('change', function () {
//   $('section').hide();
//   $(`.${this.value}`).show();
// });

hornData.forEach(hornObj => {
  imgArr.push(new Builder(hornObj));
});

imgArr.forEach(ourHornObj => {
  $('#photo-template').append(ourHornObj.toHtml());
});
