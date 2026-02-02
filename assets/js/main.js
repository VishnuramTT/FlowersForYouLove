(() => {
  const FLOWERS = ["🌸", "🌺", "🌷", "🌹", "💐"];
  const BALLOONS = ["🎈", "🎈", "🎈", "🎉"];
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const startButton = document.getElementById("startButton");
  const message = document.getElementById("message");
  const hint = document.getElementById("hint");

  /** @type {number | null} */
  let flowerIntervalId = null;
  /** @type {number | null} */
  let balloonIntervalId = null;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function createFlower() {
    const el = document.createElement("span");
    el.className = "flower";
    el.textContent = pick(FLOWERS);

    // Position and motion variables
    const x = rand(0, window.innerWidth);
    const size = rand(18, 34);
    const duration = rand(3500, 7200); // ms
    const driftX = rand(-80, 80); // px
    const rotation = rand(240, 540); // deg

    el.style.left = `${x}px`;
    el.style.fontSize = `${size}px`;
    el.style.setProperty("--dx", `${driftX}px`);
    el.style.setProperty("--rot", `${rotation}deg`);
    el.style.animationDuration = `${duration}ms`;

    document.body.appendChild(el);

    // Cleanup after animation (plus a small buffer)
    window.setTimeout(() => {
      el.remove();
    }, duration + 400);
  }

  function createBalloon() {
    const el = document.createElement("span");
    el.className = "balloon";
    el.textContent = pick(BALLOONS);

    const x = rand(0, window.innerWidth);
    const size = rand(22, 44);
    const duration = rand(5200, 10000); // ms
    const driftX = rand(-60, 60); // px
    const rotation = rand(-14, 14); // deg

    el.style.left = `${x}px`;
    el.style.fontSize = `${size}px`;
    el.style.setProperty("--dx", `${driftX}px`);
    el.style.setProperty("--rot", `${rotation}deg`);
    el.style.animationDuration = `${duration}ms`;

    document.body.appendChild(el);

    window.setTimeout(() => {
      el.remove();
    }, duration + 400);
  }

  function start() {
    if (flowerIntervalId !== null || balloonIntervalId !== null) return; // prevent double-start

    if (startButton) startButton.hidden = true;
    if (hint) hint.hidden = true;
    if (message) message.hidden = false;

    if (prefersReducedMotion) return;

    // Initial burst looks nicer than waiting for the first interval tick
    for (let i = 0; i < 10; i++) createFlower();
    for (let i = 0; i < 4; i++) createBalloon();

    flowerIntervalId = window.setInterval(createFlower, 220);
    balloonIntervalId = window.setInterval(createBalloon, 900);
  }

  if (startButton) {
    startButton.addEventListener("click", start, { passive: true });
    startButton.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") start();
    });
  }
})();

