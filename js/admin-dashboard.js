document.addEventListener('DOMContentLoaded', function () {
    const eventList = document.getElementById('event-list');
    const createEventForm = document.getElementById('create-event-form');
  
    // Fetch events from the server (For now, we'll simulate this)
    async function fetchEvents() {
      const response = await fetch('http://localhost:3060/events');
      const events = await response.json();
      displayEvents(events);
    }
  
    // Display events in the table
    function displayEvents(events) {
      eventList.innerHTML = '';
      events.forEach(event => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${event.name}</td>
          <td>${new Date(event.date).toLocaleString()}</td>
          <td>${event.location}</td>
          <td>${event.description}</td>
          <td>${event.seats_left}</td>
          <td>
            <button onclick="deleteEvent(${event.id})">Delete</button>
            <button onclick="editEvent(${event.id})">Edit</button>
          </td>
        `;
        eventList.appendChild(row);
      });
    }
  
    // Handle creating a new event
    createEventForm.addEventListener('submit', async function (event) {
      event.preventDefault();
  
      const newEvent = {
        name: document.getElementById('event-name').value,
        date: document.getElementById('event-date').value,
        location: document.getElementById('event-location').value,
        description: document.getElementById('event-description').value,
      };
  
      const response = await fetch('http://localhost:3060/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      });
  
      if (response.ok) {
        alert('Event created successfully');
        fetchEvents(); // Refresh the events list
      } else {
        alert('Error creating event');
      }
    });
  
    // Delete an event
    async function deleteEvent(eventId) {
      const response = await fetch(`http://localhost:3061/events/${eventId}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Event deleted');
        fetchEvents(); // Refresh the events list
      } else {
        alert('Error deleting event');
      }
    }
  
    // Edit an event (To be implemented)
    function editEvent(eventId) {
      alert('Edit event functionality not implemented yet');
    }
  
    fetchEvents(); // Fetch and display events when the page loads
    
    // Sign-out button functionality
    document.getElementById('signout-btn').addEventListener('click', () => {
      // Remove any stored token or user session
      localStorage.removeItem('authToken');
      
      // Redirect to the sign-in page
      window.location.href = 'index.html';
    });
  
  });
  