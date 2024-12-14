document.addEventListener('DOMContentLoaded', function () {
    const eventList = document.getElementById('event-list');
  
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
          <td>${event.event_name}</td>
          <td>${new Date(event.date).toLocaleString()}</td>
          <td>${event.location}</td>
          <td>${event.description}</td>
          
          <td>
            <button onclick="rsvpEvent(${event.id})">RSVP</button>
          </td>
          <td>${event.capacity}</td>
        `;
        eventList.appendChild(row);
      });
    }
    window.rsvpEvent = async function (eventId) {
      try {
        const response = await fetch(`http://localhost:3060/events/rsvp/${eventId}`, {
          method: 'POST',
        });
    
        if (response.ok) {
          alert('You have successfully RSVP\'d for this event!');
        } else {
          alert('Error RSVPing for the event');
        }
      } catch (error) {
        console.error('Error while RSVP:', error);
        alert('An unexpected error occurred while RSVPing');
      }
    };
    
    // Assuming fetchEvents is defined elsewhere, call it to fetch and display events
    fetchEvents();
   
    // Sign-out button functionality
    document.getElementById('signout-btn').addEventListener('click', () => {
      // Remove any stored token or user session
      localStorage.removeItem('authToken');
      
      // Redirect to the sign-in page
      window.location.href = 'index.html';
    });
  
  });
  