const agentsContainer = document.getElementById('agents-container');
const agentModal = document.getElementById('agent-modal');
const agentImage = document.getElementById('agent-image');
const agentName = document.getElementById('agent-name');
const agentDescription = document.getElementById('agent-description');
const closeBtn = document.getElementById('close-btn');
const abilitiesContainer = document.createElement('div');
abilitiesContainer.id = 'abilities-container';
agentModal.querySelector('.modal-content').appendChild(abilitiesContainer);

const agentRole = document.getElementById('agent-role');
const roleIcon = document.getElementById('role-icon');
const roleName = document.getElementById('role-name');
const shareBtn = document.getElementById('share-btn');

closeBtn.addEventListener('click', () => {
    agentModal.style.display = 'none';
});

function navigateToPage() {
    window.location.href = "comingsoon.html";
}

// Fetch agents data
fetch('https://valorant-api.com/v1/agents?isPlayableCharacter=true')
    .then(response => response.json())
    .then(data => {
        const agents = data.data;
        agents.forEach(agent => {
            const agentCard = document.createElement('div');
            agentCard.classList.add('agent-card');

            const agentImageElement = document.createElement('img');
            agentImageElement.src = agent.displayIconSmall || agent.displayIcon;
            agentCard.appendChild(agentImageElement);

            const agentNameElement = document.createElement('div');
            agentNameElement.classList.add('agent-name-overlay');
            agentNameElement.textContent = agent.displayName;
            agentCard.appendChild(agentNameElement);

            agentCard.addEventListener('click', () => {
                showAgentModal(agent);
            });

            agentsContainer.appendChild(agentCard);
        });
    })
    .catch(error => console.error('Error fetching agent data:', error));



function showAgentModal(agent) {
    agentImage.src = agent.fullPortrait || agent.displayIcon; 
    agentName.textContent = agent.displayName;
    agentDescription.textContent = agent.description;
    
    
    roleName.textContent = agent.role.displayName;
    roleIcon.src = agent.role.displayIcon;

    agentModal.style.display = 'flex';

    abilitiesContainer.innerHTML = '';
    const abilities = agent.abilities;
    if (abilities && abilities.length > 0) {
        abilities.forEach(ability => {
            const abilityElement = document.createElement('div');
            abilityElement.classList.add('ability');

            const abilityIcon = document.createElement('img');
            abilityIcon.src = ability.displayIcon || '';
            abilityElement.appendChild(abilityIcon);

            const abilityInfo = document.createElement('div');
            const abilityName = document.createElement('div');
            abilityName.classList.add('ability-name');
            abilityName.textContent = ability.displayName;

            const abilityDescription = document.createElement('div');
            abilityDescription.textContent = ability.description;

            abilityInfo.appendChild(abilityName);
            abilityInfo.appendChild(abilityDescription);
            abilityElement.appendChild(abilityInfo);

            abilitiesContainer.appendChild(abilityElement);
        });
    }


    shareBtn.onclick = () => {
        sendAgentToWebhook(agent);
    };
}

function sendAgentToWebhook(agent) {

    const webhookUrl = 'https://mseufeduph.webhook.office.com/webhookb2/8ef714f6-81de-4b42-ad2e-c262d5ce04d1@ddedb3cc-596d-482b-8e8c-6cc149a7a7b7/IncomingWebhook/9ef0b875219140eb8135437505a9d31c/e0510d66-17c3-43f4-a3ef-0cf6a6fba189/V24duT1GXj0kuDCkgbXHPSG6tCe2ZunOnaM30gWrZrYuo1';

    const adaptiveCardPayload = {
        "type": "message",
        "attachments": [
            {
                "contentType": "application/vnd.microsoft.card.adaptive",
                "content": {
                    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                    "type": "AdaptiveCard",
                    "version": "1.4",
                    "body": [
                        {
                            "type": "TextBlock",
                            "text": "Check out this Valorant Agent!",
                            "weight": "bolder",
                            "size": "large"
                        },
                        {
                            "type": "TextBlock",
                            "text": "**Name:** " + agent.displayName,
                            "wrap": true
                        },
                        {
                            "type": "TextBlock",
                            "text": "**Role:** " + (agent.role ? agent.role.displayName : "Unknown"),
                            "wrap": true
                        },
                        {
                            "type": "TextBlock",
                            "text": "**Description:** " + agent.description,
                            "wrap": true
                        },
                        {
                            "type": "Image",
                            "url": agent.fullPortrait || agent.displayIcon,
                            "pixelWidth": 300,  // Custom width in pixels
                            "pixelHeight": 400,
                            "altText": "Agent Image"
                        }
                    ],
                    "actions": [
                        {
                            "type": "Action.OpenUrl",
                            "title": "View Agent",
                            "url": "https://playvalorant.com"
                        }
                    ]
                }
            }
        ]
    };

        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(adaptiveCardPayload),
            mode: 'no-cors'

        })
        .then(response => {
            if (response.ok) {
                alert('Agent information shared successfully!');
            }
        })
        .catch(error => {
            console.error('Error sharing agent information:', error);
            alert('An error occurred while sharing agent information.');
        });
}

window.onclick = function(event) {
    if (event.target === agentModal) {
        agentModal.style.display = 'none';
    }
};
