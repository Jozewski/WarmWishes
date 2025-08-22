## Project Tracker 

## Warm Wishes: A Project Tracker for Non-Profits

Warm Wishes is a full-stack web application designed to empower non-profit organizations by streamlining project management, donation tracking, and overall operational efficiency. 


### Features

* **Project Management:**
    * Create, assign, and track projects with defined deadlines and milestones.
    * Monitor progress visually through intuitive dashboards.
    * Collaborate seamlessly with teams.

* **Donation Management:**  
    * Recieve messages and foster strong relationships with volunteers and donors. 
    * Make it Easier to gather information needed to enerate reports to analyze donation trends.

* **Simplified Workflow:**  
    * Centralize all project-related activities in one platform for improved organization and transparency.
    * Easily manage tasks and track progress towards achieving organizational goals.

## Technical Features

Warm Wishes leverages a robust tech stack to deliver a powerful and scalable project tracking solution. Here's a breakdown of the key technologies employed:

**Frontend (Client):**

* **React:** A popular JavaScript library for building dynamic and interactive user interfaces. 
* **Redux Toolkit:** Simplifies state management in React applications, ensuring data consistency and efficient updates.
* **Axios:** A versatile HTTP client library for making API requests to the backend server.
* **react-router-dom:** Enables seamless navigation between different views and pages within the application.

**Styling:**

* **Tailwind CSS:**  A utility-first CSS framework that promotes rapid development by providing pre-defined classes for styling elements. 


**Backend (Server):**

* **Node.js with Express:** A lightweight and fast JavaScript runtime environment paired with a robust web framework for building APIs.
* **Mongoose:** An Object Data Modeling (ODM) library for MongoDB, simplifying database interactions and schema definition.
* **jsonwebtoken:** A secure library for generating and verifying JSON Web Tokens (JWTs), ensuring authentication and authorization of API requests.

**Security:**

* **argon2:** A robust password hashing algorithm used to store user passwords securely, mitigating the risk of brute-force attacks.


**Database:** 

* **MongoDB:**  A NoSQL database known for its scalability, flexibility, and ability to handle large volumes of data.


### Getting Started

1. **Clone the repository:**
 ```
git@github.com:Jozewski/WarmWishes.git
 ```  

2. **Navigate to the project directory:**

     * cd project-tracker


3. **Install Dependencies:**

    * Client (React): `npm install` within the `/client` folder.
    * Server (Node.js, Express): `npm install` within the `/server` folder.
    * Testing Environment: `npm install` within the `/test` folder. 

4. **Configure Environment Variables:**

 * Create a .env file at the top level of the client folder.

  ```
  VITE_NODE_SERVER_URL=http://127.0.0.1:8000
 
   ```

  * Create a .env file at the top level of your server directory and add these variables:

   ```
   MONGODB_CONNECTION_STRING=mongodb://127.0.0.1:27017/project-tracker

   ```

   * Create a .env file at the top level of your test directory and add these variables:

   ```
   SERVER_URL=http://127.0.0.1:8000

   ```



5. **Start the Servers:**

    * From one terminal window, navigate to `/client` and run `npm run dev`. This will start the development server for the frontend application. 
    * In a separate terminal window, navigate to `/server` and run `npm run dev`. This will start your backend API server.



6. **Testing (Optional):**  In another terminal window, navigate to `/test` and run `npm test`.



### Author

Joanne Liszewski

### License

GNU GENERAL PUBLIC LICENSE





