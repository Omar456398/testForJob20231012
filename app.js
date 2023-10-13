$(document).ready(function () {
  let scrollorama = $.scrollorama({
    blocks: ".scrollblock",
  });
  let bodyPartName = ''
  let setBodyPart = (partName) => {
    bodyPartName = partName;
    [...document.getElementsByClassName("circle-thropping")].forEach((item) => {
        if (partName === item.getAttribute('bodypart')) {
          item.classList.add("visible");
        } else {
          item.classList.remove("visible");
        }
      });
  } 
  let onBodyPartClick = (event) => {
    setBodyPart(event.target.parentElement.getAttribute('bodypart'))
  };
  $(".circle-inner").each((_) => {
    $(this).click(onBodyPartClick);
  });
});
