const firebaseConfig = {
    apiKey: "AIzaSyAeqLJKjzEpIx_6EyL9IFTuTCOwM3x1xcQ",
    authDomain: "pulse-point-v1.firebaseapp.com",
    projectId: "pulse-point-v1",
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.getElementById('requestForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const bloodGroup = document.getElementById('bloodGroup').value;
    const message = document.getElementById('message').value;

    try {
        const snapshot = await db.collection('users').where('bloodGroup', '==', bloodGroup).get();

        if (snapshot.empty) {
            alert('No donors found for this blood group!');
            return;
        }

        const donors = [];
        snapshot.forEach(doc => {
            const donor = doc.data();
            donors.push({ id: doc.id, ...donor });
        });

        const donorList = document.getElementById('donorList');
        donorList.innerHTML = donors.map(donor => `
            <div class="donor-card">
                <div class="donor-info">
                    <p class="donor-name">${donor.name}</p>
                    <div class="donor-details">
                        <span>📞 ${donor.phone}</span>
                        <span>🩸 ${donor.bloodGroup}</span>
                        <span>👤 ${donor.gender}</span>
                    </div>
                </div>
                <button class="send-alert-btn" onclick="sendAlert('${donor.id}', '${donor.email}')">Send Alert</button>
            </div>
        `).join('');

        alert(`Found ${donors.length} donors!`);
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});

function sendAlert(userId, email) {
    const message = document.getElementById('message').value;

    db.collection('alerts').add({
        userId: userId,
        email: email,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert(`Alert sent to ${email}`);
    })
    .catch((error) => {
        alert(`Error: ${error.message}`);
    });
}