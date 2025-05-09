const canvas = document.getElementById('');
const ctx = canvas.getContext('2d');
let particles = [];

function randomParticle() {
  const colors = ['#ff6ec4', '#7873f5', '#4df8f8', '#ffffff'];
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 3 + 1,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    opacity: Math.random() * 0.5 + 0.3
  };
}

function setup() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push(randomParticle());
  }
}

function drawParticle(p) {
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
  ctx.fillStyle = p.color;
  ctx.globalAlpha = p.opacity;
  ctx.shadowBlur = 10;
  ctx.shadowColor = p.color;
  ctx.fill();
  ctx.globalAlpha = 1;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.speedX;
    p.y += p.speedY;
    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    drawParticle(p);
  });
  requestAnimationFrame(animate);
}

window.addEventListener('resize', setup);
setup();
animate();

// Lógica de login
document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('submit-button');
  const alertBox = document.getElementById('loginAlert');

  loginButton.addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username && password) {
      window.location.href = '../menu.html';
    } else {
      alertBox.style.display = 'block';
    }
  });
});
