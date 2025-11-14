/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos, getUser } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [userLoading, setUserLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedTodo(null);
    setUser(null);
    setUserLoading(false);
  }, []);

  const handleShowTodo = useCallback((todo: Todo): void => {
    setSelectedTodo(todo);
    setUserLoading(true);
    getUser(todo.userId)
      .then(setUser)
      .catch(() => null)
      .finally(() => setUserLoading(false));
  }, []);

  const onClearQuery = useCallback(() => {
    setQuery('');
  }, []);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();

    return todos.filter(todo => {
      const matchesQuery = q === '' || todo.title.toLowerCase().includes(q);

      const matchesStatus =
        filter === 'all' ||
        (filter === 'completed' && todo.completed) ||
        (filter === 'active' && !todo.completed);

      return matchesQuery && matchesStatus;
    });
  }, [todos, query, filter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              {loading && <Loader />}
              {!loading && shown.length > 0 && (
                <TodoList todos={shown} onShow={handleShowTodo} />
              )}
            </div>
            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                filter={filter}
                setFilter={setFilter}
                onClearQuery={onClearQuery}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        todo={selectedTodo}
        user={user}
        userLoading={userLoading}
        onClose={handleCloseModal}
      />
    </>
  );
};
