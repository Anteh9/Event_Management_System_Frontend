let jwtToken = '';  // Store JWT token after login

// Show or hide sections
const showSection = (sectionId) => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
};

// Handle login
const loginUser = async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('http://localhost:4030/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
        jwtToken = data.token;
        showSection('events-list');
        fetchEvents();
    } else {
        document.getElementById('login-error').innerText = data.error;
    }
};

// Fetch all events
const fetchEvents = async () => {
    const response = await fetch('http://localhost:4030/events', {
        headers: { 'Authorization': `Bearer ${jwtToken}` }
    });

    const data = await response.json();
    renderEvents(data);
};

// Render events on the page
const renderEvents = (events) => {
    const eventsContainer = document.querySelector('.events-container');
    eventsContainer.innerHTML = '';
    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');
        eventElement.innerHTML = `
            <div>
                <h3>${event.name}</h3>
                <p>${event.date} at ${event.time}</p>
                <p>${event.location}</p>
                <p>Available Seats: ${event.capacity}</p>
            </div>
            <button onclick="RSVP(${event.id})" ${event.capacity <= 0 ? 'disabled' : ''}>RSVP</button>
        `;
        eventsContainer.appendChild(eventElement);
    });
};

// Handle RSVP
const RSVP = async (eventId) => {
    const response = await fetch(`http://localhost:4030/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${jwtToken}` }
    });

    const data = await response.json();
    if (response.ok) {
        alert('You have successfully RSVP\'d!');
        fetchEvents();
    } else {
        alert(data.error);
    }
};

// Create event (for admin)
const createEvent = async (e) => {
    e.preventDefault();

    const eventName = document.getElementById('event-name').value;
    const eventDate = document.getElementById('event-date').value;
    const eventTime = document.getElementById('event-time').value;
    const eventLocation = document.getElementById('event-location').value;
    const eventCapacity = document.getElementById('event-capacity').value;

    const response = await fetch('http://localhost:4030/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({ name: eventName, date: eventDate, time: eventTime, location: eventLocation, capacity: eventCapacity })
    });

    const data = await response.json();
    if (response.ok) {
        alert('Event created successfully!');
        showSection('events-list');
        fetchEvents();
    } else {
        alert(data.error);
    }
};

// Attach login form handler
document.getElementById('login-form').addEventListener('submit', loginUser);
document.getElementById('event-form').addEventListener('submit', createEvent);
