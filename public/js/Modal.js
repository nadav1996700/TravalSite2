const container = document.getElementById("container");
const modalBody = document.querySelector(".modal-body");

Promise.all([
  fetch("/static/dataFromMongo.json")
    .then((data) => data.json())
    .catch((err) => false),
]).then((data) => {
  runModalApp(data);
});

function buildLocationCards(locations) {
  let element;
  Object.values(locations).forEach((v) => {
    element = `<div class="location">
                <img src="${v.src}" alt="">
                  <div class="location-name">
                      <p>${v.location}</p>
                  </div>
                  <div class="modal-buttons">
                    <button class="open-modal" id="${v.location}">watch</button>
                    <button class="remove-card" id="${v.location}" style="display:block">delete</button>
                  </div>
              </div>`;
    container.insertAdjacentHTML("beforeend", element);
  });
}

function runModalApp(data) {
  // MongoDB Data
  buildLocationCards(data[0]);

  // Get the modal
  const modal = document.querySelector(".modal");
  const modalHeader = document.querySelector(".modal-header");
  // Get the Close Button element that closes the modal
  const closeBtn = document.querySelector(".close");

  // Get all buttons that opens a modal
  const btns = document.querySelectorAll(".open-modal");
  var description;
  var src;
  // When the user clicks the button, open the modal
  btns.forEach((btn) => {
    const btnID = btn.id;
    btn.onclick = function () {
      modal.style.display = "block";
      getSRC(data[0], btnID);
      modalHeader.insertAdjacentHTML("afterbegin", `<img src="${src}" alt="">`);
      getDescription(data[0], btnID);
      modalBody.insertAdjacentHTML("afterbegin", `<p>${description}</p>`);
    };
  });

  // When the user clicks on <span> (x), close the modal
  closeBtn.onclick = function () {
    modal.style.display = "none";
    const img = modalHeader.querySelector("img");
    const p = modalBody.querySelector("p");
    modalHeader.removeChild(img);
    modalBody.removeChild(p);
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      const img = modalHeader.querySelector("img");
      const p = modalBody.querySelector("p");
      modalHeader.removeChild(img);
      modalBody.removeChild(p);
    }
  };

  function getDescription(locations, btnID) {
    Object.entries(locations).forEach((k, v) => {
      if (k[1] !== undefined) {
        if (k[1].location === btnID) {
          description = k[1].description;
          return;
        }
      }
    });
    return "";
  }

  function getSRC(locations, btnID) {
    Object.entries(locations).forEach((k, v) => {
      if (k[1] !== undefined) {
        if (k[1].location === btnID) {
          src = k[1].src;
          return;
        }
      }
    });
    return "";
  }

  // Get all remove buttons
  const remove = document.querySelectorAll(".remove-card");

  remove.forEach((el) => {
    const location = el.id;
    el.onclick = () => {
      getSRC(data[0], location);
      fetch(`/remove?loc=${location}&src=${src}`);
      window.location.reload();
    };
  });
}
