import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import App from './App';

const AppWrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </Provider>
);

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <AppWrapper>
        <App />
      </AppWrapper>
    );
  });

  it('renders the header component', () => {
    render(
      <AppWrapper>
        <App />
      </AppWrapper>
    );
    
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders the layout with main content', () => {
    render(
      <AppWrapper>
        <App />
      </AppWrapper>
    );
    
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});