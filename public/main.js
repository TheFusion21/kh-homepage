const introTitles = [
  'Unity Developer',
  'React Developer',
  'Frontend Developer',
  'Backend Developer',
  'Fullstack Developer',
  'Javascript Developer',
  'Typescript Developer',
  'C++ Developer',
  'Game Engine Developer',
  'C# Developer',
  'Python Developer',
  'ML Developer',
  'Game Developer',
  'Gamer',
  'Human',
];

(() => {
  var typeAnimation = function(i, title) {
    var typewriter = document.getElementsByClassName('typewriter')[0];
    if (i === 0) {
      typewriter.innerHTML = '';
    }
    var remove = function() {
      if (i >= 0) {
        typewriter.innerHTML = title.substring(0, i);
        i--;
        setTimeout(remove, 110);
      } else {
        typeAnimation(0, introTitles[Math.floor(Math.random() * introTitles.length)]);
      }
    }
    var type = function() {
      var len = title.length;
      if (i < len) {
        typewriter.innerHTML += title.charAt(i);
        i++;
        setTimeout(type, 110);
      } else {
        setTimeout(remove, 1500);
      }
    }
    setTimeout(type, 110);
  }

  setTimeout(function() {
    typeAnimation(0, introTitles[Math.floor(Math.random() * introTitles.length)]);
  }, 1000);

  var intro = document.getElementById('intro');
  intro.style.height = window.innerHeight + 'px';

  window.onresize = function() {
    intro.style.height = window.innerHeight + 'px';
  };
})();