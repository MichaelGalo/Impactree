# Impactree

## Overview
Impactree is a charity app that turns your generosity into a thriving virtual forest. Track your donations to selected causes, see the real-world impact of your giving, and watch as your contributions grow from a tiny seed into a mighty redwood -- or a whole forest. Set giving goals based on your income, visualize your long-term impact, and challenge yourself to create an entire forest of change. Impactree makes philanthropy engaging and clear, helping you see how even small donations can make a big difference over time.

## Learning Goals
1. Gain experience with TypeScript and the Next.js environment
2. Learn to build responsive and attractive UIs with Tailwind CSS & Flowbite
3. Understand the basics of server-side rendering with Next.js
4. Practice creating and consuming RESTful APIs with Django REST Framework running behind the scenes
5. Implement user authentication and authorization
6. Practice efficiency of code principles through reusable React components
7. Implement a gamification system
8. Implement basic admin functionality
9. Gain experience in full-stack development

## Features
- Charity discovery and categorization
- Impact visualization
- Impact Tree growth gamification

## Technology Used
- Next.js
- TypeScript
- Tailwind CSS
- Flowbite

## Installation

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)

### Steps
1. Clone the repository
    ```sh
   git clone https://github.com/your-username/impactree.git
   cd impactree/client

2. Install dependencies
    ```sh
   npm install

3. Start the development server
    ```sh
   npm run dev

4. Open http://localhost:3000 in your browser to see the application.

**Note**: This setup assumes the backend API is running at http://localhost:8000. Make sure your backend server is running before interacting with the app.

# User Stories & Criteria

<details>

<summary>Minimum Viable Product</summary>

## Account Management

### User Registration
**As a new user, I should be able to create an account**
- Given the user wants to access any part of the application other than the home page 
- When the user fills out the registration form and submits it 
- Then a new account is created and the user is logged in 

### User Login
**As a registered user, I should be able to log in to the application**
- Given the user wants to access any part of the application other than the home page
- When the user enters their credentials at the log-in view and clicks the submit button
- Then the user is authenticated and directed back to the home page

## Charity Exploration

### View Charity List
**As a user, I should be able to view a list of charities**
- Given the user wants to see options of organizations to donate to
- When the user navigates to the explore view in the navbar
- Then a list of charity cards are displayed with titles that link to further details

### View Charity Details
**As a user, I should be able to see charity details**
- Given the user wants to learn more about a charity 
- When the user clicks on a charity card title from the explore page
- Then they are redirected to the corresponding charity's details page 

## Impact Tracking

### View Impact Dashboard
**As a user, I should be able to view a dashboard of my total impact**
- Given the user wants to see the difference they're making 
- When the user navigates to their impact dashboard 
- Then a summary of their total impact across all chosen charities is displayed or placeholder views of where they would be if the user creates an impact plan

### Create Impact Plan
**As a user, I should be able to create an impact plan**
- Given the user wants to start tracking their charitable giving 
- When the user navigates to impact settings in the impact plan view, and enters their annual income and desired philanthropy percentage 
- Then a new impact plan is created and displayed, showing the total annual allocation 

### View Impact Plan
**As a user, I should be able to view my current impact plan**
- Given the user wants to understand their giving strategy & projected impact
- When the user navigates to their impact plan page 
- Then the plan details are displayed, including selected charities and allocation amounts 

### Edit Impact Plan
**As a user, I should be able to edit my impact plan**
- Given the user wants to adjust their giving as circumstances change 
- When the user modifies their income, philanthropy percentage, or charity allocations 
- Then the impact plan is updated and the changes are reflected in the UI 

### Delete Impact Plan
**As a user, I should be able to delete my impact plan**
- Given the user no longer wishes to use the application 
- When the user selects the option to delete their impact plan 
- Then the plan is removed from the database and the user is redirected back to the dashboard showing their absence of active plan

### Allocate Charitable Amount
**As a user, I should be able to allocate my total annual charitable amount**
- Given the user wants to segment their giving 
- When the user selects charities and enters allocation amounts for each
- Then the allocations are saved and the remaining unallocated amount is updated 

### View Current Milestone
**As a user, I should be able to see my current milestone**
- Given the user wants to track their progress 
- When the user views their impact dashboard 
- Then their current milestone based on giving percentage is displayed 

</details>

<details>

<summary>Stretch Goals</summary>

## Enhanced Impact Visualization

### View Monthly/Yearly Allocation
**As a user, I should be able to view my total allocation amount in monthly & yearly amounts**
- Given the admin user wants to visualize their impact potential by year and month
- When the user clicks on the "Monthly | Yearly" button on the impact-plan page 
- Then the changes are reflected in the UI

## Advanced Charity Exploration

### Filter Charities by Cause
**As a user, I should be able filter charities in the explore page by cause**
- Given the user wants to only find charities that fall within one category
- When the user selects from a dropdown menu of charity categories
- Then the charity cards will reflect the UI

## Admin Features

### Add New Charity
**As an admin user, I should be able to add a new charity**
- Given the admin user wants to create a new charity that isn't present on the explore page
- When the admin user clicks on the "add a charity" button on the explore page and fill out the required form
- Then they are redirected to the newly created charity details page

### Edit Charity Details
**As an admin user, I should be able to edit charity details**
- Given the admin user wants to update the details of a charity organization
- When the admin user clicks on the edit button on the charity details page
- Then they are redirected to the update charity form page

### Delete Charity
**As an admin user, I should be able to delete charity**
- Given the admin user wants to remove a charity option
- When the admin user clicks on the delete button on the charity details page
- Then they are required to confirm the deletion, and redirected to the explore page


</details>

## Contributing
We welcome contributions to Impactree! Please read our [Contributing Guide](Contributing.md) for details on our code of conduct and the process for submitting pull requests.