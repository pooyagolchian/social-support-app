import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './Header';

const theme = createTheme();

const HeaderWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

describe('Header', () => {
  it('renders application title', () => {
    render(
      <HeaderWrapper>
        <Header step={1} />
      </HeaderWrapper>
    );
    
    expect(screen.getByText('Social Support Application')).toBeInTheDocument();
  });

  it('displays step indicator when step > 0', () => {
    render(
      <HeaderWrapper>
        <Header step={2} />
      </HeaderWrapper>
    );
    
    expect(screen.getByText('Step 2/3')).toBeInTheDocument();
  });

  it('does not display step indicator when step is 0', () => {
    render(
      <HeaderWrapper>
        <Header step={0} />
      </HeaderWrapper>
    );
    
    expect(screen.queryByText(/step/i)).not.toBeInTheDocument();
  });

  it('renders language selection button', () => {
    render(
      <HeaderWrapper>
        <Header step={1} />
      </HeaderWrapper>
    );
    
    const languageButton = screen.getByRole('button', { name: /english/i });
    expect(languageButton).toBeInTheDocument();
  });

  it('opens language menu when language button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <HeaderWrapper>
        <Header step={1} />
      </HeaderWrapper>
    );
    
    const languageButton = screen.getByRole('button', { name: /english/i });
    await user.click(languageButton);
    
    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
  });

  it('displays language options in menu', async () => {
    const user = userEvent.setup();
    
    render(
      <HeaderWrapper>
        <Header step={1} />
      </HeaderWrapper>
    );
    
    const languageButton = screen.getByRole('button', { name: /english/i });
    await user.click(languageButton);
    
    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: 'English' })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: 'العربية' })).toBeInTheDocument();
    });
  });

});