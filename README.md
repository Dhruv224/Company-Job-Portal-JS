# Company Job Portal

This is a simple job portal website built for a company where users can browse job listings, apply for jobs, and recruiters can manage job listings and view applications.

1. [Features](#features)
    - [For Candidates](#for-candidates)
    - [For Admin](#for-admin)
2. [Data Storage](#data-storage)
    - [Arrays (Schemas) for Storing Data](#arrays-schemas-for-storing-data)
        - [Jobs schema](#jobs-schema)
        - [Users schema](#users-schema)
3. [Technologies Used](#technologies-used)

## **Features**

### For Candidates:

- View all job listings
- View applied jobs
- Apply for a particular job
- Withdraw job if already applied
- Search for jobs based on title, type, and company
- Filter jobs based on salary range and type
- Login, register, and logout functionality

### For Admin:

- Login and logout functionality
- Create new job listings
- View all job listings
- Edit job listings
- Delete job listings
- View users who applied for each job
- Create new users
- Update user's username
- Delete users
- View applicants for a particular job
- Remove users from jobs where they have applied

## Data Storage

- User and job details are stored using the local storage of the browser.

## Arrays (Schemas) for Storing Data

### Jobs schema
```json
{
  "jobs": [
    {
      "jobId": 1,
      "title": "Frontend Developer",
      "desc": "Looking for a skilled frontend developer to join our team.",
      "type": "React.js",
      "salary": 60000,
      "location": "Remote",
      "company": "Google",
      "appliedBy": [
        {
          "id": 0,
          "username": "Dhruv",
          "email": "dhruv@gmail.com",
          "pdfFile": {...}
        },
        {
          "id": 1,
          "username": "Vatsal",
          "email": "vatsal@gmail.com",
          "pdfFile": {...}
        }
      ]
    },
    {
      "jobId": 2,
      "title": "Backend Engineer",
      "desc": "Seeking an experienced backend engineer proficient in Node.js.",
      "type": "Node.js",
      "salary": 70000,
      "location": "San Francisco, CA",
      "company": "Bacancy",
      "appliedBy": [
        {
          "id": 0,
          "username": "Dhruv",
          "email": "dhruv@gmail.com",
          "pdfFile": {...}
        }
      ]
    }
  ]
```

### Users schema

```json
  "users": [
    {
      "id": 0,
      "username": "Dhruv",
      "password": "dhruv123@"
    },
    {
      "id": 1,
      "username": "Vatsal",
      "password": "vatsal123@"
    }
  ]
}
```


## Technologies Used

- HTML
- CSS
- JavaScript

