function checkVisa() {
    var countryName = document.getElementById("countryInput").value;

    // URL of the Wikipedia page containing visa requirements
    var url = "https://en.m.wikipedia.org/wiki/Visa_requirements_for_Indian_citizens";

    // Using CORS proxy to fetch the Wikipedia page
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/' + url;

    fetch(proxyUrl)
        .then(response => response.text())
        .then(data => {
            console.log(data); // Log the API response to the console
            var parser = new DOMParser();
            var htmlDoc = parser.parseFromString(data, 'text/html');

            // Rest of the code to extract country information...
            
            // Finding all table rows containing country names and visa information
            var rows = htmlDoc.querySelectorAll('table.wikitable tr');

            // Searching for the country name in the table rows
            var foundCountry = Array.from(rows).find(row => {
                var cells = row.querySelectorAll('td');
                if (cells.length > 1) {
                    var countryCell = cells[0].textContent.trim();
                    return countryCell.toLowerCase().includes(countryName.toLowerCase());
                }
                return false;
            });

            if (foundCountry) {
                // Extracting the visa information from the same row
                var visaInfo = foundCountry.querySelectorAll('td')[1].textContent.trim();
                var photoUrl = foundCountry.querySelector('img').getAttribute('src');
                var countryPhoto = document.getElementById("countryPhoto");
                countryPhoto.src = "https:" + photoUrl;
                document.getElementById("visaResult").textContent = "Visa requirement for " + countryName + ": " + visaInfo;
            } else {
                document.getElementById("visaResult").textContent = "Visa information not found for this country.";
            }
        })
        .catch(error => {
            document.getElementById("visaResult").textContent = "An error occurred: " + error;
        });
}
