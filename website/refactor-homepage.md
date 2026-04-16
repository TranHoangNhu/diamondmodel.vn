# Refactor Homepage

## Objective
Convert the current homepage implementation, which simply loads static HTML (`src/content/phogia-home.html`) and external CSS/JS, into proper Next.js React components styled with Tailwind CSS.

## Architecture

1.  **Components to Create:**
    *   `HomeVideoSection`: For the hero video header with animations.
    *   `MissionSection`: For the "Với Sứ Mệnh" about section.
    *   `FeaturesSection`: For the "phố gia đem đến cho khách hàng" section.
    *   `DesignProjectsSection`: For the "CÔNG TRÌNH THIẾT KẾ" blocks.
    *   `ConstructionProjectsSection`: For the "CÔNG TRÌNH THI CÔNG NỘI THẤT" block.
    *   `StatsSection`: For the "CON SỐ BIẾT NÓI" numbers.
    *   `PartnersSection`: For the "ĐỐI TÁC CỦA PHỐ GIA".
    *   `NewsSection`: For the "GÓC NHÀ ĐẸP".

2.  **Steps:**
    *   [x] Analyze `phogia-home.html` to extract content and structure.
    *   [x] Create Next.js React components for each section using Tailwind CSS for styling.
    *   [x] Replace `PhoGiaHomePage` and `PhoGiaHomeClient` implementations with a composed layout of the new React components.
    *   [x] Ensure responsive functionality with Tailwind layout utilities.
    *   [x] Purge/Remove the usage of `dangerouslySetInnerHTML` and external inline script loading.

## Progress

- [x] Initializing Task Document.
- [x] Refactoring `HomeVideoSection`.
- [x] Refactoring `MissionSection`.
- [x] Refactoring `FeaturesSection`.
- [x] Refactoring `ProjectsSection`.
- [x] Refactoring `<PhoGiaHomePage>` to use the new composed layout.
