var $ = require('jquery');

function NedDictionary(properties) {
  window.ned = {};
  window.ned.NedDictionary = this;

  this.baseUrl = "https://ned-production.herokuapp.com/api/project/";

  this.projectId = properties.projectId;

  this.data = {};

  this.currentLanguage = "";
  this.ready = false;

  this.getLanguage = function() {
    return this.currentLanguage;
  };

  this.setLanguage = function(lang) {
    this.currentLanguage = lang;

    if (!this.data[lang])
    {
      this.fetchData(lang);
    }
    else
    {
      $("*").trigger("language-changed");
    }
  };

  this.getHTML = function(lang,textId) {
    for (var i=0; i<this.data[lang].length; i++)
    {
      var item = this.data[lang][i];
      if (item.id === textId)
      {
        return item.text; 
      }
    }
  };

  this.getText = function(lang,textId) {
    var html = this.getHTML(lang,textId);

    var $div = $("<div/>");
    $div.html(html);

    return $div.text();
  };

  this.fetchData = function(lang) {
    var that = this;

    that.ready = false;

    $.ajax({
      type: "GET",
      url: that.baseUrl + this.projectId + "/export/json/" + lang
    })
    .done(function(response){
      that.data[lang] = JSON.parse(response);

      $("*").trigger("ned-loaded");
      that.ready = true;
    })
    .fail(function(err){
      console.log(err)
    });
  };

  this.setLanguage("en");
}

module.exports = NedDictionary;
