import TodoItem from './TodoItem';
import { ListTodo } from 'lucide-react';

function TodoList({ tasks, loading, onToggleComplete, onDelete, onEdit }) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-3"></div>
        <p className="text-gray-400 text-lg">Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <ListTodo size={48} className="mx-auto text-gray-300 mb-3" />
        <p className="text-gray-400 text-lg">No tasks found</p>
        <p className="text-gray-400 text-sm mt-1">Add a task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TodoItem
          key={task._id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TodoList;
