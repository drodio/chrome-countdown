(function(){

var $  = document.getElementById.bind(document)
var $$ = document.querySelectorAll.bind(document)

var App = function($el){
  this.$el = $el
  this.load()

  this.renderTimeLoop()
}

App.fn = App.prototype

App.fn.load = function(){
  this.end = new Date("01/15/2020")
}

App.fn.renderTimeLoop = function(){
  this.interval = setInterval(this.renderTime.bind(this), 1000)
}


function getDayDiff (first, second) {
  var distance = (second-first)  // in milliseconds /(1000*60*60*24) // 1000ms/s * 60s/m * 60m/hr * 24 hours/day == diff day/ms


  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000)
  }
}

App.fn.renderTime = function(){
  var now = new Date
  var end = this.end
  var diff = getDayDiff(now, end)

  requestAnimationFrame(function(){
    this.html(this.view('age')({
      days: diff.days,
      hours: diff.hours,
      mins: diff.minutes,
      secs: diff.seconds
    }))
  }.bind(this))
}

App.fn.$$ = function(sel){
  return this.$el.querySelectorAll(sel)
}

App.fn.html = function(html){
  this.$el.innerHTML = html
}

App.fn.view = function(name){
  var $el = $(name + '-template')
  return Handlebars.compile($el.innerHTML)
}

window.app = new App($('app'))

})()
