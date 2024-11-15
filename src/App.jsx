import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import './App.css'

function App() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')

  const addItem = (e) => {
    e.preventDefault()
    if (newItem.trim() !== '') {
      setItems([...items, { text: newItem, completed: false }])
      setNewItem('')
    }
  }

  const handleDragEnd = (result) => {
    if (!result.destination) return
    
    const newItems = [...items]
    const [reorderedItem] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, reorderedItem)
    
    setItems(newItems)
  }

  return (
    <div className="app">
      <div className="shopping-list">
        <h1>Shopping List</h1>
        
        <form onSubmit={addItem}>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add an item..."
          />
          <button type="submit">Add</button>
        </form>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="shopping-list">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {items.map((item, index) => (
                  <Draggable 
                    key={index} 
                    draggableId={`item-${index}`} 
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => {
                            const newItems = [...items]
                            newItems[index].completed = !newItems[index].completed
                            setItems(newItems)
                          }}
                        />
                        <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                          {item.text}
                        </span>
                        <button onClick={() => setItems(items.filter((_, i) => i !== index))}>
                          Delete
                        </button>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}

export default App