import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import FeedPage from '@/app/feed/page';

vi.mock('@/components/FollowButton', () => ({
  default: () => <button>Подписаться</button>,
}));

vi.mock('@/components/LikeButton', () => ({
  default: () => <button>❤️ 0</button>,
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
  useParams: vi.fn(() => ({})),
}));

vi.mock('@/lib/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
    },
  },
}));

import api from '@/lib/api';

describe('FeedPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('показывает загрузку при первом рендере', () => {
    (api.get as ReturnType<typeof vi.fn>).mockReturnValue(new Promise(() => {}));
    render(<FeedPage />);
    expect(screen.getByText(/загрузка/i)).toBeDefined();
  });

  it.skip('показывает посты после загрузки', async () => {
    (api.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: {
        data: [
          {
            id: '1',
            content: 'Первый пост',
            createdAt: new Date().toISOString(),
            Author: { id: '1', username: 'testuser' },
            likeCount: 0,
            isLiked: false,
          },
        ],
      },
    });

    render(<FeedPage />);

    await waitFor(() => {
      expect(screen.getByText('Первый пост')).toBeDefined();
    });
  });

  it('показывает сообщение, если постов нет', async () => {
    (api.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: { data: [] },
    });

    render(<FeedPage />);

    await waitFor(() => {
      expect(screen.getByText(/постов пока нет/i)).toBeDefined();
    });
  });

  it('показывает ошибку при падении запроса', async () => {
    (api.get as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Сеть недоступна'));

    render(<FeedPage />);

    await waitFor(() => {
      expect(screen.getByText(/не удалось загрузить/i)).toBeDefined();
    });
  });
});