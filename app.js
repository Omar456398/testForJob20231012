jQuery.expr.filters.offscreen = function (element) {
  var rect = element.getBoundingClientRect();
  return (
    rect.x + rect.width < 0 ||
    rect.y + rect.height < 0 ||
    rect.x > window.innerWidth ||
    rect.y > window.innerHeight
  );
};
$(document).ready(function () {
  let scrollorama = $.scrollorama({
    blocks: ".scrollblock",
    enablePin: false,
  });
  window.addEventListener("resize", scrollorama.resize);
  let bodyPartName = "";
  let setBodyPart = (partName) => {
    bodyPartName = partName;
    [...document.getElementsByClassName("circle-thropping")].forEach((item) => {
      if (partName === item.getAttribute("bodypart")) {
        item.classList.add("visible");
      } else {
        item.classList.remove("visible");
      }
    });
    const buttonsBodyparts = $(".body-parts-buttons").find("button");
    buttonsBodyparts.each((index) => {
      item = buttonsBodyparts[index].parentElement;
      if (partName === item.getAttribute("bodypart")) {
        item.classList.add("body-part-active");
        $(".body-parts-buttons")[0].scrollTo(
          item.offsetLeft - (window.innerWidth - item.offsetWidth * 2) / 2,
          0
        );
      } else {
        item.classList.remove("body-part-active");
      }
    });
  };

  setBodyPart('skin');
  let onBodyPartClick = (event) => {
    const bodypart = event.target.parentElement.getAttribute("bodypart");
    if (window.innerWidth <= 766) {
      document.getElementById("body-part-" + bodypart).scrollIntoView();
    } else {
      setBodyPart(bodypart);
    }
  };

  const circleInners = $(".circle-inner");
  const buttonsBodyparts = $(".body-parts-buttons").find("button");
  circleInners.each((index) => {
    circleInners[index].onclick = onBodyPartClick;
  });
  buttonsBodyparts.each((index) => {
    buttonsBodyparts[index].onclick = onBodyPartClick;
  });
  scrollorama.onBlockChange(function () {
    const blockID =
      scrollorama.settings.blocks.eq(scrollorama.blockIndex).attr("id") || "";
    if (blockID.startsWith("body-part-") && window.innerWidth <= 766) {
      $(".body-parts-container-inner")[0].classList.add("fixed");
      $(".body-parts-container-inner")[0].classList.remove("finished-fix");
      const bodyPartNameCurrent = blockID.substr("body-part-".length);
      setBodyPart(bodyPartNameCurrent);
    } else {
      $(".body-parts-container-inner")[0].classList.remove("fixed");
      if (blockID === "end-body-parts-fix" && window.innerWidth <= 766) {
        $(".body-parts-container-inner")[0].classList.add("finished-fix");
      }
    }
  });
});
