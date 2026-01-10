// ---------------------------------------------
// cache: project page URL -> array of image srcs
// ---------------------------------------------
const projectImageCache = {};

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
// fetch a project page and return a random image
// ---------------------------------------------
async function getRandomImageFromProject(projectUrl) {
  // cache hit
  if (projectImageCache[projectUrl]) {
    const imgs = projectImageCache[projectUrl];
    console.log("cache hit:", projectUrl, imgs);
    if (imgs.length === 0) return null;
    return imgs[Math.floor(Math.random() * imgs.length)];
  }

  console.group("FETCH PROJECT PAGE");
  console.log("fetching:", projectUrl);

  try {
    const res = await fetch(projectUrl);
    const html = await res.text();

    const doc = new DOMParser().parseFromString(html, "text/html");
    const imgEls = Array.from(doc.querySelectorAll("img"));

    console.log("img elements found:", imgEls.length);

    const imgs = imgEls.map((img) => img.getAttribute("src")).filter(Boolean);

    console.log("image srcs:", imgs);

    projectImageCache[projectUrl] = imgs;

    if (imgs.length === 0) {
      console.warn("NO IMAGES FOUND IN:", projectUrl);
      console.groupEnd();
      return null;
    }

    const chosen = imgs[Math.floor(Math.random() * imgs.length)];
    console.log("chosen image:", chosen);
    console.groupEnd();

    return chosen;
  } catch (err) {
    console.error("FAILED TO FETCH PROJECT:", projectUrl, err);
    projectImageCache[projectUrl] = [];
    console.groupEnd();
    return null;
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
  const radius = Math.min(centerX, centerY) * 0.6;

  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.innerHTML = "";

  const nodes = [];
  const nodeSize = 80; // approximate width/height for collision avoidance

  // --- category nodes ---
  names.forEach((name, i) => {
    const angle = (i / names.length) * Math.PI * 2 + (Math.random() - 0.5) * 0.4; // angular jitter

    const r = radius + (Math.random() - 0.5) * radius * 0.25; // radial jitter

    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);

    const node = document.createElement("div");
    node.className = "category-node";
    node.innerText = name;

    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    node.style.transform = "translate(-50%, -50%)";

    // hover handler
    node.addEventListener("mouseenter", async () => {
      const projects = categories[name];
      if (!projects || projects.length === 0) {
        console.warn("No projects for category:", name);
        return;
      }

      const randomProject = projects[Math.floor(Math.random() * projects.length)];

      console.group("HOVER CATEGORY");
      console.log("category:", name);
      console.log("project page:", randomProject);

      const img = await getRandomImageFromProject(randomProject);
      console.log("chosen image:", img);
      console.groupEnd();

      if (img) {
        document.body.style.backgroundImage = `url(${img})`;
        document.body.style.backgroundSize = "contain";
        document.body.style.backgroundPosition = "center center";
        document.body.style.backgroundRepeat = "no-repeat";
      } else {
        document.body.style.backgroundImage = "none";
      }
    });

    node.addEventListener("mouseleave", () => {
      document.body.style.backgroundImage = "none";
    });

    mindmap.appendChild(node);
    nodes.push({ x, y, el: node });
  });

  // --- simple collision avoidance ---
  const iterations = 20; // number of relaxation steps
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

  // --- apply adjusted positions ---
  nodes.forEach(({ x, y, el }) => {
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  });

  // --- draw lines ---
  nodes.forEach(({ x, y }) => {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", centerX);
    line.setAttribute("y1", centerY);
    line.setAttribute("x2", x);
    line.setAttribute("y2", y);
    line.setAttribute("stroke", "#aaa");
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
