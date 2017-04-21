var $ = require('jquery');

function NedDictionary(properties) {
  window.ned = {};
  window.ned.NedDictionary = this;

  this.data = {};

  this.count = 0;
  this.total = 0;

  this.currentLanguage = properties.language || "en";
  this.ready = false;

  this.fetchAll(properties.urls);

  this.getLanguage = function() {
    return this.currentLanguage;
  };

  this.setLanguage(lang) = function() {
    this.currentLanguage = lang;
    $("*").trigger("language-changed");
  };

  this.getHTML = function(lang,textId) {
    return this.data[lang].find(function(item){
      return item.id === textId;
    }).text;
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
    .done((response)=>{
      that.data[lang] = JSON.parse(response);

      that.count ++;
      if (that.count === that.total)
      {
        $("*").trigger("ned-loaded");
        that.ready = true;
      }
    })
    .fail((err)=>{
      console.log(err)
    });
  };
}

module.exports = NedDictionary;