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

//function that fires on page render to add images to page
// (CREDIT) Krystal had code from a previous iteration that we used as base for our lab
Builder.prototype.render = function () {

  // HELPER VARS
  //selects the photo-template ID in the HTML
  const addTemplate = $('#photo-template').html();

  //adds title of image as drop down option
  const $addOption = $(`<option>${this.title}</option>`);

  //adds <section> to page
  const $addSection = $(`<section></section>`);

  //jquery to add pieces to page
  //below adds to html
  $addSection.html(addTemplate);
  // need to add h2, img, p, alt, class elements
  $addSection.find('h2').text(this.title);
  $addSection.find('img').attr('src', this.image_url);
  $addSection.find('p').text(this.description);
  $addSection.find('img').attr('alt', this.title);
  $addSection.attr('class', this.keyword);

  $('main').append($addSection);

  // add titles to dropdown list
  $addOption.attr('value', this.keyword);
  $addOption.attr('class', this.keyword);
  $addOption.text(this.title);

  $('#filter').append($addOption);
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


// filtering the images handler
$('#filter').on('change', function () {
  $('section').hide();
  $(`.${this.value}`).show();
});
