const websites = [
    { url: 'https://farooqqureshi.com', year: '2030', image: 'pic.png', program: 'Electrical Engineering & Computing Technology' },
    { url: 'https://example.com', year: '2020', image: 'pic.png', program: 'Electrical Engineering & Computing Technology' },
];

function displayWebsites() {
    const websiteGrid = document.getElementById('website-grid');
    websiteGrid.innerHTML = '';

    websites.forEach(website => {
        const websiteItem = document.createElement('div');
        websiteItem.className = 'website-item';

        const websiteLink = document.createElement('a');
        websiteLink.href = website.url;
        websiteLink.target = '_blank';
        websiteLink.textContent = new URL(website.url).hostname;

        const yearText = document.createElement('p');
        yearText.className = 'year';
        yearText.textContent = website.year;

        websiteItem.appendChild(websiteLink);
        websiteItem.appendChild(yearText);
        websiteGrid.appendChild(websiteItem);
    });
}

function updateRandomWebsite() {
    const randomIndex = Math.floor(Math.random() * websites.length);
    const randomWebsite = websites[randomIndex];

    const websiteLink = document.getElementById('random-website');
    const websiteYear = document.getElementById('random-year');
    const websiteImage = document.getElementById('random-image');

    websiteLink.href = randomWebsite.url;
    websiteLink.textContent = new URL(randomWebsite.url).hostname;
    websiteYear.textContent = `${randomWebsite.program}, ${randomWebsite.year}`; 
    websiteImage.src = randomWebsite.image;

    websiteImage.style.opacity = 0;
    void websiteImage.offsetWidth; 
    websiteImage.style.opacity = 1;
}

displayWebsites();
updateRandomWebsite();

setInterval(() => {
    const randomContainer = document.getElementById('random-container');
    randomContainer.style.opacity = 0;
    void randomContainer.offsetWidth; 
    randomContainer.style.opacity = 1;

    updateRandomWebsite();
}, 7000);

function filterWebsites(query) {
    const websiteItems = document.querySelectorAll('.website-item');
    query = query.toLowerCase();

    websiteItems.forEach(item => {
        const websiteName = item.querySelector('a').textContent.toLowerCase();
        const websiteYear = item.querySelector('.year').textContent.toLowerCase();
        
        if (websiteName.includes(query) || websiteYear.includes(query)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

document.getElementById('search-bar').addEventListener('input', (event) => {
    filterWebsites(event.target.value);
});
