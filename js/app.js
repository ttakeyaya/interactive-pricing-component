import PriceViewManager from './PriceViewManager.js';

let manager = new PriceViewManager(50,1000);

// slide elements
let slider = document.querySelector('.slider');
let slide = document.querySelector('.slider__slide');

//billing-text elements
let billing = document.querySelector('.billing-toggle');
let billingBtn = document.querySelector('.toggle-btn');
let monthYear = document.querySelector('.price-month');

// price and pageviews elements
let priceView =  document.querySelector('.price');
let pageView = document.querySelector('.pageviews');

// Reset the slide's style 
window.onresize = function(){
  slide.style.backgroundColor = "hsl(174, 86%, 45%)";
  slide.style.left = 0 + 'px';
  slider.style.setProperty('--color', 'hsl(174, 77%, 80%)');
    slider.style.setProperty('--width', '0%');
}

// mousedown event for slide-bar 
slide.addEventListener('mousedown', (event)=>{
  slide.style.backgroundColor = "hsl(174, 77%, 80%)";
  event.preventDefault();

  let shiftX = event.clientX - slide.getBoundingClientRect().left;

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  
  function onMouseUp(){
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
    slide.style.backgroundColor = "hsl(174, 86%, 45%)";
  }
  function onMouseMove(event){
    let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;
    if(newLeft < 0){
      newLeft = 0;
    }
  
    let rightEdge = slider.offsetWidth - slide.offsetWidth;
    if(newLeft > rightEdge){
      newLeft = rightEdge;
    }
    slide.style.left = newLeft + 'px';
    
    // change the bg color of the slide depending on the position of the slidebar
    let percentage = (newLeft/slider.offsetWidth *100) + '%';
    slider.style.setProperty('--color', 'hsl(174, 77%, 80%)');
    slider.style.setProperty('--width', percentage);
    
    let position = (newLeft/slider.offsetWidth *100);
    renderPriceView(manager, position);
 
    
  }
  slide.ondragstart = function(){
    return false;
  }
});

// change billing text(year<->month)
billing.addEventListener('click', (event) =>{
  billingBtn.classList.toggle('toggled');
  if(monthYear.innerHTML === "month"){
    monthYear.innerHTML = "year";
    renderPriceView(manager, manager.currentPercentage);
  }else{
    monthYear.innerHTML = "month";
    renderPriceView(manager, manager.currentPercentage);
  }
});

function renderPriceView(manager, position){
  if(monthYear.innerHTML =="year"){
    let [priceYear, viewsYear] = manager.findYearlyPriceViews(position);
    priceView.innerHTML = '$'+Math.trunc(priceYear);
    pageView.innerHTML = Math.trunc(viewsYear) + 'K';
  }else{
    let [price,views] = manager.findMonthlyPriceViews(position);
    pageView.innerHTML = Math.trunc(views) + 'K';
    priceView.innerHTML = '$'+Math.trunc(price);
  }
}