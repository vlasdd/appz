import User from '../models/user.js';
import Task from '../models/task.js';

async function addSampleData() {
  try {
    const [user, userCreated] = await User.findOrCreate({
      where: { email: 'test@example.com' },
      defaults: {
        password: 'password123',
        first_name: 'John',
        last_name: 'Doe',
        image_url: 'https://static.vecteezy.com/system/resources/previews/030/750/807/non_2x/user-icon-in-trendy-outline-style-isolated-on-white-background-user-silhouette-symbol-for-your-website-design-logo-app-ui-illustration-eps10-free-vector.jpg'
      },
    });

    if (userCreated) {
      console.log('New user created:', user.email);
    } else {
      console.log('User already exists:', user.email);
    }

    const tasks = [
      {
        task_id: '#20462',
        user_id: user.user_id,
        course: 'Course1',
        title: 'Build an application',
        date_started: new Date('2022-05-13'),
        score: '6/10',
        details: 'This task contains... ',
        status: 'completed',
        image_url: 'https://instructor-academy.onlinecoursehost.com/content/images/size/w2000/2023/05/How-to-Create-an-Online-Course-For-Free--Complete-Guide--6.jpg',
        answer: 'Lorem ipsum dolor sit amet...',
      },
      {
        task_id: '#20463',
        user_id: user.user_id,
        course: 'Course2',
        title: 'Create a website',
        date_started: new Date('2022-05-14'),
        score: '7/10',
        details: 'This task involves creating a responsive website.',
        status: 'in_progress',
        image_url: 'https://instructor-academy.onlinecoursehost.com/content/images/size/w2000/2023/05/How-to-Create-an-Online-Course-For-Free--Complete-Guide--6.jpg',
        answer: 'Proin euismod imperdiet velit...',
      },
      {
        task_id: '#20464',
        user_id: user.user_id,
        course: 'Course3',
        title: 'Write a blog post',
        date_started: new Date('2022-05-15'),
        score: '8/10',
        details: 'This task requires writing a technical blog post.',
        status: 'completed',
        image_url: 'https://instructor-academy.onlinecoursehost.com/content/images/size/w2000/2023/05/How-to-Create-an-Online-Course-For-Free--Complete-Guide--6.jpg',
        answer: 'Curabitur non nulla sit amet...',
      },
      {
        task_id: '#20465',
        user_id: user.user_id,
        course: 'Course4',
        title: 'Develop a REST API',
        date_started: new Date('2022-05-16'),
        score: '9/10',
        details: 'This task involves building a RESTful API.',
        status: 'completed',
        image_url: 'https://instructor-academy.onlinecoursehost.com/content/images/size/w2000/2023/05/How-to-Create-an-Online-Course-For-Free--Complete-Guide--6.jpg',
        answer: 'Aenean lacinia bibendum nulla...',
      },
      {
        task_id: '#20466',
        user_id: user.user_id,
        course: 'Course5',
        title: 'Design a database schema',
        date_started: new Date('2022-05-17'),
        score: '5/10',
        details: 'This task is about database design.',
        status: 'rejected',
        image_url: 'https://instructor-academy.onlinecoursehost.com/content/images/size/w2000/2023/05/How-to-Create-an-Online-Course-For-Free--Complete-Guide--6.jpg',
        answer: 'Lorem ipsum dolor sit amet...',
      },
      {
        task_id: '#20467',
        user_id: user.user_id,
        course: 'Course6',
        title: 'Optimize an algorithm',
        date_started: new Date('2022-05-18'),
        score: '8/10',
        details: 'This task focuses on algorithm optimization.',
        status: 'completed',
        image_url: 'https://instructor-academy.onlinecoursehost.com/content/images/size/w2000/2023/05/How-to-Create-an-Online-Course-For-Free--Complete-Guide--6.jpg',
        answer: 'Integer nec odio. Praesent libero...',
      },
      {
        task_id: '#20468',
        user_id: user.user_id,
        course: 'Course7',
        title: 'Fix bugs in the codebase',
        date_started: new Date('2022-05-19'),
        score: '6/10',
        details: 'This task involves debugging a large codebase.',
        status: 'in_progress',
        image_url: 'https://instructor-academy.onlinecoursehost.com/content/images/size/w2000/2023/05/How-to-Create-an-Online-Course-For-Free--Complete-Guide--6.jpg',
        answer: 'Sed cursus ante dapibus diam...',
      },
      {
        task_id: '#20469',
        user_id: user.user_id,
        course: 'Course8',
        title: 'Prepare a presentation',
        date_started: new Date('2022-05-20'),
        score: '7/10',
        details: 'This task is about creating a presentation.',
        status: 'completed',
        image_url: 'https://instructor-academy.onlinecoursehost.com/content/images/size/w2000/2023/05/How-to-Create-an-Online-Course-For-Free--Complete-Guide--6.jpg',
        answer: 'Nulla quis sem at nibh elementum...',
      },
      {
        task_id: '#20470',
        user_id: user.user_id,
        course: 'Course9',
        title: 'Test a web application',
        date_started: new Date('2022-05-21'),
        score: '9/10',
        details: 'This task involves testing a web app.',
        status: 'rejected',
        image_url: 'https://instructor-academy.onlinecoursehost.com/content/images/size/w2000/2023/05/How-to-Create-an-Online-Course-For-Free--Complete-Guide--6.jpg',
        answer: 'Duis sagittis ipsum. Praesent mauris...',
      },
      {
        task_id: '#20471',
        user_id: user.user_id,
        course: 'Course10',
        title: 'Document project requirements',
        date_started: new Date('2022-05-22'),
        score: '10/10',
        details: 'This task focuses on documentation.',
        status: 'completed',
        image_url: 'https://instructor-academy.onlinecoursehost.com/content/images/size/w2000/2023/05/How-to-Create-an-Online-Course-For-Free--Complete-Guide--6.jpg',
        answer: 'Fusce nec tellus sed augue semper...',
      },
    ];

    // Додавання завдань
    for (const taskData of tasks) {
      const [task, taskCreated] = await Task.findOrCreate({
        where: { task_id: taskData.task_id },
        defaults: taskData,
      });

      if (taskCreated) {
        console.log('New task created:', task.task_id);
      } else {
        console.log('Task already exists:', task.task_id);
      }
    }

    console.log('Sample data added successfully.');
  } catch (error) {
    console.error('Error adding sample data:', error);
  }
}

export default addSampleData;
