        // Global State "Backend"
        let currentUser = "";
        let currentPlan = "Basic";
        let pendingPlan = "";

        // 1. Navigation & State Management
        function switchView(viewId) {
            document.querySelectorAll('.view-container').forEach(el => el.classList.add('hidden'));
            document.getElementById(viewId).classList.remove('hidden');
        }

        function openModal(modalId) { document.getElementById(modalId).classList.remove('hidden'); }
        function closeModal(modalId) { document.getElementById(modalId).classList.add('hidden'); }

        // 2. Authentication Logic
        function handleLogin() {
            const user = document.getElementById('username').value;
            if (user.trim() !== "") {
                currentUser = user;
                document.getElementById('welcome-msg').innerText = "Dashboard - Welcome, " + currentUser;
                document.getElementById('profile-username').innerText = currentUser;
                switchView('dashboard-view');
            } else {
                alert("Please enter a User ID.");
            }
        }

        // 3. Theme Toggling
        function toggleTheme() {
            document.body.classList.toggle('dark-mode');
        }

        // 4. Subscription & Upgrade Flow
        function startUpgrade() {
            closeModal('profile-modal');
            switchView('upgrade-view');
        }

        function goToPayment(tier) {
            pendingPlan = tier;
            document.getElementById('checkout-tier').innerText = tier;
            switchView('payment-view');
        }

        function processPayment() {
            const cycle = document.getElementById('billing-cycle').value;
            alert(`Processing payment for ${pendingPlan} (${cycle}) via Net Banking... Payment Successful!`);
            
            // Update Backend State
            currentPlan = pendingPlan;
            document.getElementById('profile-plan').innerText = currentPlan;
            document.getElementById('upgrade-prompt').classList.add('hidden'); // Hide prompt once upgraded
            
            // Route back to profile, then user can go to dashboard
            switchView('dashboard-view');
            openModal('profile-modal');
        }

        // 5. Sensor Data Simulation
        function showHistory(sensorType) {
            document.getElementById('history-title').innerText = sensorType;
            const list = document.getElementById('history-list');
            list.innerHTML = ""; // Clear old history

            // Generate mock history data points
            const now = new Date();
            for(let i=0; i<5; i++) {
                const li = document.createElement('li');
                li.style.padding = "12px 0";
                li.style.borderBottom = "1px solid var(--border-color)";
                
                const pastTime = new Date(now.getTime() - (i * 3600000)); // 1 hour intervals
                let reading = "";
                if(sensorType === 'Fire') reading = `${70 + Math.floor(Math.random() * 5)}°F - Normal`;
                if(sensorType === 'Gas') reading = `${10 + Math.floor(Math.random() * 10)} PPM - Safe`;
                if(sensorType === 'Water') reading = `0 cm - Dry`;

                li.innerHTML = `<strong>${pastTime.toLocaleDateString()} ${pastTime.toLocaleTimeString()}</strong><br><span style="color:var(--text-secondary)">Reading: ${reading}</span>`;
                list.appendChild(li);
            }

            openModal('history-modal');
        }
