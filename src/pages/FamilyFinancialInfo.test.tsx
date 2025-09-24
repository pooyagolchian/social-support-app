import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { store } from '../store/store';
import FamilyFinancialInfo from './FamilyFinancialInfo';

const theme = createTheme();

const FamilyFinancialInfoWrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

const mockNavigate = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => selector({
    familyFinancial: {
      maritalStatus: '',
      dependents: '',
      employmentStatus: '',
      monthlyIncome: '',
      housingStatus: '',
    }
  }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: { [key: string]: string } = {
        'step2': 'Family & Financial Information',
        'next': 'Next',
        'back': 'Back',
        'maritalStatus': 'Marital Status',
        'single': 'Single',
        'married': 'Married',
        'divorced': 'Divorced',
        'widowed': 'Widowed',
        'dependents': 'Number of Dependents',
        'employmentStatus': 'Employment Status',
        'employed': 'Employed',
        'unemployed': 'Unemployed',
        'selfEmployed': 'Self-Employed',
        'retired': 'Retired',
        'student': 'Student',
        'monthlyIncome': 'Monthly Income',
        'housingStatus': 'Housing Status',
        'owned': 'Owned',
        'rented': 'Rented',
        'shared': 'Shared',
        'homeless': 'Homeless',
        'maritalStatusRequired': 'Marital status is required',
        'dependentsRequired': 'Number of dependents is required',
        'employmentStatusRequired': 'Employment status is required',
        'monthlyIncomeRequired': 'Monthly income is required',
        'housingStatusRequired': 'Housing status is required',
      };
      return translations[key] || key;
    },
    i18n: {
      language: 'en',
      changeLanguage: jest.fn(),
    },
  }),
}));

jest.mock('@/lib/validationWithI18n', () => ({
  getFamilyFinancialSchema: (t: any) => {
    const { z } = require('zod');
    return z.object({
      maritalStatus: z.string().min(1, t('maritalStatusRequired')),
      dependents: z.coerce.number().min(0, t('dependentsRequired')),
      employmentStatus: z.string().min(1, t('employmentStatusRequired')),
      monthlyIncome: z.coerce.number().min(0, t('monthlyIncomeRequired')),
      housingStatus: z.string().min(1, t('housingStatusRequired')),
    });
  },
}));

