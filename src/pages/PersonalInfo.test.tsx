import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { store } from '../store/store';
import PersonalInfo from './PersonalInfo';

const theme = createTheme();

const PersonalInfoWrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      switch (key) {
        case 'step1':
          return 'Personal Information';
        case 'next':
          return 'Next';
        case 'name':
          return 'Name';
        case 'nationalId':
          return 'National ID';
        case 'dateOfBirth':
          return 'Date of Birth';
        case 'gender':
          return 'Gender';
        case 'male':
          return 'Male';
        case 'address':
          return 'Address';
        case 'city':
          return 'City';
        case 'state':
          return 'State';
        case 'country':
          return 'Country';
        case 'phone':
          return 'Phone';
        case 'email':
          return 'Email';
        default:
          return key;
      }
    },
    i18n: {
      language: 'en',
      changeLanguage: jest.fn(),
    },
  }),
}));

describe('PersonalInfo', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders all form fields', () => {
    render(
      <PersonalInfoWrapper>
        <PersonalInfo />
      </PersonalInfoWrapper>
    );

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('National ID')).toBeInTheDocument();
    expect(screen.getByLabelText('Date of Birth')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toBeInTheDocument();
    expect(screen.getByLabelText('Address')).toBeInTheDocument();
    expect(screen.getByLabelText('City')).toBeInTheDocument();
    expect(screen.getByLabelText('State')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders step title', () => {
    render(
      <PersonalInfoWrapper>
        <PersonalInfo />
      </PersonalInfoWrapper>
    );

    expect(screen.getByText('Personal Information')).toBeInTheDocument();
  });

  it('renders next button', () => {
    render(
      <PersonalInfoWrapper>
        <PersonalInfo />
      </PersonalInfoWrapper>
    );

    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });

  it('allows user to fill out the form', async () => {
    const user = userEvent.setup();
    
    render(
      <PersonalInfoWrapper>
        <PersonalInfo />
      </PersonalInfoWrapper>
    );

    const nameInput = screen.getByLabelText('Name');
    await user.type(nameInput, 'John Doe');
    expect(nameInput).toHaveValue('John Doe');

    const emailInput = screen.getByLabelText('Email');
    await user.type(emailInput, 'john@example.com');
    expect(emailInput).toHaveValue('john@example.com');

    const phoneInput = screen.getByLabelText('Phone');
    await user.type(phoneInput, '+1234567890');
    expect(phoneInput).toHaveValue('+1234567890');
  });

  it('allows user to select gender', async () => {
    const user = userEvent.setup();
    
    render(
      <PersonalInfoWrapper>
        <PersonalInfo />
      </PersonalInfoWrapper>
    );

    const genderSelect = screen.getByLabelText('Gender');
    await user.click(genderSelect);
    
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Male' })).toBeInTheDocument();
    });

    await user.click(screen.getByRole('option', { name: 'Male' }));
    
    expect(genderSelect).toHaveTextContent('Male');
  });

  it('navigates to step2 when form is submitted with valid data', async () => {
    const user = userEvent.setup();
    
    render(
      <PersonalInfoWrapper>
        <PersonalInfo />
      </PersonalInfoWrapper>
    );

    await user.type(screen.getByLabelText('Name'), 'John Doe');
    await user.type(screen.getByLabelText('National ID'), '123456789');
    await user.type(screen.getByLabelText('Date of Birth'), '1990-01-01');
    
    const genderSelect = screen.getByLabelText('Gender');
    await user.click(genderSelect);
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Male' })).toBeInTheDocument();
    });
    await user.click(screen.getByRole('option', { name: 'Male' }));

    await user.type(screen.getByLabelText('Address'), '123 Main St');
    await user.type(screen.getByLabelText('City'), 'Anytown');
    await user.type(screen.getByLabelText('State'), 'State');
    await user.type(screen.getByLabelText('Country'), 'Country');
    await user.type(screen.getByLabelText('Phone'), '+1234567890');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');

    const nextButton = screen.getByRole('button', { name: 'Next' });
    await user.click(nextButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/step2');
    });
  });

});