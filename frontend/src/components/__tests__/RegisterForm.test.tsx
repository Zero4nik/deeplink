import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterForm from '@/app/register/page';
import { AuthProvider } from '@/context/authContext';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

vi.mock('@/lib/api', () => ({
  default: {
    post: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
    },
  },
}));

import api from '@/lib/api';

const renderRegisterForm = () => {
  return render(
    <AuthProvider>
      <RegisterForm />
    </AuthProvider>
  );
};

describe('RegisterForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('рендерит поля: имя, email и пароль', () => {
    renderRegisterForm();
    expect(screen.getByPlaceholderText(/имя/i)).toBeDefined();
    expect(screen.getByPlaceholderText('Email')).toBeDefined();
    expect(screen.getByPlaceholderText(/пароль/i)).toBeDefined();
  });

  it('вызывает api.post с правильными данными', async () => {
    (api.post as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: { token: 'test-token', user: { id: '1', username: 'test', email: 'test@test.com' } },
    });

    renderRegisterForm();

    await userEvent.type(screen.getByPlaceholderText(/имя/i), 'testuser');
    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@test.com');
    await userEvent.type(screen.getByPlaceholderText(/пароль/i), '123456');
    await userEvent.click(screen.getByRole('button', { name: /зарегистрироваться/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/auth/register', {
        username: 'testuser',
        email: 'test@test.com',
        password: '123456',
      });
    });
  });

  it('показывает ошибку, если email занят', async () => {
    (api.post as ReturnType<typeof vi.fn>).mockRejectedValueOnce({
      isAxiosError: true,
      response: { data: { message: 'Email уже используется' } },
    });

    renderRegisterForm();

    await userEvent.type(screen.getByPlaceholderText(/имя/i), 'testuser');
    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@test.com');
    await userEvent.type(screen.getByPlaceholderText(/пароль/i), '123456');
    await userEvent.click(screen.getByRole('button', { name: /зарегистрироваться/i }));

    await waitFor(() => {
      expect(screen.getByText(/email уже используется/i)).toBeDefined();
    });
  });
});