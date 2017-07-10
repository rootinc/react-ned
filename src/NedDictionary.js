var $ = require('jquery');

function NedDictionary(properties) {
  window.ned = {};
  window.ned.NedDictionary = this;

  this.data = {};

  this.count = 0;
  this.total = 0;

  this.currentLanguage = properties.language || "en";
  this.ready = false;

  this.getLanguage = function() {
    return this.currentLanguage;
  };

  this.setLanguage = function(lang) {
    this.currentLanguage = lang;
    $("*").trigger("language-changed");
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

  this.fetchAll = function(urls) {
    this.count = 0;
    this.total = Object.keys(urls).length;

    for (var lang in urls)
    {
      this.fetchData(lang,urls[lang]);
    }
  };

  this.fetchData = function(lang,url) {
    var that = this;

    $.ajax({
      type: "GET",
      url: url
    })
    .done(function(response){
      that.data[lang] = JSON.parse(response);

      that.count ++;
      if (that.count === that.total)
      {
        $("*").trigger("ned-loaded");
        that.ready = true;
      }
    })
    .fail(function(err){
      console.log(err)
    });
  };

  this.fetchAll(properties.urls);
}

module.exports = NedDictionary;
