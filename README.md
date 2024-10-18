# Givebutter Frontend Take-home

## Overview

Our goal is to fix and enhance a Pokedex application. If you are unfamiliar with the world of Pokemon, here is a brief explanation:

> The Pokedex is an electronic device created and designed to catalog and provide information regarding the various species of Pokemon featured in the Pokemon video game, anime and manga series.
 
[Source](https://pokemon.fandom.com/wiki/Pokedex)
 
Our version of the Pokedex is able to list and search through Pokemon. However, our search is a bit buggy. Additionally, we want to add a feature that shows a selected Pokemon's details like its **type**, **moves**, and **evolution chain**.

Your time is valuable, and we are extremely appreciative of you participating in this assessment. We're looking to gauge your ability to read and edit code, understand instructions, and deliver features, just as you would during your typical day-to-day work. We expect this test to take no more than one to two hours and ask to complete this work within the next two days. Upon submit, we will review and provide feedback to you regardless of our decision to continue the process.

Please update and add code in `App.js` and `index.css` based on the requirements found below. Additionally, we ask you to edit the `readme.md` with answers to a few questions found in the `Follow-up Questions` section also found below.

When you are finished, please upload your completed work to your Github and invite `@gperl27` to view it. **Do not open a PR please.**

## Setup

- This repo was scaffolded using `create-react-app`. As such, this app requires a stable version of `node` to get up and running.
- Clone this repo and run `npm install`.
- To run the app, run `npm start`.
- Please reach out to the Givebutter team if you have any issues with the initial setup or have any problems when running the initial app.

## Requirements

### Search
- Typing in the search input should filter the existing Pokemon list and render only matches found
- Fix any bugs that prevent the search functionality from working correctly
- If there are no results from search, render "No Results Found"
- The search results container should be scrollable
- The UI should match the below mockup

![](mockup0.png)

### Details Card
     
- Clicking "Get Details" for any given Pokemon should render a card that has the Pokemon's `name`, `types`, `moves`, and `evolution chain`
- Use the api functions defined in `api.js` to retrieve this data. Adding new endpoints or editing existing ones are out of scope
- The details card should match the below mockup

![](mockup1.png)

## Follow-up Questions

Please take some time to answer the following questions. Your answers should go directly in this `readme`.

- Given more time, what would you suggest for improving the performance of this app?

    In its current state, the app's page load performance is fine. However, if it grows larger and more complex, some chanages could help it remain performant: 

    * We could paginite the initial request for the Pokemon list so that initially fetch only the item that are visible before scrolling. Then we could request the rest of the list without blocking the initial rendering. (This could have an impact on search functionality that would need handling.)
    * Assuming that that design for the list items becomes more complex, we could use a virtual list to delay rendering Pokemon further down on the list until the user starts to scroll. 
    * To improve the loading of the details section, it might make sense to combine the two network requests -- to get the species and the evolution chain -- into a single request. 
    * We could also consider server-rendering the app with the initial Pokemon list embedded into the HTML. This could improve the intial page load time and would also enhance SEO.

- Is there anything you would consider doing if we were to go live with this app?

    I would further break the App component into smaller components. Specifially, I would extract the Details view into its own component. Breaking the app into smaller components makes the app more modular and easier to maintain. It would also make the app more performant: we wouldn't have load all the components at once. The Details component would be a good candidate for lazy loading since it's not needed until the user takes action.

   Breaking the App into separate components would also make it easier to test! Before going live with the app, I would add component-level tests to ensure that the components behave as intended. This would prevent us from breaking the components when we make changes later on. 




- What was the most challenging aspect of this work for you (if at all)?

    The most challenging part was understanding how to find the right evolution information in the Pokedex API. I didn't realize initially that I needed to fetch the species information to find the evolution chain id to use for the evolution chain request. Instead, I was passing in the Pokemon id, but I could tell, even with my scant knowledge of Pokemon, the results didn't make sense.
