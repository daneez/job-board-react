import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from './App';

test('full app rendering/navigating', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );

  expect(screen.getByText(/Job List/i)).toBeInTheDocument();

  })