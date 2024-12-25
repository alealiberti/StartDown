# Structure of the backoffice



# Src


## Global

### scripts
- **global.ts**:
- **expanded-navabr-phone.ts**: logic used for expand the navbar from sidebar minimal to full screen (only phone devices!)

### styles
- **global.css**: file style which contains several settings:
    - box-sizing border-box calculations, * box-sizing: inherit
    - main style adjust, which exist in every page of the backoffice, there are exposed the main contents (text, cards...)
    - :root which contains the background-colors, fonts, text-colors used for the pages of the backoffice
- **reset.css**: reset properties imported on all the pages to work on them from 0!
- **navbar-phone.css**: file style which contains the properties on the sidebar/navbar expanded, on the phone devices
- **navbar-tablet-desktop.css**:

### models
- **card-question.model.ts**: interface type used on the cards whit questions
- **card-reservation.model.ts**: interface type used on the cards whit reservations

### templates
fix and trying to integrate the funcionality of use HTML templates/components to use them inside all the pages


## Pages




---



# Tools integrated

## (Ionicons)[https://ionic.io/ionicons]



---



# Vite config 

## Pages structure (vite.config.ts)
- index.html: form Login
- src/pages/dashboard/index.html: home page of the back office
- src/pages/questions/index.html: page containing the questions
- src/pages/reservations/index.html: page containing the reservations
- src/pages/settings/index.html: page which will contains some settings like theme, graphs containing number of reservations/questions at month...