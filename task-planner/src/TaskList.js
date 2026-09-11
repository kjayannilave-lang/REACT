function TaskList({ tasks, message }) {
  return (
    <div className="mt-4">
      <h2>Task List</h2>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>

      <p>{message}</p>
    </div>
  );
}

export default TaskList;