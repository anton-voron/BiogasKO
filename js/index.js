'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

var TextScramble = function () {
  function TextScramble(el) {
    _classCallCheck(this, TextScramble);

    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________1234567890';
    this.update = this.update.bind(this);
  }

  TextScramble.prototype.setText = function setText(newText) {
    var _this = this;

    var oldText = this.el.innerText;
    var length = Math.max(oldText.length, newText.length);
    var promise = new Promise(function (resolve) {
      return _this.resolve = resolve;
    });
    this.queue = [];
    for (var i = 0; i < length; i++) {
      var from = oldText[i] || '';
      var to = newText[i] || '';
      var start = Math.floor(Math.random() * 40);
      var end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from: from, to: to, start: start, end: end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  };

  TextScramble.prototype.update = function update() {
    var output = '';
    var complete = 0;
    for (var i = 0, n = this.queue.length; i < n; i++) {
      var _queue$i = this.queue[i];
      var from = _queue$i.from;
      var to = _queue$i.to;
      var start = _queue$i.start;
      var end = _queue$i.end;
      var char = _queue$i.char;

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += '<span class="dud">' + char + '</span>';
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  };

  TextScramble.prototype.randomChar = function randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  };

  return TextScramble;
}();

// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

var phrases = ['Hey, there!', 'We creacte', 'something\ awsome \ something cool', 'something greate', 'we care about our planet\'about feature', 'KO BSIOGAS Powerplant', 'join us' , 'lets do this together'];

var el = document.querySelector('.text-transform');
var fx = new TextScramble(el);

var counter = 0;
var next = function next() {
  fx.setText(phrases[counter]).then(function () {
    setTimeout(next, 800);
  });
  counter = (counter + 1) % phrases.length;
};

next();


// MODAL FORMS

const flipperGallery = document.querySelector(".glitch-btn");
const gallery = document.querySelector(".gallery-show");

flipperGallery.addEventListener("click", showGallery);

function showGallery (evt) {
  evt.preventDefault();
  if(flipperGallery.name == "open") {
    flipperGallery.name = "close";
    gallery.classList.remove("modal");
    gallery.classList.add("modal-show");
  } else {
    flipperGallery.name = "open";
    gallery.classList.add("modal");
    gallery.classList.remove("modal-show");
  }
}

console.dir(flipperGallery);



let linkMap = document.querySelector(".button-map");
let popupMap = document.querySelector(".modal-map");
let closeMap = popupMap.querySelector(".modal-close");
let ovelay = document.querySelector(".modal-map-overlay");

linkMap.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupMap.classList.add("modal-map-show");
  ovelay.style.display = 'block';

  closeMap.addEventListener("click", function(evt) {
    evt.preventDefault();
    popupMap.classList.remove("modal-map-show");
    ovelay.style.display = 'none';
  })
});

window.addEventListener("keydown", function(evt) {
  if(popupMap.classList.contains("modal-map-show")) {
    if(evt.keyCode==27) {
      evt.preventDefault();
      popupMap.classList.remove("modal-map-show");
      ovelay.style.display = 'none';
    }
  };
})