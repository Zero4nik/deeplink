import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../LoginForm';
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

const renderLoginForm = () => {
  return render(
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  );
};

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('рендерит поля email и пароль', () => {
    renderLoginForm();
    expect(screen.getByPlaceholderText('Email')).toBeDefined();
    expect(screen.getByPlaceholderText(/пароль/i)).toBeDefined();
  });

it('не отправляет запрос с пустыми полями', async () => {
  renderLoginForm();
  const button = screen.getByRole('button', { name: /войти/i });
  await userEvent.click(button);

  expect(api.post).not.toHaveBeenCalled();
});

  it('вызывает api.post с правильными данными', async () => {
    (api.post as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: { token: 'test-token', user: { id: '1', username: 'test', email: 'test@test.com' } },
    });

    renderLoginForm();
    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@test.com');
    await userEvent.type(screen.getByPlaceholderText(/пароль/i), '123456');
    await userEvent.click(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/auth/login', {
        email: 'test@test.com',
        password: '123456',
      });
    });
  });

  it('показывает ошибку при неверных данных', async () => {
    (api.post as ReturnType<typeof vi.fn>).mockRejectedValueOnce({
      isAxiosError: true,
      response: { data: { message: 'Неверный email или пароль' } },
    });

    renderLoginForm();
    await userEvent.type(screen.getByPlaceholderText('Email'), 'bad@test.com');
    await userEvent.type(screen.getByPlaceholderText(/пароль/i), 'wrong');
    await userEvent.click(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(screen.getByText('Неверный email или пароль')).toBeDefined();
    });
  });
});