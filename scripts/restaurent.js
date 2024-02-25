
//jQuery for hero image to consume the header window space
$(document).ready(function () {
  $('.hero').height($(window).height());
});

window.addEventListener("resize", function () {
  var iframe = document.querySelector("iframe");
  if (window.innerWidth < 768) {
    iframe.style.height = "600px";
  } else {
    iframe.style.height = "100vh";
  }
});


// initialize the carousel
$('.carousel').carousel({
  interval: 2000
});

// click on the cards for more information
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('click', function () {
    const moreInfo = this.querySelector('.more-info');
    moreInfo.classList.toggle('d-none');
  });
});

