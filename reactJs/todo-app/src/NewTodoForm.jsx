/** @format */
import { useState } from "react";

export default function NewTodoForm({ onSubmit }) {
	const [newItem, setNewItem] = useState("");

	function handleSubmit(e) {
		e.preventDefault();

		onSubmit(newItem);
		setNewItem("");
	}

	return (
		<form onSubmit={handleSubmit} className='new-item-form'>
			<div className='form-row'>
				<label htmlFor='item'>
					<input
						value={newItem}
						onChange={(e) => setNewItem(e.target.value)}
						type='text'
						id='item'
						placeholder='Add a new task...'
					/>
				</label>
			</div>
			<button className='btn'>Add</button>
		</form>
	);
}
