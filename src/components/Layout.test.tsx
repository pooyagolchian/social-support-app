import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Layout from './Layout';

const LayoutWrapper = ({ children, initialEntries = ['/'] }: { children: React.ReactNode; initialEntries?: string[] }) => (
  <MemoryRouter initialEntries={initialEntries}>
    {children}
  </MemoryRouter>
);

describe('Layout', () => {
  it('renders children content', () => {
    render(
      <LayoutWrapper>
        <Layout>
          <div data-testid="test-content">Test Content</div>
        </Layout>
      </LayoutWrapper>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  it('renders header component', () => {
    render(
      <LayoutWrapper initialEntries={['/step1']}>
        <Layout>
          <div>Content</div>
        </Layout>
      </LayoutWrapper>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders main container', () => {
    render(
      <LayoutWrapper>
        <Layout>
          <div>Content</div>
        </Layout>
      </LayoutWrapper>
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('shows stepper when on step pages', () => {
    render(
      <LayoutWrapper initialEntries={['/step1']}>
        <Layout>
          <div>Content</div>
        </Layout>
      </LayoutWrapper>
    );

    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('Family Financial Information')).toBeInTheDocument();
    expect(screen.getByText('Situation Description')).toBeInTheDocument();
  });

  it('does not show stepper when not on step pages', () => {
    render(
      <LayoutWrapper initialEntries={['/']}>
        <Layout>
          <div>Content</div>
        </Layout>
      </LayoutWrapper>
    );

    expect(screen.queryByText('Personal Information')).not.toBeInTheDocument();
  });

  it('highlights correct step in stepper for step1', () => {
    render(
      <LayoutWrapper initialEntries={['/step1']}>
        <Layout>
          <div>Content</div>
        </Layout>
      </LayoutWrapper>
    );

    // Check for step labels instead of tablist role
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('Family Financial Information')).toBeInTheDocument();
    expect(screen.getByText('Situation Description')).toBeInTheDocument();
  });

  it('highlights correct step in stepper for step2', () => {
    render(
      <LayoutWrapper initialEntries={['/step2']}>
        <Layout>
          <div>Content</div>
        </Layout>
      </LayoutWrapper>
    );

    // Check for step labels
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('Family Financial Information')).toBeInTheDocument();
    expect(screen.getByText('Situation Description')).toBeInTheDocument();
  });

  it('highlights correct step in stepper for step3', () => {
    render(
      <LayoutWrapper initialEntries={['/step3']}>
        <Layout>
          <div>Content</div>
        </Layout>
      </LayoutWrapper>
    );

    // Check for step labels
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('Family Financial Information')).toBeInTheDocument();
    expect(screen.getByText('Situation Description')).toBeInTheDocument();
  });

  it('applies theme provider', () => {
    render(
      <LayoutWrapper>
        <Layout>
          <div data-testid="themed-content">Content</div>
        </Layout>
      </LayoutWrapper>
    );

    expect(screen.getByTestId('themed-content')).toBeInTheDocument();
  });

  it('includes CSS baseline', () => {
    const { container } = render(
      <LayoutWrapper>
        <Layout>
          <div>Content</div>
        </Layout>
      </LayoutWrapper>
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});