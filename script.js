const API_KEY = "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";

async function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value
    if (!message) return;

    // Adciona Mensagem do usuário na tela
    appendMessage('Você', message);
    input.value ='';

    // Chamada para API da Groq
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: message} ]
        })
    });

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Adiciona Resposta da IA na tela
    appendMessage('Groq IA', aiResponse);
}

function appendMessage(sender, text) {
    const window = document.getElementById('chat-window');
    window.innerHTML += `<p><strong>${sender}:</strong> ${text}</p>`;
    window.scrollTop = window.scrollHeight;
}