describe('FamilyFinancialInfo', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockDispatch.mockClear();
  });

  it('renders all form fields', () => {
    render(
      <FamilyFinancialInfoWrapper>
        <FamilyFinancialInfo />
      </FamilyFinancialInfoWrapper>
    );

    expect(screen.getByLabelText('Marital Status')).toBeInTheDocument();
    expect(screen.getByLabelText('Number of Dependents')).toBeInTheDocument();
    expect(screen.getByLabelText('Employment Status')).toBeInTheDocument();
    expect(screen.getByLabelText('Monthly Income')).toBeInTheDocument();
    expect(screen.getByLabelText('Housing Status')).toBeInTheDocument();
  });

  it('renders step title', () => {
    render(
      <FamilyFinancialInfoWrapper>
        <FamilyFinancialInfo />
      </FamilyFinancialInfoWrapper>
    );

    expect(screen.getByText('Family & Financial Information')).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    render(
      <FamilyFinancialInfoWrapper>
        <FamilyFinancialInfo />
      </FamilyFinancialInfoWrapper>
    );

    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
  });

  it('navigates back when Back button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <FamilyFinancialInfoWrapper>
        <FamilyFinancialInfo />
      </FamilyFinancialInfoWrapper>
    );

    const backButton = screen.getByRole('button', { name: 'Back' });
    await user.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith('/step1');
  });

  it('allows user to select marital status', async () => {
    const user = userEvent.setup();

    render(
      <FamilyFinancialInfoWrapper>
        <FamilyFinancialInfo />
      </FamilyFinancialInfoWrapper>
    );

    const maritalStatusSelect = screen.getByLabelText('Marital Status');
    await user.click(maritalStatusSelect);

    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Single' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Married' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Divorced' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Widowed' })).toBeInTheDocument();
    });

    await user.click(screen.getByRole('option', { name: 'Married' }));

    expect(maritalStatusSelect).toHaveTextContent('Married');
  });

  it('allows user to select employment status', async () => {
    const user = userEvent.setup();

    render(
      <FamilyFinancialInfoWrapper>
        <FamilyFinancialInfo />
      </FamilyFinancialInfoWrapper>
    );

    const employmentStatusSelect = screen.getByLabelText('Employment Status');
    await user.click(employmentStatusSelect);

    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Employed' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Unemployed' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Self-Employed' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Retired' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Student' })).toBeInTheDocument();
    });

    await user.click(screen.getByRole('option', { name: 'Employed' }));

    expect(employmentStatusSelect).toHaveTextContent('Employed');
  });

  it('allows user to select housing status', async () => {
    const user = userEvent.setup();

    render(
      <FamilyFinancialInfoWrapper>
        <FamilyFinancialInfo />
      </FamilyFinancialInfoWrapper>
    );

    const housingStatusSelect = screen.getByLabelText('Housing Status');
    await user.click(housingStatusSelect);

    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Owned' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Rented' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Shared' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Homeless' })).toBeInTheDocument();
    });

    await user.click(screen.getByRole('option', { name: 'Rented' }));

    expect(housingStatusSelect).toHaveTextContent('Rented');
  });

  it('allows user to enter numeric values', async () => {
    const user = userEvent.setup();

    render(
      <FamilyFinancialInfoWrapper>
        <FamilyFinancialInfo />
      </FamilyFinancialInfoWrapper>
    );

    const dependentsInput = screen.getByLabelText('Number of Dependents');
    await user.type(dependentsInput, '3');
    expect(dependentsInput).toHaveValue(3);

    const incomeInput = screen.getByLabelText('Monthly Income');
    await user.type(incomeInput, '5000');
    expect(incomeInput).toHaveValue(5000);
  });

  it('submits form with valid data and navigates to step3', async () => {
    const user = userEvent.setup();

    render(
      <FamilyFinancialInfoWrapper>
        <FamilyFinancialInfo />
      </FamilyFinancialInfoWrapper>
    );

    const maritalStatusSelect = screen.getByLabelText('Marital Status');
    await user.click(maritalStatusSelect);
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Single' })).toBeInTheDocument();
    });
    await user.click(screen.getByRole('option', { name: 'Single' }));

    await user.type(screen.getByLabelText('Number of Dependents'), '2');

    const employmentStatusSelect = screen.getByLabelText('Employment Status');
    await user.click(employmentStatusSelect);
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Employed' })).toBeInTheDocument();
    });
    await user.click(screen.getByRole('option', { name: 'Employed' }));

    await user.type(screen.getByLabelText('Monthly Income'), '3500');

    const housingStatusSelect = screen.getByLabelText('Housing Status');
    await user.click(housingStatusSelect);
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Rented' })).toBeInTheDocument();
    });
    await user.click(screen.getByRole('option', { name: 'Rented' }));

    const nextButton = screen.getByRole('button', { name: 'Next' });
    await user.click(nextButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/step3');
    });
  });

  it('displays validation errors for empty required fields', async () => {
    const user = userEvent.setup();

    render(
      <FamilyFinancialInfoWrapper>
        <FamilyFinancialInfo />
      </FamilyFinancialInfoWrapper>
    );

    const nextButton = screen.getByRole('button', { name: 'Next' });
    await user.click(nextButton);

    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  it('loads initial values from Redux store', () => {
    const mockUseSelector = jest.fn((selector) => selector({
      familyFinancial: {
        maritalStatus: 'married',
        dependents: '3',
        employmentStatus: 'employed',
        monthlyIncome: '4500',
        housingStatus: 'owned',
      }
    }));

    jest.spyOn(require('react-redux'), 'useSelector').mockImplementation(mockUseSelector);

    render(
      <FamilyFinancialInfoWrapper>
        <FamilyFinancialInfo />
      </FamilyFinancialInfoWrapper>
    );

    expect(screen.getByLabelText('Marital Status')).toHaveTextContent('Married');
    expect(screen.getByLabelText('Number of Dependents')).toHaveValue(3);
    expect(screen.getByLabelText('Employment Status')).toHaveTextContent('Employed');
    expect(screen.getByLabelText('Monthly Income')).toHaveValue(4500);
    expect(screen.getByLabelText('Housing Status')).toHaveTextContent('Owned');
  });
});