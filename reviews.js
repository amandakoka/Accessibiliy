// This code was written with the help of the Week 11 - JavaScript 5 module 
// "Accessing Application Programming Interfaces" from the web teaching environment.
// https://teaching.computing.edgehill.ac.uk/wte/parts/8562

// Function to create the review elements
function createReviewElement(nickname, reviewText, rating) {
    const dtElement = document.createElement('dt');
    dtElement.textContent = nickname;

    const ddElement = document.createElement('dd');
    ddElement.textContent = `${reviewText} (Rating: ${rating} stars)`;

    return { dtElement, ddElement };
}

// Function to load the reviews 
function load_reviews(reviews) {
    const list = document.getElementById('reviewList');
    list.innerHTML = '';

    reviews.forEach(review => {
        const dt = createReviewElement(review.nickname, review.review, review.rating);
        list.appendChild(dt.dtElement);
        list.appendChild(dt.ddElement);
    });
}

// Function to handle showing reviews when the button is clicked
function showReviews(event) {
    event.preventDefault();
    const button = event.target;
    const reviewsSection = document.querySelector('.reviews');

    if (!reviewsSection.classList.contains('loaded')) {
        fetch('https://cis1110apicw.computing.edgehill.ac.uk/reviews')
            .then(response => response.json())
            .then(reviews => {
                load_reviews(reviews);
                reviewsSection.classList.add('loaded');
            })
            .catch(error => console.error('Error fetching reviews:', error));
        }

        reviewsSection.classList.toggle('hidden');
        button.classList.toggle('hidden');
    }

    // Add event listener to the review button
    const reviewButton = document.getElementById('reviewButton');
    reviewButton.addEventListener('click', showReviews);




