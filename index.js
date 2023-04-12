const Joi = require('joi');
const express = require('express');
const axios = require('axios')
const app = express()

app.use(express.json());

const courses = [
    {id: 1, name:"Course 1"},
    {id: 2, name:"Course 2"},
    {id: 3, name:"Course 3"}
];

// Axios GET Request
app.get('/api/data', (req, res) => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
        res.send(response.data);
    })
    .catch(error => {
        console.log(error);
    });
  });

// Axios POST request
app.post('/api/data', (req, res) => {
    const data = {
        name: 'John Doe',
        job: 'Content Writer'
    };
    axios.post('https://reqres.in/api/users', data)
    .then(response => {
        res.send(response.data);
    })
    .catch(error => {
        console.log(error);
    });
});

app.get('/', (req,res) => {
   res.send("Hello World!!!"); 
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("Course ID not found");
    res.send(course);
})


app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("Course ID not found");

    const result = validateCourse(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("Course ID not found");

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema)
}


const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port", port));
