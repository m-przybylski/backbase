# Backbase FE Test

## Project description

This is the recruitment task for Backbase - Single Page Application which allows users to make money transfer.

## Project architectural decisions

Project uses Angular framework. I have picked the framework because because this is my personal preference. Angular helped me to develop functional application within 6 hours. I used Angular CLI to create application structure and configure development environment. I believe there is no need to create custom Webpack/Parcel/Rollup configuration when there are ready to be used tools available for developers. I decided not to pick any css library because for such a small project there is no need to load additional layer of css. I also decided not to use SASS library because of time constraints. The application is written with reactive approach and is based on RxJS library which is part of Angular framework. I decided to split application is smallest possible modules. There is a lot of benefits in such approach, for example reusability. There is an abstraction layer to get data from json file used to manipulate data. The abstraction can be replaced with any data access layer which provides the same interface. Application is responsive and supports module, tablet and desktop resolutions. There are limited unit tests created. Due to time constrains I did not cover all functionality with unit tests.

## How to run the project

There is dist folder contains bundled HTML CSS ans JavaScript files. Application should be server using HTTP server or opened with `index.html`. When you decide to open `index.html` file make sure that you disable all browser security because scrips will be blocked by CORS policy on the browser level. Application can run in all of modern browsers however it was tested using Chrome and Firefox.
There is a serve:build script prepared in `package.json` file. Default configuration serves application on port 8080 on localhost.

## Missing user stories

I was not able to fully covered all user stories.
```
3. Filter the transactions list by typing a keyword in the Search field.
    - The transactions list should update immediately at every keystroke.
```
Filtering is performed with debounce time. Once user stops typing application after 200ms performs search. I strongly believe the is better user experience and preserves valuable client and server resources.
```
- The Sorting order (ascending/descending) should be persistent across all sorting options
```
I did not create provide descending ordering, and you can sort only by one column at the time.

## Additional features

There is additional toast message when user create a new transfer. To simulate en error situation system rejects transactions for amount $100.
