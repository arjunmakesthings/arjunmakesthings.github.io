<!--HEADER & FOOTER-->
<script>
  // fetch header.
  fetch("/assets/repeated-elements/header-for-project-pages.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load header: " + response.statusText);
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById("header").innerHTML = html;
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("header").innerHTML = "<h1>Error loading header</h1>";
    });

  // fetch footer.
  fetch("/assets/repeated-elements/footer.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load footer: " + response.statusText);
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById("footer").innerHTML = html;
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("footer").innerHTML = "<h1>Error loading footer</h1>";
    });
</script>

include a div id = "header" and div id = "footer" on the pages.
