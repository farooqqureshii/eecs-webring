const websites = [
    { url: 'https://farooqqureshi.com', year: '2030', image: 'pic.png', program: 'Electrical Engineering & Computing Technology' },
    { url: 'https://andrewpham.xyz', year: '2025', image: 'pic.png', program: 'Computer Science' },
    { url: 'https://saadmazhar.com', year: '2026', image: 'pic.png', program: 'Computer Science' },
    { url: 'http://reemaalwadi.com/', year: '2027', image: 'pic.png', program: 'Electrical Engineering & Computing Technology' },
];

let hoverTimeout; 

function displayWebsites() {
    const websiteGrid = document.getElementById('website-grid');
    websiteGrid.innerHTML = '';

    websites.forEach((website, index) => {
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

        
        websiteItem.addEventListener('mouseenter', () => {
            updateRandomWebsite(websites[index]);
            document.getElementById('random-container').style.opacity = 1;
            clearTimeout(hoverTimeout); 
        });

        websiteItem.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => {
                document.getElementById('random-container').style.opacity = 0;
            }, 500); 
        });
    });
}

function updateRandomWebsite(website) {
    const websiteLink = document.getElementById('random-website');
    const websiteYear = document.getElementById('random-year');
    const websiteImage = document.getElementById('random-image');

    websiteLink.href = website.url;
    websiteLink.textContent = new URL(website.url).hostname;
    websiteYear.textContent = `${website.program}, ${website.year}`;
    websiteImage.src = website.image;

    // FADE IMAGE 
    websiteImage.style.opacity = 0;
    void websiteImage.offsetWidth; 
    websiteImage.style.opacity = 1;
}

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


document.getElementById('website-grid').addEventListener('mouseover', (event) => {
    if (event.target.closest('.website-item')) {
        document.getElementById('random-container').style.opacity = 1;
    }
});

document.getElementById('random-container').addEventListener('mouseover', () => {
    clearTimeout(hoverTimeout); 
    document.getElementById('random-container').style.opacity = 1;
});

document.getElementById('random-container').addEventListener('mouseleave', () => {
    hoverTimeout = setTimeout(() => {
        document.getElementById('random-container').style.opacity = 0;
    }, 500); 
});

displayWebsites();

document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('h1');
    const titleText = title.textContent;
    
    
    title.innerHTML = titleText.split('').map(char => `<span>${char}</span>`).join('');
});


const texts = [
    `Built by Farooq in Ottawa.`,
    "Thanks for stopping by.",
    "A collection of sites for uOttawa EECS."
];

const typingSpeed = 65;
const deletingSpeed = 70;
const delayBetweenTexts = 2000;
const delayAfterDelete = 1000;

document.addEventListener('DOMContentLoaded', function() {
    const footerTextElement = document.getElementById('footer-text');
    if (footerTextElement) {
        footerTextElement.innerHTML = ''; 

        let textIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < texts[textIndex].length) {
                
                footerTextElement.innerHTML += texts[textIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingSpeed);
            } else {
                setTimeout(deleteText, delayAfterDelete);
            }
        }

        function deleteText() {
            if (charIndex > 0) {
                
                footerTextElement.innerHTML = texts[textIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(deleteText, deletingSpeed);
            } else {
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, delayBetweenTexts);
            }
        }

        setTimeout(type, 1500); 
    }
});
