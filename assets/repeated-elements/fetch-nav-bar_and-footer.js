// fetch header.
fetch("/assets/repeated-elements/nav-bar.html")
  .then((response) => {
    if (!response.ok) {
      throw new Error("failed to load nav-bar: " + response.statusText);
    }
    return response.text();
  })
  .then((html) => {
    document.getElementById("nav-bar").innerHTML = html;
  })
  .catch((error) => {
    console.error(error);
    document.getElementById("nav-bar").innerHTML =
      "<p>error loading nav-bar</p>";
  });

// fetch footer.
fetch("/assets/repeated-elements/footer.html")
  .then((response) => {
    if (!response.ok) {
      throw new Error("failed to load footer: " + response.statusText);
    }
    return response.text();
  })
  .then((html) => {
    document.getElementById("footer_content").innerHTML = html;
  })
  .catch((error) => {
    console.error(error);
    document.getElementById("footer_content").innerHTML =
      "<p>error loading footer<p>";
  });