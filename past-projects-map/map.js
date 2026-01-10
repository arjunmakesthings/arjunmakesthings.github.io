// ---------------------------------------------
// cache: project page URL -> array of media srcs
// ---------------------------------------------
const projectMediaCache = {};

// ---------------------------------------------
// fetch projects.html and build category -> project page map
// ---------------------------------------------
async function loadProjects() {
  const res = await fetch("../projects.html");
  const html = await res.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const galleryItems = doc.querySelectorAll(".gallery_item");
  console.log("gallery items found:", galleryItems.length);

  const categories = {};

  galleryItems.forEach((item) => {
    const categoryEl = item.querySelector("h3[id='category']");
    const link = item.getAttribute("href");

    if (!categoryEl || !link) return;

    const category = categoryEl.innerText.trim();

    if (!categories[category]) {
      categories[category] = [];
    }

    categories[category].push(link);
  });

  return categories;
}

// ---------------------------------------------
// fetch a project page and return a random media
// ---------------------------------------------
async function getRandomMediaFromProject(projectUrl) {
  // cache hit
  if (projectMediaCache[projectUrl]) {
    const media = projectMediaCache[projectUrl];
    if (media.length === 0) return null;
    const chosen = media[Math.floor(Math.random() * media.length)];
    console.log("cache hit:", projectUrl, "chosen media:", chosen);
    return chosen;
  }

  console.group("FETCH PROJECT PAGE");
  console.log("fetching:", projectUrl);

  try {
    const res = await fetch(projectUrl);
    const html = await res.text();

    const doc = new DOMParser().parseFromString(html, "text/html");

    // get all images and videos
    let mediaEls = [...Array.from(doc.querySelectorAll("img")), ...Array.from(doc.querySelectorAll("video"))];

    let media = mediaEls.map((el) => el.getAttribute("src")).filter(Boolean);

    // fallback to cover image
    if (media.length === 0) {
      const coverImg = doc.querySelector(".cover-image img");
      if (coverImg) media.push(coverImg.getAttribute("src"));
    }

    projectMediaCache[projectUrl] = media;

    if (media.length === 0) {
      console.warn("NO MEDIA FOUND IN:", projectUrl);
      console.groupEnd();
      return null;
    }

    const chosen = media[Math.floor(Math.random() * media.length)];
    console.log("chosen media:", chosen);
    console.groupEnd();
    return chosen;
  } catch (err) {
    console.error("FAILED TO FETCH PROJECT:", projectUrl, err);
    projectMediaCache[projectUrl] = [];
    console.groupEnd();
    return null;
  }
}

// ---------------------------------------------
// helper: show media as background
// ---------------------------------------------
function setBackgroundMedia(src) {
  // remove any existing video
  const existingVideo = document.getElementById("background-video");
  if (existingVideo) {
    existingVideo.pause();
    existingVideo.remove();
  }

  if (!src) {
    document.body.style.backgroundImage = "none";
    return;
  }

  // detect if src is video
  const videoExtensions = [".mp4", ".webm", ".mov"];
  const isVideo = videoExtensions.some((ext) => src.toLowerCase().endsWith(ext));

  if (isVideo) {
    const video = document.createElement("video");
    video.id = "background-video";
    video.src = src;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.style.position = "fixed";
    video.style.top = 0;
    video.style.left = 0;
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.objectFit = "contain";
    video.style.zIndex = "-1";

    document.body.appendChild(video);
  } else {
    document.body.style.backgroundImage = `url(${src})`;
    document.body.style.backgroundSize = "contain";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundRepeat = "no-repeat";
  }
}

// ---------------------------------------------
// render mindmap
// ---------------------------------------------
function renderMindmap(categories) {
  const mindmap = document.getElementById("mindmap");
  const svg = document.getElementById("connections");

  const names = Object.keys(categories);
  if (names.length === 0) return;

  const width = mindmap.clientWidth;
  const height = mindmap.clientHeight;

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(centerX, centerY) * 0.7;

  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.innerHTML = "";

  const nodes = [];
  const nodeSize = 80;

  // --- category nodes ---
  names.forEach((name, i) => {
    const angle = (i / names.length) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
    const r = radius + (Math.random() - 0.5) * radius * 0.25;

    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);

    const node = document.createElement("div");
    node.className = "category-node";
    node.innerText = name;

    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    node.style.transform = "translate(-50%, -50%)";

    // hover -> random media
    node.addEventListener("mouseenter", async () => {
      const projects = categories[name];
      if (!projects || projects.length === 0) return;

      const randomProject = projects[Math.floor(Math.random() * projects.length)];
      console.group("HOVER CATEGORY");
      console.log("category:", name);
      console.log("project page:", randomProject);

      const media = await getRandomMediaFromProject(randomProject);
      console.log("chosen media:", media);
      console.groupEnd();

      setBackgroundMedia(media);
    });

    node.addEventListener("mouseleave", () => {
      setBackgroundMedia(null);
    });

    mindmap.appendChild(node);
    nodes.push({ x, y, el: node });
  });

  // --- simple collision avoidance ---
  const iterations = 20;
  for (let it = 0; it < iterations; it++) {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];

        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < nodeSize) {
          const overlap = (nodeSize - dist) / 2;
          const offsetX = (dx / dist) * overlap;
          const offsetY = (dy / dist) * overlap;

          a.x -= offsetX;
          a.y -= offsetY;
          b.x += offsetX;
          b.y += offsetY;
        }
      }
    }
  }

  // --- apply positions ---
  nodes.forEach(({ x, y, el }) => {
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  });

  // --- draw lines with padding ---
  const linePadding = 20; // stops 20px before node
  nodes.forEach(({ x, y }) => {
    const dx = x - centerX;
    const dy = y - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const factor = (dist - linePadding) / dist;
    const x2 = centerX + dx * factor;
    const y2 = centerY + dy * factor;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", centerX);
    line.setAttribute("y1", centerY);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "#aaa");
    line.setAttribute("stroke-opacity", "0.7");
    line.setAttribute("stroke-width", "1");

    svg.appendChild(line);
  });
}

// ---------------------------------------------
// boot
// ---------------------------------------------
document.addEventListener("DOMContentLoaded", async () => {
  const categories = await loadProjects();
  renderMindmap(categories);
});
