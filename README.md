# To-Do List App

## Database Setup

1. Install PostgreSQL and create a new database:
    ```sh
    sudo apt-get install postgresql postgresql-contrib
    sudo -u postgres createdb todo_db
    ```

2. Create a [.env] file in the backend directory with the following content:
    ```plaintext
    DATABASE_URL=postgresql://YourUsername:YourPassword@localhost:5432/todo_db
    SECRET_KEY=your_secret_key
    ```

3. Apply database migrations using Alembic:
    ```sh
    cd backend
    alembic upgrade head
    ```

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/todo-list-app.git
    cd todo-list-app
    ```

2. Create and activate a virtual environment:
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the backend package:
    ```sh
    cd backend
    pip install .
    ```

## Running the Application

1. Start the backend server:
    ```sh
    cd backend
    uvicorn main:app --reload
    ```

2. Open the [index.html] file in your web browser.
