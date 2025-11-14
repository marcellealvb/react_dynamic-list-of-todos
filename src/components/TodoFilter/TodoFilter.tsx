import React from 'react';

interface Props {
  query: string;
  setQuery: (value: string) => void;
  filter: 'all' | 'completed' | 'active';
  setFilter: (status: 'all' | 'completed' | 'active') => void;
  onClearQuery: () => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  filter,
  setFilter,
  onClearQuery,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={filter}
            onChange={e =>
              setFilter(e.target.value as 'all' | 'completed' | 'active')
            }
            data-cy="statusSelect"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
