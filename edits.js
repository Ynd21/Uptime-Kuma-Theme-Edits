document.addEventListener('DOMContentLoaded', () => {
    // Define the CSS for the bouncing animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }
        @keyframes bounce-down {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(10px);
            }
        }
        .bounce-arrow {
            display: inline-block;
            animation: bounce 1s infinite;
            font-size: 1.5em;
            color: #ffffff; /* White color for visibility */
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
            position: relative;
            top: 5px; /* Adjust to stay within the box */
        }
        .bounce-arrow-down {
            display: inline-block;
            animation: bounce-down 1s infinite;
            font-size: 1.5em;
            color: #ffffff; /* White color for visibility */
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
            position: relative;
            top: 5px; /* Adjust to stay within the box */
        }
    `;
    document.head.appendChild(style);

    // Function to replace percentage with bouncing arrows in the desired context
    const replaceBadgeWithArrows = () => {
        // Select all info div elements
        const infoDivs = document.querySelectorAll('.info');

        infoDivs.forEach(infoDiv => {
            // Find the specific badge spans within these info divs for bg-primary
            const primaryBadgeSpans = infoDiv.querySelectorAll('.badge.rounded-pill.bg-primary[title="24-hour"]');
            primaryBadgeSpans.forEach(span => {
                if (span.textContent.trim() === '100%') {
                    // Replace the text with the Font Awesome upward arrow
                    span.innerHTML = '<i class="fas fa-arrow-up bounce-arrow"></i>';
                }
            });

            // Find the specific badge spans within these info divs for bg-danger
            const dangerBadgeSpans = infoDiv.querySelectorAll('.badge.rounded-pill.bg-danger[title="24-hour"]');
            dangerBadgeSpans.forEach(span => {
                if (span.textContent.trim().endsWith('%')) {
                    // Replace the text with the Font Awesome downward arrow
                    span.innerHTML = '<i class="fas fa-arrow-down bounce-arrow-down"></i>';
                }
            });
        });
    };

    // Initial replacement
    replaceBadgeWithArrows();

    // Observe DOM changes to reapply the replacement if needed
    const observer = new MutationObserver(replaceBadgeWithArrows);
    observer.observe(document.body, { childList: true, subtree: true });
});

// IIFE to add images next to headers
(function() {
    // Function to add images next to headers
    function addImagesToHeaders() {
        const headerImages = {
            'DISCORD': 'https://i.imgur.com/BSD0h1y.png',
            'WEBSITES': 'https://i.imgur.com/AoogucL.png',
            'SERVICES': 'https://i.imgur.com/yud2bKP.png',
            'HOMES': 'https://i.imgur.com/l6yB97x.png',
            'MEDIA': 'https://i.imgur.com/paXp9GK.png',
            'SERVERS': 'https://img.city/bAWI6/KiZuHure41.png/raw'
        };

        document.querySelectorAll('span[contenteditable="false"]').forEach(span => {
            const text = span.innerText.trim().toUpperCase(); // Convert to uppercase to match keys
            if (headerImages[text]) {
                const imageSpan = document.createElement('span');
                imageSpan.style.cssText = `
                    display: inline-block;
                    height: 20px; /* Adjust the height as needed */
                    width: 20px; /* Adjust the width as needed */
                    margin-right: 8px;
                    background-image: url(${headerImages[text]});
                    background-size: contain;
                    background-repeat: no-repeat;
                    vertical-align: middle;
                    background-position: center;
                `;
                span.parentNode.insertBefore(imageSpan, span);
            }
        });
    }

    // Check if the document is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addImagesToHeaders);
    } else {
        // Document is already loaded
        addImagesToHeaders();
    }
})();
