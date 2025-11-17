# AI-Powered Study Group Website

> A Bachelor's thesis project developing an innovative web app that uses LLM-powered "virtual avatars" to provide personalized learning and support for high school students.

---

## 🚀 About The Project

This repository contains a Bachelor's thesis project focused on addressing the limitations of generalized classroom learning. We've developed a web application that provides **individualized student learning** for high school students through the use of "virtual avatars" powered by Large Language Models (LLMs).

The goal is to offer a more stimulating, personalized, and effective learning experience.

### Key Objectives

* **Improve Individual Study:** Offer tools that adapt to each student's pace and style.
* **Personalize Review:** Allow students to interact with AI avatars to review specific topics.
* **Enhance Academic Success:** Aim to boost long-term information retention, improve assessment performance, and strengthen students’ confidence.

---

## 🛠️ Key Features

* **AI Virtual Avatars:** Students interact with AI-driven personas for a collaborative study experience.
* **Data-Driven Insights:** The database records all user interactions, providing essential data for training and fine-tuning machine learning models.
* **Teacher Feedback Loop:** Teachers play a crucial role as evaluators, with the ability to correct and validate the AI-generated responses. This data is then used to fine-tune the models.
* **Advanced AI:** Utilizes the **OpenAI API** to implement advanced LLM capabilities and fine-tuning.

---

## 💻 Tech Stack

* **Backend:** Laravel
* **Database:** MySQL (managed via XAMPP or similar)
* **AI:** OpenAI API

---

## ⚡ Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

* A local server environment (like **XAMPP**, MAMP, or WAMP)
* PHP & Composer
* A MySQL Database

### Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/leo54200/AI-Powered-Study-Group-Website.git](https://github.com/Leo54200/AI-Powered-Study-Group-Website.git)
    cd AI-Powered-Study-Group-Website
    ```

2.  **Install Laravel Dependencies**
    ```bash
    composer install
    ```

3.  **Set Up Your Environment**
    * Copy the `.env.example` file to a new file named `.env`.
    * Update the `.env` file with your database credentials (DB\_DATABASE, DB\_USERNAME, DB\_PASSWORD).

4.  **Set Up the Database**
    * Start your **XAMPP** server (or equivalent) and ensure MySQL is running.
    * Open your database management tool (e.g., phpMyAdmin).
    * Create a new, empty database named **`scuola`**.
    * Import the provided SQL script (find it in the repo) into the `scuola` database.

5.  **Run the Application**
    * Start the Laravel development server:
        ```bash
        php artisan serve
        ```

6.  **View the Project**
    * Open your browser and navigate to: **`http://localhost:8000`**
