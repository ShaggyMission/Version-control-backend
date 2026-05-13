fetch("http://localhost:3000/api/topics")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("topics");

        data.forEach(topic => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <h3>${topic.title}</h3>
                <p>${topic.description}</p>
            `;

            container.appendChild(card);
        });
    });