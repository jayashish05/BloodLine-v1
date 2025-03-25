const firebaseConfig = {
    apiKey: "AIzaSyAeqLJKjzEpIx_6EyL9IFTuTCOwM3x1xcQ",
    authDomain: "pulse-point-v1.firebaseapp.com",
    databaseURL: "https://pulse-point-v1-default-rtdb.firebaseio.com",
    projectId: "pulse-point-v1",
    storageBucket: "pulse-point-v1.firebasestorage.app",
    messagingSenderId: "856788375810",
    appId: "1:856788375810:web:52df04971b0aa2fb794a1b",
    measurementId: "G-2TWYXW1C3Q"
  };
  if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();
  
  document.getElementById('location-btn').addEventListener('click', () => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              position => {
                  const locationData = {
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude,
                      timestamp: new Date().toISOString()
                  };
                  localStorage.setItem('userLocation', JSON.stringify(locationData));
                  alert('Location saved successfully!');
              },
              error => {
                  alert('Error getting location: ' + error.message);
              }
          );
      } else {
          alert('Geolocation is not supported by this browser.');
      }
  });
  
  document.getElementById('user-info-form').addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const userProfile = {
          name: document.getElementById('name').value,
          age: document.getElementById('age').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          gender: document.getElementById('blood-group').value,
          height: document.getElementById('height').value,
          weight: document.getElementById('weight').value,
          bloodGroup: document.getElementById('blood-group1').value,
          tattoo: document.getElementById('tattoo').value,
          medicalHistory: document.getElementById('medical-history').value,
          location: JSON.parse(localStorage.getItem('userLocation')),
          lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
      };
  
      try {
          await db.collection("users").add(userProfile);
  
          localStorage.setItem('userProfile', JSON.stringify(userProfile));
  
          alert("Profile saved successfully!");
          window.location.href = 'home.html';
      } catch (error) {
          console.error("Error saving profile:", error);
          alert("Failed to save profile. Check console for details.");
      }
  });