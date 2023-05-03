import { pool } from '../db.js'

export const getTasks = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM task ORDER BY createAt ASC');
    //console.log(result);
    res.json(result);
};

export const getTask = async (req, res) => {
    //console.log(req.params.id)
    const [result] = await pool.query('SELECT * FROM task WHERE id = ?', [req.params.id]);
    //res.send('Recibido')
    
    if(result.length === 0){
        return res.status(404).json({message: "Task not found"});
    }
    res.json(result[0]);
}

export const createTasks = async (req, res) => {
    const { title, description } = req.body;
    const [result] = await pool.query('INSERT INTO task(title, description) VALUES (?, ?)',
        [
            title,
            description
        ]);

    console.log(result);

    res.json({
        id: result.insertId,
        title,
        description,
    });
}

export const updateTasks = (req, res) => {
    res.send('actualizando tareas')
}

export const deleteTasks = async (req, res) => {
    //console.log(req.params.id)
    //res.json('received')

    const [result] = await pool.query('DELETE FROM task WHERE id = ?', [req.params.id]);

    
    if(result.affectedRows === 0){
        return res.status(404).json({message: "Task not found"});
    }


    return res.sendStatus(204)

}