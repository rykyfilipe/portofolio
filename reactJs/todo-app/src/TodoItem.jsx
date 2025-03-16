/** @format */

export function TodoItem({ completed, id, title, toggleTodo, deleteTodo }) {
	return (
		<li key={id}>
			<label>
				<input
					type='checkbox'
					checked={completed}
					onChange={(e) => toggleTodo(id, e.target.checked)}
				/>
				<span className={completed ? "completed" : ""}>{title}</span>
			</label>

			<button className='btn-delete' onClick={() => deleteTodo(id)}>
				Delete
			</button>
		</li>
	);
}
