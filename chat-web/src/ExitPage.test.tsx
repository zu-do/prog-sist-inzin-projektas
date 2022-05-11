import ExitPage from "./components/ExitPage";
import React from 'react';
import { findByTitle, fireEvent, render } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';

test('renders ExitPage component', async () => {
  const { findByTitle } = render(
    <Router>
      <ExitPage />
    </Router>,
  );
  const addButton = await findByTitle('backToMain');  
  fireEvent.click(addButton);
});