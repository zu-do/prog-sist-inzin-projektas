import App from './App';

describe('testing app', () => {
  test('app exist in document', () => {
    expect(App).toBeInTheDocument;
  });
});


