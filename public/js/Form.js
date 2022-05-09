const file = document.getElementById("fileName");
const reader = new FileReader();

function previewFile() {
  var preview = document.getElementById("imgID");
  var file = document.querySelector("input[type=file]").files[0];

  reader.onloadend = function () {
    preview.src = reader.result;
    preview.style.display = "block";
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}

function validateFileType() {
  previewFile();
  var fileName = file.value;
  var idxDot = fileName.lastIndexOf(".") + 1;
  var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
  if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
  } else {
    alert("Only jpg/jpeg and png files are allowed!");
    window.location.reload();
  }
}
