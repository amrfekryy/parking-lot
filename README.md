Hi there, this project is deployed to Vercel. Click [here](https://parking-lot-peach.vercel.app/) to view.

### How to run the project locally

- clone the repository
- `npm install`
- `npm run dev`
- visit [`http://localhost:3000`](http://localhost:3000) in your browser

### Implemented Features

In `/parking-lot` , users can determine the count of parking spots

In `/parking-lot/[spotsCount]` :

- Users can enter a vehicle’s license plate number and press Enter to automatically assign to a free parking spot in the table (indicated with green color)
- Users can enter a vehicle’s license plate number and select a specific parking spot to assign the vehicle to.
- There is full validation over the vehicle plate number and parking spot number fields.
  - Users can’t assign the same plate number twice
  - Users can’t assign new vehicles when the parking lot is full
  - Users can’t assign a new vehicle to an already occupied parking spot
  - Users can’t enter a parking spot number that is less than 1 or greater than the count of spots that they selected.
- Users will see the parking spots in a table format where the occupied spots are indicated in red and the free spots are indicated in green
- Users can filter the table by plate number
- Users can go to the next and previous pages if they added more than 10 spots
- Users can toggle the visibility of table columns
- Users can sort by any column in the table
- When the user assigns a vehicle to a spot
  - A timer will be displayed in the duration column showing how long the vehicle has been parked.
  - The actions menu will be activated where
    - Users can free the parking spot
    - Users can reset the timer
    - Users can copy the plate number
