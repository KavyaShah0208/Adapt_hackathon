document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    const chatArea = document.getElementById('chat-area');
    const navItems = document.querySelectorAll('.nav-item');
    const uploadBtn = document.getElementById('upload-btn');
    const mainContent = document.getElementById('main-content');
    const dashboardContent = document.getElementById('dashboard-content');


    // --- Dynamic Content Definition for Settings ---
    const settingsHTML = `
        <div id="settings-content" class="page-container">
            <header class="header">
                <h2><i class="fas fa-cog"></i> Account Settings</h2>
            </header>

            <div class="settings-card">
                <h3>Financial Defaults</h3>
                <div class="form-group">
                    <label for="monthly-budget">Default Monthly Budget (₹)</label>
                    <input type="number" id="monthly-budget" value="70000" min="0" placeholder="e.g., 70000">
                </div>
                <div class="form-group">
                    <label for="priority-category">High-Priority Alert Category</label>
                    <select id="priority-category">
                        <option value="food">Food</option>
                        <option value="transport">Transport</option>
                        <option value="shopping">Shopping</option>
                        <option value="rent">Rent</option>
                    </select>
                </div>
                <button class="save-btn" data-setting="financial">Save Financial Settings</button>
            </div>

            <div class="settings-card">
                <h3>AI Assistant Customization</h3>
                <div class="form-group">
                    <label for="ai-tone">AI Communication Tone</label>
                    <select id="ai-tone">
                        <option value="expert">Financial Expert (Formal)</option>
                        <option value="casual" selected>Friendly & Casual</option>
                        <option value="concise">Concise & Direct</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="alert-pref">Alerts Preference</label>
                    <select id="alert-pref">
                        <option value="realtime">Real-Time Irregular Alerts</option>
                        <option value="daily" selected>Daily Summary Email</option>
                    </select>
                </div>
                <button class="save-btn" data-setting="ai">Save AI Preferences</button>
            </div>
        </div>
    `;

    // --- Attach Save Listeners ---
    const attachSettingsListeners = () => {
        document.querySelectorAll('.save-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const settingType = btn.getAttribute('data-setting');
                
                // *** BACKEND SIMULATION ***
                console.log(`Simulating POST request to save ${settingType} settings...`);
                // In a real app, this would collect form data and send it via fetch()
                alert(`Settings saved successfully! (${settingType} configuration updated.)`); 
            });
        });
    };
    
    // --- Page Loader Function ---
    const loadPage = (pageName) => {
        // Clear any previous settings-related content/listeners
        const existingDynamicContent = document.getElementById('settings-content');
        if (existingDynamicContent) {
            existingDynamicContent.remove();
        }
        // Remove content for other placeholder pages
        mainContent.querySelectorAll('.page-container:not(#dashboard-content)').forEach(el => el.remove());


        if (pageName === 'dashboard') {
            dashboardContent.style.display = 'block';
        } else if (pageName === 'settings') {
            dashboardContent.style.display = 'none';
            mainContent.insertAdjacentHTML('beforeend', settingsHTML);
            // Attach new event listeners after content is injected
            attachSettingsListeners();
        } else {
            // Placeholder for 'upload' and 'budgets'
            dashboardContent.style.display = 'none';
            const placeholderContent = `
                <div class="page-container" style="padding: 20px;">
                    <header class="header"><h2>${pageName.charAt(0).toUpperCase() + pageName.slice(1)} Page</h2></header>
                    <p style="color: #a9a9b9;">Content for the **${pageName.toUpperCase()}** page will be built here. Current view is a prototype placeholder.</p>
                </div>`;
            mainContent.insertAdjacentHTML('beforeend', placeholderContent);
        }
    };

    // --- 1. Navigation Logic (Modified to use loadPage) ---
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active state
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const pageName = item.getAttribute('data-page');
            loadPage(pageName);
        });
    });

    // --- 2. Upload Button Logic ---
    uploadBtn.addEventListener('click', () => {
        alert('Upload feature initiated! (In a real app, this would open a file dialog.)');
    });

    // --- 3. AI Chat Logic (Unchanged) ---

    // Function to append a message to the chat area
    const appendMessage = (message, isUser) => {
        const p = document.createElement('p');
        p.className = isUser ? 'user-message' : 'ai-message';
        p.innerHTML = message; // Using innerHTML to allow for strong tags (**) in AI responses
        chatArea.appendChild(p);

        // Scroll to the bottom to show the newest message
        chatArea.scrollTop = chatArea.scrollHeight;
    };

    // Function to simulate AI response
    const getAIResponse = (userQuery) => {
        const query = userQuery.toLowerCase().trim();

        if (query.includes('spend more this month')) {
            return `Based on your analysis, you spent **₹3,200 more** on Food and **₹1,500 more** on Transport. The main reason for Food was 5 extra Zomato orders, and for Transport, it was a weekend trip to Lonavala. Total irregular increase: **₹4,700**.`;
        } else if (query.includes('how much did i save')) {
            return `Your **Net Savings** for October is **₹22,500**, which is 15% above your set goal! Great job!`;
        } else if (query.includes('set a')) {
            const matches = query.match(/₹([\d,]+) limit for (\w+)/);
            if (matches) {
                 const amount = matches[1];
                 const category = matches[2];
                 return `Goal acknowledged! A **₹${amount} limit for ${category}** has been set for November. I will alert you if you get close.`;
            }
            return `I can set a new budget for you. Please specify the category and amount, like "Set a ₹5,000 limit for food."`;
        } else if (query.includes('predict') || query.includes('next month')) {
            return `Predictive modeling suggests your expenses will be around **₹58,000** next month, assuming no major irregular purchases, a 5% drop in Food spending, and stable Rent/Shopping costs.`;
        } else {
            return `I'm an AI Finance Assistant. I can analyze your spending, set budgets, and predict trends. Try asking a question about your expense breakdown!`;
        }
    };

    // Event listener for sending messages
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && chatInput.value.trim() !== '') {
            const userMessage = chatInput.value.trim();
            appendMessage(userMessage, true); // Add user message

            // Clear input immediately
            chatInput.value = '';

            // Simulate AI typing delay
            setTimeout(() => {
                const aiResponse = getAIResponse(userMessage);
                appendMessage(aiResponse, false); // Add AI response
            }, 700); // 700ms delay
        }
    });

    // Ensure the dashboard loads initially
    loadPage('dashboard');
});