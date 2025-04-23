<script>
    const arduinoIP = "http://192.168.X.X"; // Replace with Arduino IP

    document.getElementById("form").addEventListener("submit", function(e) {
      e.preventDefault();

      const schedules = [];
      for (let i = 1; i <= 4; i++) {
        const hour = parseInt(document.getElementById("h" + i).value);
        const minute = parseInt(document.getElementById("m" + i).value);
        schedules.push({servo: i, hour, minute});
      }

      fetch(arduinoIP + "/schedule", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({schedules})
      })
      .then(res => res.text())
      .then(data => alert("Updated!"))
      .catch(err => console.error(err));
    });

    // Optionally load current schedule on page load
    fetch(arduinoIP + "/status")
      .then(res => res.json())
      .then(data => {
        data.schedules.forEach((s, i) => {
          document.getElementById("h" + (i+1)).value = s.hour;
          document.getElementById("m" + (i+1)).value = s.minute;
        });
      });
  </