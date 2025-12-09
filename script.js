// set year
document.getElementById('year').textContent = new Date().getFullYear();

// simple slider controls
const slider = document.getElementById('slider');
const prev = document.getElementById('prevBtn');
const next = document.getElementById('nextBtn');

prev.addEventListener('click', ()=> {
  slider.scrollBy({left: -300, behavior: 'smooth'});
});
next.addEventListener('click', ()=> {
  slider.scrollBy({left: 300, behavior: 'smooth'});
});

// newsletter fake submit (you can connect to real service later)
document.getElementById('newsletter').addEventListener('submit', function(e){
  e.preventDefault();
  const email = document.getElementById('email').value;
  if(!email) return alert('Please enter email');
  alert('Shukriya! ' + email + ' — apko jaldi update mil jayega.');
  document.getElementById('email').value = '';
});
