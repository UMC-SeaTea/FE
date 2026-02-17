export const getProfileImageUrl = (
  url: string | null | undefined,
  defaultImage: string
) => {
  if (!url) return defaultImage;

  if (
    url.startsWith('http') ||
    url.startsWith('https') ||
    url.startsWith('data:')
  ) {
    return url;
  }

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  if (!baseUrl) return url;

  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;

  return `${cleanBase}${cleanUrl}`;
};

export const NICKNAME_REGEX = /^[a-zA-Z0-9가-힣]{4,}$/;

export const validateNickname = (nickname: string): boolean => {
  return NICKNAME_REGEX.test(nickname);
};
