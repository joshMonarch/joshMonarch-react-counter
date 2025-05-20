import React, { useState, useEffect } from "react";

// 🧠 Componente principal que maneja la lógica de la ToDo List conectada a una API RESTful
const Home = () => {
  const [task, setTask] = useState(""); // Estado para el texto del input
  const [listaDeTareas, setListaDeTareas] = useState([]); // Estado para la lista de tareas

  // 🟢 Al montar el componente, cargamos las tareas del usuario si existen
  useEffect(() => {
    fetch("https://playground.4geeks.com/todo/users/sebas_m")
      .then(resp => {
        if (!resp.ok) return { todos: [] }; // Si no existe el usuario, devolvemos una lista vacía
        return resp.json();
      })
      .then(data => {
        setListaDeTareas(data.todos); // Guardamos las tareas en el estado local
      })
      .catch(error => {
        console.error("Error al cargar tareas:", error);
      });
  }, []);

  // 👤 Crea el usuario en el servidor si fue eliminado
  const handleCrearUsuario = () => {
    fetch("https://playground.4geeks.com/todo/users/sebas_m", {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        if (!resp.ok) throw new Error("No se pudo crear el usuario");
        return resp.json();
      })
      .then(() => fetch("https://playground.4geeks.com/todo/users/sebas_m")) // Volvemos a cargar las tareas vacías
      .then(resp => resp.ok ? resp.json() : { todos: [] })
      .then(data => setListaDeTareas(data.todos)) // Actualizamos el estado
      .catch(error => console.error("Error creando usuario:", error));
  };

  const handleInputChange = (e) => {
    setTask(e.target.value); // Actualizamos el estado del input mientras el usuario escribe
  };

  // ⌨️ Cuando el usuario presiona Enter, agregamos la nueva tarea al servidor
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && task.trim() !== "") {
      const nuevaTarea = {
        label: task.trim(),
        is_done: false
      };

      fetch("https://playground.4geeks.com/todo/todos/sebas_m", {
        method: "POST",
        body: JSON.stringify(nuevaTarea),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => resp.json())
        .then(() => fetch("https://playground.4geeks.com/todo/users/sebas_m")) // Volvemos a pedir la lista actualizada
        .then(resp => resp.ok ? resp.json() : { todos: [] })
        .then(data => {
          setListaDeTareas(data.todos); // Actualizamos el estado con la nueva lista
          setTask(""); // Limpiamos el input
        })
        .catch(error => console.error("Error al agregar tarea:", error));
    }
  };

  // 🗑️ Elimina una sola tarea por su ID
  const handleDelete = (id) => {
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE"
    })
      .then(resp => {
        if (!resp.ok) throw new Error("No se pudo eliminar la tarea");
        return fetch("https://playground.4geeks.com/todo/users/sebas_m");
      })
      .then(resp => resp.ok ? resp.json() : { todos: [] })
      .then(data => setListaDeTareas(data.todos)) // Actualizamos la lista tras borrar
      .catch(error => console.error("Error al eliminar tarea:", error));
  };

  // 🧹 Borra todas las tareas del usuario y su cuenta
  const handleClearAll = () => {
    fetch("https://playground.4geeks.com/todo/users/sebas_m", {
      method: "DELETE"
    })
      .then(resp => {
        if (!resp.ok) throw new Error("No se pudo borrar todo");
        return fetch("https://playground.4geeks.com/todo/users/sebas_m");
      })
      .then(resp => resp.ok ? resp.json() : { todos: [] })
      .then(data => setListaDeTareas(data.todos)) // Lista vacía tras borrado total
      .catch(error => console.error("Error al borrar todas las tareas:", error));
  };

  // 🧱 Renderizado visual del componente
  return (
    <div className="container text-center">
      <h1 className="display-1 text-muted my-4">ToDoList</h1>

      <div className="text-center mb-3">
        <button className="btn btn-outline-primary btn-sm" onClick={handleCrearUsuario}>Crear usuario 👤</button>
      </div>

      <div className="card shadow mx-auto p-4" style={{ maxWidth: "500px" }}>
        <input
          type="text"
          className="form-control border-0 shadow-none"
          placeholder="¿Qué se necesita hacer?"
          value={task}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Presionar Enter para agregar
        />

        <ul className="list-group list-group-flush mt-3">
          {Array.isArray(listaDeTareas) &&
            listaDeTareas.map((tarea) => (
              <li
                key={tarea.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {tarea.label}
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(tarea.id)} // Borra esta tarea
                >
                  🗑️
                </button>
              </li>
            ))}
        </ul>

        {Array.isArray(listaDeTareas) && (
          <div className="text-start text-muted mt-3">
            {listaDeTareas.length} tarea{listaDeTareas.length !== 1 ? "s" : ""} // Contador de tareas
          </div>
        )}

        <div className="text-end mt-3">
          <button className="btn btn-danger btn-sm" onClick={handleClearAll}>Borrar todas 🧹</button>
        </div>
      </div>
    </div>
  );
};

export default Home; // Exportamos el componente principal
