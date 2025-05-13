import React, { useState } from "react"; // Importamos React y el hook useState

const Home = () => {
	const [task, setTask] = useState(""); // Estado para el texto del input
	const [listaDeTareas, setListaDeTareas] = useState([]); // Estado para la lista de tareas

	const handleInputChange = (e) => {
		setTask(e.target.value); // Actualiza el texto del input
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && task.trim() !== "") { // Si se presiona Enter y no está vacío
			setListaDeTareas([...listaDeTareas, task]); // Agrega la tarea al array
			setTask(""); // Limpia el input
		}
	};

	const handleDelete = (index) => {
		setListaDeTareas(listaDeTareas.filter((tarea, i) => i !== index)); // Elimina la tarea seleccionada
	};

	return (
  		<div className="container text-center">
			{/* Título grande*/}
			<h1 className="display-1 text-muted my-4">ToDoList</h1>

			{/* Contenedor con tarjeta*/}
			<div className="card shadow mx-auto p-4" style={{ maxWidth: "500px" }}>
			
					{/* Input de tarea */}
					<input
						type="text"
						className="form-control border-0 shadow-none"
						placeholder="Que se necesita hacer?"
						value={task}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
					/>

					{/* Lista de tareas */}
					<ul className="list-group list-group-flush mt-3">
					{listaDeTareas.map((tarea, index) => (
					<li
						key={index}
						className="list-group-item d-flex justify-content-between align-items-center"
					>
						{tarea}
						<button
						className="btn btn-sm btn-outline-danger"
						onClick={() => handleDelete(index)}
						>
						🗑️
						</button>
					</li>
						))}
					</ul>

					{/* Contador de tareas abajo */}
					<div className="text-start text-muted mt-3">
						{listaDeTareas.length} tarea{listaDeTareas.length !== 1 ? "s" : ""}
					</div>
			</div>
  		</div>
);
};

export default Home; // Exportamos el componente

