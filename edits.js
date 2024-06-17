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
            vertical-align: middle; /* Align vertically within the line */
            margin-right: -0.1em; /* Adjust margin to prevent overflow */
        }
        .bounce-arrow-down {
            display: inline-block;
            animation: bounce-down 1s infinite;
            font-size: 1.5em;
            color: #ffffff; /* White color for visibility */
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
            position: relative;
            top: 5px; /* Adjust to stay within the box */
            vertical-align: middle; /* Align vertically within the line */
            margin-right: -0.1em; /* Adjust margin to prevent overflow */
        }
        .percentage-90-99 {
            color: lightgreen; /* Light green for 90-99% */
        }
        .percentage-75-89 {
            color: yellow; /* Yellow for 75-89% */
        }
        .percentage-50-74 {
            color: orange; /* Orange for 50-74% */
        }
        .percentage-0-49 {
            color: red; /* Red for 0-49% */
        }
        .fa-header-icon {
            font-size: 64px; /* Minimum size for the icons */
            margin-right: 10px; /* Space between icon and header text */
            vertical-align: middle; /* Align icon with the middle of the text */
        }
        .fa-discord { color: #7289DA; } /* Discord purple */
        .fa-globe { color: #4CAF50; } /* Websites green */
        .fa-cogs { color: #FFC107; } /* Services amber */
        .fa-home { color: #00BCD4; } /* Homes cyan */
        .fa-photo-video { color: #FF5722; } /* Media orange */
        .fa-server { color: #673AB7; } /* Servers deep purple */
    `;
    document.head.appendChild(style);

    // Function to replace percentage with bouncing arrows and color percentages based on their value
    const replaceBadgeWithArrows = () => {
        // Select all info div elements
        const infoDivs = document.querySelectorAll('.info');

        infoDivs.forEach(infoDiv => {
            // Find the specific badge spans within these info divs for bg-primary
            const primaryBadgeSpans = infoDiv.querySelectorAll('.badge.rounded-pill.bg-primary[title="24-hour"]');
            primaryBadgeSpans.forEach(span => {
                const text = span.textContent.trim();
                const value = parseFloat(text);

                if (text === '100%') {
                    // Replace the text with the Font Awesome upward arrow
                    span.innerHTML = '<i class="fas fa-arrow-up bounce-arrow"></i>';
                } else if (value >= 90 && value < 100) {
                    // Apply light green color for 90-99%
                    span.classList.add('percentage-90-99');
                } else if (value >= 75 && value < 90) {
                    // Apply yellow color for 75-89%
                    span.classList.add('percentage-75-89');
                } else if (value >= 50 && value < 75) {
                    // Apply orange color for 50-74%
                    span.classList.add('percentage-50-74');
                } else if (value >= 0 && value < 50) {
                    // Apply red color for 0-49%
                    span.classList.add('percentage-0-49');
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

// IIFE to add Font Awesome icons next to headers
(function() {
    // Function to add icons next to headers
    function addIconsToHeaders() {
        const headerIcons = {
            'DISCORD': '<i class="fab fa-discord fa-header-icon"></i>',
            'WEBSITES': '<i class="fas fa-globe fa-header-icon"></i>',
            'SERVICES': '<i class="fas fa-cogs fa-header-icon"></i>',
            'HOMES': '<i class="fas fa-home fa-header-icon"></i>',
            'MEDIA': '<i class="fas fa-photo-video fa-header-icon"></i>',
            'SERVERS': '<i class="fas fa-server fa-header-icon"></i>'
        };

        document.querySelectorAll('span[contenteditable="false"]').forEach(span => {
            const text = span.innerText.trim().toUpperCase(); // Convert to uppercase to match keys
            if (headerIcons[text]) {
                // Create a temporary div to insert the icon HTML safely
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = headerIcons[text];
                const iconElement = tempDiv.firstChild;

                // Insert the icon before the span text
                span.parentNode.insertBefore(iconElement, span);
            }
        });
    }

    // Check if the document is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addIconsToHeaders);
    } else {
        // Document is already loaded
        addIconsToHeaders();
    }
})();
