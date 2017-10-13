function formattedDate(key, data) {
    var d = new Date(data.time);
    var formattedDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
    var hours = (d.getHours() > 12) ? d.getHours() - 12 : d.getHours();
    var minutes = (d.getHours() > 12) ? (d.getMinutes() + " PM") : d.getMinutes() + " AM";
    var formattedTime = hours + ":" + minutes;

    return formattedDate = formattedDate + " " + formattedTime;
}

function layout(data, key) {}

function logResults(res) {
    var meetups = document.getElementById("meetups");
    for (var i = 0; i <= res.data.length; i++) {
        var data = res.data[i];
        console.log(data);
        var layout = (meetups.innerHTML = '<div class="meetup">' + "<h2>" + data.name + "</h2>" +
            "<h3>" + formattedDate(i, data) + "</h3>" +
            "<h3>" + data.venue.name + "</h3>" +
            "<h3>" + data.venue.address_1 + "</h3>" +
            data.description +
            "</div>" + "<hr>")
        return layout
    }
}

/* $.ajax({
    url: "https://api.meetup.com/charlottejuniordevs/events?photo-host=public&sig_id=182549128&sig=5e13646fba70874a21074c50827a5e377722fd01",
    dataType: "jsonp",
    jsonpCallback: "logResults"
}); */
