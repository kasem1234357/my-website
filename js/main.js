let loader = document.querySelector(".loader")

window.addEventListener('load',vanish);

function vanish() {
 loader.classList.add("despear");
}

// writer effect------------------//
class TypeWriter {
  constructor(txtElement, words, wait) {
    // old constructer class 
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    //this.wait = parseInt(wait,10);
    this.wait = wait;
    this.type();
    this.isDeleting = false;
  }
  type() {
    //اشارة % تعني باقي قسمة القيمتين 
    const current = this.wordIndex % this.words.length;

    const fullTxt = this.words[current];
    //console.log(TypeWriter.prototype.isDeleting);
    if (this.isDeleting) {
      //remove char
      //substring !!!
      this.txt = fullTxt.substring(0, this.txt.length - 1);

    }

    else {
      //remove char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    //console.log(this.txt);
    this.txtElement.innerHTML = `<span >I am <span class = "txt">${this.txt}|</span></span>`;
    let typeSpeed = 300;
    if (this.isDeleting) {
      typeSpeed /= 2;
    }
    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    }
    else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }
    setTimeout(() => this.type(), typeSpeed);
  }
}

document.addEventListener('DOMContentLoaded',init2);
function init2()
{
  const txtElement = document.getElementById('xs');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  new TypeWriter(txtElement,words,wait );
}
// end writer effect------------------//
// bubble effects---------------------------------//

function creatBubble()
{
  const head = document.querySelector('.head');
  const createElement = document.createElement('span');
  createElement.classList.add('bubble');
  var size = Math.random() * 60;
  createElement.style.width = `${20 + size}px`;
  createElement.style.height = `${20 + size}px`;
  createElement.style.left = Math.random()*innerWidth + "px";
  head.appendChild(createElement);
  setTimeout(()=>{
    createElement.remove();
  },4000)
}
setInterval(creatBubble,70);
// end bubble effects---------------------------------//
// tilt 3d effect----------------------------//
VanillaTilt.init(document.querySelectorAll(".box-service"), {
  max: 25,
  speed: 400,
  glare: true,
  "max-glare": 1,      // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
});
// end tilt 3d effect----------------------------//
// filter img----------------------//
const el = document.querySelectorAll('.filter li');
const imgBox =document.querySelectorAll('.gallery-box .gallery-img-box') ;
const galleryBox = document.querySelector('.gallery-box');
let off = document.querySelector('.off') ;
off.style.display = 'none'
let dataArray = [];
el.forEach((els)=>{
  els.addEventListener("click",()=>{
      let data = els.getAttribute('data-main');
      for(var i = 0 ; i<imgBox.length;i++)
      {
        imgBox[i].classList.remove('none');
          if(data==='ALL')
          {
            imgBox[i].classList.remove('none');
          }
          else
          {
            dataArray.push(imgBox[i].getAttribute('data-type'));
            //console.log(dataArray.includes('Effects'))
            if(!dataArray[i].includes(data))
              {
                imgBox[i].classList.add('none');
              }
              //console.log(dataArray);
            if(dataArray.join(" ").includes(data) == false)
              {
                off.style.display = `block`
              }
            else{ off.style.display = `none` }
          }
      }
  })
})
// end filter img -------------------//
const navbarMenu = document.querySelector(".nav-links");
const navbarLinks = document.querySelectorAll(".nav-link");
for(let i=0; i<navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", navbarLinkClick);
}
function navbarLinkClick(event) {
  smoothScroll(event);
}
function smoothScroll(event) {
  event.preventDefault();
  const targetId = event.currentTarget.getAttribute("href")==="#" ? "header" : event.currentTarget.getAttribute("href");
  console.log(event);
  const targetPosition = document.querySelector(targetId).offsetTop;
  console.log(targetPosition)
  const startPosition = window.pageYOffset;
  console.log(startPosition)
  const distance = targetPosition - startPosition;
  console.log(distance)
  const duration = 1000;
  let start = null;
  window.requestAnimationFrame(step);
  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    console.log(progress)
    // window.scrollTo(0, distance*(progress/duration) + startPosition);
    window.scrollTo(0, easeInOutQuad(progress, startPosition, distance, duration));
    if (progress < duration) window.requestAnimationFrame(step);
  }
}
function linear(t, b, c, d) {
	return c*t/d + b;
};

function easeInOutQuad(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};

function easeInOutCubic(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t + 2) + b;
};
