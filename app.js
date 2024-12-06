const express = require('express');
const app = express();

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Datos simulados (base de datos en memoria)
let tasks = [
    { id: 1, title: "Aprender Node.js", done: false },
    { id: 2, title: "Hacer ejercicio", done: true }
];

// Ruta de inicio
app.get('/', (req, res) => {
    res.json({ message: "Bienvenido a la API de tareas" });
});

// Obtener todas las tareas
app.get('/tasks', (req, res) => {
    res.json({ tasks: tasks });
});

// Obtener una tarea por ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ error: "Tarea no encontrada" });
    }
});

// Crear una nueva tarea
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    if (title) {
        const newTask = {
            id: tasks.length + 1,
            title: title,
            done: false
        };
        tasks.push(newTask);
        res.status(201).json(newTask);
    } else {
        res.status(400).json({ error: "El campo 'title' es requerido" });
    }
});

// Actualizar una tarea
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, done } = req.body;
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        task.title = title || task.title;
        task.done = done !== undefined ? done : task.done;
        res.json(task);
    } else {
        res.status(404).json({ error: "Tarea no encontrada" });
    }
});

// Eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.json({ message: "Tarea eliminada" });
    } else {
        res.status(404).json({ error: "Tarea no encontrada" });
    }
});

// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
