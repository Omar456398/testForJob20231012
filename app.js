$(document).ready(function () {
  let scrollorama = $.scrollorama({
    blocks: ".scrollblock",
  });
  let onBodyPartClick = (event) => {
    [...document.getElementsByClassName("circle-thropping")].forEach((item) => {
      if (event.target.parentElement.getAttribute('bodypart') === item.getAttribute('bodypart')) {
        item.classList.add("visible");
      } else {
        item.classList.remove("visible");
      }
    });
  };
  $(".circle-inner").each((_) => {
    $(this).click(onBodyPartClick);
  });
});
