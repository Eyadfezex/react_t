import React, { useRef } from 'react'

const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
    const inputRef = useRef()
    return (
        <form className='addForm' onSubmit={handleSubmit} >
            <label htmlFor="addItem">Add item</label>
            <input type="text"
                autoFocus
                ref={inputRef}
                id='addItem'
                placeholder='Add item'
                required
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)} />
            <button type='submit'
                aria-label='Add item'
                onClick={() => inputRef.current.focus()}>
                Add
            </button>

        </form>
    )
}

export default AddItem
