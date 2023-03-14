Website Changes:

    1. Consolidated three separate about pages ("/about.html", "/skills.html", "/employment.html") into a single page ("/about.html") using css tabs and nav bar onclick functions. Page no longer reloads and opens a new page every time a new menu is selected on the left-hand navigation bar.

    2. Addressed overflow issues present in about me menus ("/about.html"), detached vertical scrolling of text content from left-hand navigation bar. Now the right-hand text can be scrolled up and down without affecting the navigation bar position.

    3. Shaded-in cells and darkened text of table in skills menu of about me page ("/about.html").

    4. Added lightening hover effect on cells in skills menu table ("/about.html") to increase mouse tracking intuitiveness.

    5. Created new custom form submission dialog for contact form ("./contact") giving users the ability to submit multiple consecutive questions or return to the home page. Created "./contact.js" module to facilitate dialog display.

    6. Decoupled standard submit functionality on contact form ("./contact"), no longer refreshing page or sending data on submit.

    7. Added href.location navigate functionality to home page ("./index") projects button.

    8. Fixed Chrome styling oversights (All Pages). When constructing the original site for the previous homeworks, I never tested the style on a Chrome browser. Notable changes include correctly adding visited link colors and link-disappearing behavior on hover, correct backup font loading, and page layout responsiveness.

    9. Added typewriter animation for all non-index html page titles for increased interactivity.

    10. Converted each of the three figures on the past projects page ("./projects.html") into clickable elements using element-wide onclick functions. In previous homeworks, only the text anchors in each figure could be clicked.

    11. Fixed an error where clicking on the website title in the upper-left corner would generate a 404 when attempting to navigate from an individual project page ("./projects/scraper.html", "./projects/wtracker.html", "./projects/zooseeker.html").

Third-Party Scripting:

To substantiate my existing portfolio website, I opted to include third-party data collection on every page of the site using Google Analytics. After creating a free Google Analytics account and a new property to store collected usage measurements, including an identical JS script within each html page of the website was all that was required in order for the service to begin generating report snapshots and real-time data monitoring. Of all the possible third-party scripts that could have been utilized on the site, I believed data-collection-related ones like Google Analytics to be among the most useful because of their immediate relevance to the task of optimizing website performance and accessibility. In particular, the platform's provision of inherently informative metrics including average engagement time, numbers of new and total users engaging with the site over different periods of time, and what platforms they are use when operating the site, can be directly leveraged to identify what website features are the most important to make responsive and visually appealing, something that typically differs based on the stylistic and functional differences that arise from different built-in browser styles. Additionally, the real-time reports included on the analytics dashboard also provides an avenue for security from a development standpoint. On a site with assumably minimal traffic, malicious entities attempting to inject or otherwise take advantage of the website can be easily identified using the geographical heat map feature, or potentially by high numbers of form submission event counts that might be representative of repeated attempts at harmful code injection. Above all these considerations, however, the adoption of a form of analytics tracking is an important way to follow the professor's advice to be intentional when it comes to development-based design decisions. Even if certain metrics are not leveraged in a proactive manner as in the case of security-related usages, the fact that the collected data is inherently tied to a site user's interactions with what exists on the page makes them especially potent tools when it comes to influencing future design decisions, regardless of whether or not a developer chooses to prioritize certain statistics over others.
