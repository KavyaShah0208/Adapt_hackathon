document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    const chatArea = document.getElementById('chat-area');
    const navItems = document.querySelectorAll('.nav-item');
    const uploadBtn = document.getElementById('upload-btn');

    // --- 1. Navigation Logic ---
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove 'active' from all
            navItems.forEach(i => i.classList.remove('active'));
            // Add 'active' to the clicked item
            item.classList.add('active');

            // Optional: Simulate page load message
            const pageName = item.getAttribute('data-page');
            console.log(`Navigating to ${pageName} page... (UI not fully built)`);
        });
    });

    // --- 2. Upload Button Logic ---
    uploadBtn.addEventListener('click', () => {
        alert('Upload feature initiated! (In a real app, this would open a file dialog.)');
    });

    // --- 3. AI Chat Logic ---

    // Function to append a message to the chat area
    const appendMessage = (message, isUser) => {
        const p = document.createElement('p');
        p.className = isUser ? 'user-message' : 'ai-message';
        p.textContent = message;
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
            // "Set a ₹5,000 limit for food next month."
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
});