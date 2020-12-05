// Map and current location
let latitude, longitude, map, coords;
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      coords = [latitude, longitude];
      console.log(`https://maps.google.com/?ll=${latitude},${longitude}`);

      // Leaflet
      map = L.map("map").setView(coords, 16);

      L.tileLayer(
        "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      ).addTo(map);

      var myIcon = L.icon({
        iconUrl: "./maps-and-flags.png",
        iconSize: [50, 50],
        iconAnchor: [28, 76],
        popupAnchor: [-3, -76],
      });

      L.marker(coords, { icon: myIcon })
        .addTo(map)
        .bindPopup(
          L.popup({
            maxWidth: 250,
            minWidth: 140,
            className: "green-border",
            autoClose: false,
            closeOnClick: false,
          })
        )
        .setPopupContent("💃 You are here.")
        .openPopup();
    },
    function () {
      alert("Please grant location access.");
    }
  );
}

// const audioBtn = document
//   .querySelector("#audio")
//   .addEventListener("click", function (e) {
//     sos.play();
//   });

let contact = "";
const shareBtn = document
  .querySelector("#message")
  .addEventListener("click", function (e) {
    let text = `sms:${contact}?body=This is an SOS Alert! The sender is in trouble, reach them - https://maps.google.com/?ll=${latitude},${longitude}`;
    window.location.href = text;
  });

// Ring SOS Alarm
const sos = document.querySelector("#sos-alert");

const audioBtn = document.querySelector("#audio");
audioBtn.textContent = "🚨 SOS Alert";
audioBtn.addEventListener("click", function (e) {
  if (audioBtn.textContent === "🚨 SOS Alert") {
    sos.play();
    audioBtn.textContent = "🚫 Stop Alert";
  } else {
    sos.pause();
    audioBtn.textContent = "🚨 SOS Alert";
  }
});

document.querySelector("#marker").addEventListener("click", function () {
  map.setView(coords, 16, {
    animate: true,
    pan: {
      duration: 1,
    },
  });
});
