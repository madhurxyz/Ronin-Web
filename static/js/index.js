function SearchManager() {
  this.submitButton = $('#submit-button');
  this.urlSearchField = $('#url');
  this.displayText = $('#answer');
  this.submitButton.click(this._handleClick.bind(this));
}


SearchManager.prototype._handleClick = function() {
  var url = this.urlSearchField.val();
  this.displayText.html("Loading");
  $.ajax({
    method: "GET",
    url: "https://news-hound-api.herokuapp.com/evaluate",
    data: {url: url, ai: true},
    success: this._handleSuccess.bind(this)
  });
}
SearchManager.prototype._handleSuccess = function(response) {
  var score = response.score;
  if (!score){
      this.displayText.html("Enter Valid URL");
    } else {
      if (score<50) {
        this.displayText.html("Looks Fake");
        document.body.style.backgroundImage = "url('../static/img/malicious.jpg')"
      } else if (score<80) {
        this.displayText.html("Questionable");
        document.body.style.backgroundImage = "url('../static/img/questionable.jpg')"
      } else {
        this.displayText.html("Looks Good");
        document.body.style.backgroundImage = "url('../static/img/credible.jpg')"
    }
  }
}

$(function(){new SearchManager()});
