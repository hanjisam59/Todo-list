import { useState, useEffect } from 'react';
import { CheckSquare } from 'lucide-react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import FilterButtons from './components/FilterButtons';

const API_URL = 'http://localhost:8000/api/todos';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (data.success) {
        setTasks(data.data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (title) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      const data = await response.json();
      if (data.success) {
        setTasks([data.data, ...tasks]);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleComplete = async (id) => {
    const task = tasks.find(t => t._id === id);
    if (!task) return;
    
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !task.completed }),
      });
      const data = await response.json();
      if (data.success) {
        setTasks(
          tasks.map((task) =>
            task._id === id ? { ...task, completed: !task.completed } : task
          )
        );
      }
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        setTasks(tasks.filter((task) => task._id !== id));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const editTask = async (id, newTitle) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle }),
      });
      const data = await response.json();
      if (data.success) {
        setTasks(
          tasks.map((task) =>
            task._id === id ? { ...task, title: newTitle } : task
          )
        );
      }
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.completed);
      case 'pending':
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();
  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <CheckSquare size={40} className="text-blue-500" />
            <h1 className="text-4xl font-bold text-gray-800">My Tasks</h1>
          </div>
          <p className="text-gray-600">Stay organized and productive</p>
          {totalCount > 0 && (
            <div className="mt-3 text-sm text-gray-500">
              {completedCount} of {totalCount} tasks completed
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <TodoInput onAddTask={addTask} />
          <FilterButtons currentFilter={filter} onFilterChange={setFilter} />
          <TodoList
            tasks={filteredTasks}
            loading={loading}
            onToggleComplete={toggleComplete}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        </div>

        <div className="text-center mt-6 text-sm text-gray-500">
          Made with React and Tailwind CSS
        </div>
      </div>
    </div>
  );
}

export default App;
