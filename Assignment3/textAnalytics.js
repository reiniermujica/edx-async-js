document.getElementById("analyseButton").addEventListener("click", processReq);

function processReq() {
  loadImage(analyze);
}

function loadImage(callback) {
  var url = document.getElementById("imagesrc").value;
  document.getElementById("image").setAttribute("src", url);

  callback(url);
}

function analyze(url) {
  var reqBody = {
    url: url
  };
  var myHeader = new Headers({
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": "4c4e666d376b413e868068261580d04a"
  });
  var initObject = {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: myHeader
  };

  var request = new Request(
    "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender",
    initObject
  );
  fetch(request)
    .then(function(response) {
      if (response.ok) {
        return Promise.resolve(response.json());
      } else {
        return Promise.reject(response.statusText);
      }
    })
    .then(function(response) {
      console.log(response);
      var age = response[0].faceAttributes.age;
      var gender = response[0].faceAttributes.gender;

      var html = `<p>Age: ${age}</p> <p>Gender: ${gender}</p>`;

      document.getElementById("attr").innerHTML = html;
    })
    .catch(function(err) {
      alert(err);
    });
}
