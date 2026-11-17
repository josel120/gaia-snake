const c=document.getElementById('c'),x=c.getContext('2d'),N=20,S=20;
let snake,dir,next,food,score,timer=null,delay;
const $=id=>document.getElementById(id);
function place(){do{food={x:Math.random()*N|0,y:Math.random()*N|0}}while(snake.some(s=>s.x===food.x&&s.y===food.y))}
function reset(){snake=[{x:10,y:10}];dir=next={x:1,y:0};score=0;delay=150;place();draw();$('score').textContent=0;$('best').textContent=localStorage.gnSnake||0;$('status').textContent='Go!';}
function draw(){x.fillStyle='#08110d';x.fillRect(0,0,400,400);x.fillStyle='#ffd166';x.fillRect(food.x*S+3,food.y*S+3,14,14);snake.forEach((s,i)=>{x.fillStyle=i?'#3ddc97':'#b8ffe0';x.fillRect(s.x*S+1,s.y*S+1,18,18)});}
function step(){dir=next;const h={x:snake[0].x+dir.x,y:snake[0].y+dir.y};if(h.x<0||h.y<0||h.x>=N||h.y>=N||snake.some(s=>s.x===h.x&&s.y===h.y)){clearInterval(timer);timer=null;$('status').textContent='Game over — score '+score+'. Press Start to retry.';return}snake.unshift(h);if(h.x===food.x&&h.y===food.y){score++;$('score').textContent=score;if(score>(+localStorage.gnSnake||0))localStorage.gnSnake=score;$('best').textContent=localStorage.gnSnake;place();if(score%5===0){delay=Math.max(70,delay-12);clearInterval(timer);timer=setInterval(step,delay)}}else snake.pop();draw();}
$('start').onclick=()=>{clearInterval(timer);reset();timer=setInterval(step,delay);};
const keys={ArrowUp:[0,-1],KeyW:[0,-1],ArrowDown:[0,1],KeyS:[0,1],ArrowLeft:[-1,0],KeyA:[-1,0],ArrowRight:[1,0],KeyD:[1,0]};
addEventListener('keydown',e=>{const k=keys[e.code];if(k&&!(k[0]===-dir.x&&k[1]===-dir.y)){next={x:k[0],y:k[1]};e.preventDefault()}});
let tx,ty;c.addEventListener('touchstart',e=>{tx=e.touches[0].clientX;ty=e.touches[0].clientY},{passive:true});
c.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;const k=Math.abs(dx)>Math.abs(dy)?[Math.sign(dx),0]:[0,Math.sign(dy)];if(!(k[0]===-dir.x&&k[1]===-dir.y))next={x:k[0],y:k[1]}},{passive:true});
snake=[{x:10,y:10}];dir=next={x:1,y:0};score=0;place();draw();$('best').textContent=localStorage.gnSnake||0;
