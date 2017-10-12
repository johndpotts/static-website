function formattedDate(key, data) {
    var d = new Date(data.time);
    var formattedDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
    var hours = (d.getHours() > 12) ? d.getHours() - 12 : d.getHours();
    var minutes = (d.getHours() > 12) ? (d.getMinutes() + " PM") : d.getMinutes() + " AM";
    var formattedTime = hours + ":" + minutes;

    return formattedDate = formattedDate + " " + formattedTime;
}

function layout(data, key) {
    var meetups = document.getElementById("meetups");

    return meetups.innerHTML = '<div class="meetup">' + "<h2>" + data.name + "</h2>" +
        "<h3>" + formattedDate(key, data) + "</h3>" +
        "<h3>" + data.venue.name + "</h3>" +
        "<h3>" + data.venue.address_1 + "</h3>" +
        data.description +
        "</div>" + "<hr>";
}

function logResults(res) {
    var apiCallMap = res.data.map((data, key) => layout(data, key))
    return apiCallMap;
}

$.ajax({
    url: "https://api.meetup.com/charlottejuniordevs/events?photo-host=public&sig_id=182549128&sig=5e13646fba70874a21074c50827a5e377722fd01",
    dataType: "jsonp",
    jsonpCallback: "logResults"
});
