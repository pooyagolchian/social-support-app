import { getOpenAISuggestion } from './openaiService';
import api from '@/lib/apiFactory';

jest.mock('@/lib/apiFactory');

describe('openaiService', () => {
  const mockApi = api as jest.Mocked<typeof api>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getOpenAISuggestion', () => {
    it('should make a successful API call and return the content', async () => {
      const mockResponse = {
        data: {
          choices: [
            {
              message: {
                content: '  This is a suggested response  ',
              },
            },
          ],
        },
      };

      mockApi.post.mockResolvedValue(mockResponse);

      const apiKey = 'test-api-key';
      const prompt = 'Please help me with writing';

      const result = await getOpenAISuggestion(apiKey, prompt);

      expect(mockApi.post).toHaveBeenCalledWith(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 300,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      expect(result).toBe('This is a suggested response');
    });

    it('should handle empty response', async () => {
      const mockResponse = {
        data: {
          choices: [],
        },
      };

      mockApi.post.mockResolvedValue(mockResponse);

      const result = await getOpenAISuggestion('test-key', 'test prompt');

      expect(result).toBeUndefined();
    });

    it('should handle null message content', async () => {
      const mockResponse = {
        data: {
          choices: [
            {
              message: {
                content: null,
              },
            },
          ],
        },
      };

      mockApi.post.mockResolvedValue(mockResponse);

      const result = await getOpenAISuggestion('test-key', 'test prompt');

      expect(result).toBeUndefined();
    });

    it('should handle missing message', async () => {
      const mockResponse = {
        data: {
          choices: [{}],
        },
      };

      mockApi.post.mockResolvedValue(mockResponse);

      const result = await getOpenAISuggestion('test-key', 'test prompt');

      expect(result).toBeUndefined();
    });

    it('should pass correct headers with API key', async () => {
      const mockResponse = {
        data: {
          choices: [
            {
              message: {
                content: 'Response',
              },
            },
          ],
        },
      };

      mockApi.post.mockResolvedValue(mockResponse);

      const apiKey = 'sk-test-key-123';
      await getOpenAISuggestion(apiKey, 'test prompt');

      expect(mockApi.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
    });

    it('should throw error when API call fails', async () => {
      const errorMessage = 'API Error';
      mockApi.post.mockRejectedValue(new Error(errorMessage));

      await expect(getOpenAISuggestion('test-key', 'test prompt')).rejects.toThrow(errorMessage);
    });

    it('should use correct OpenAI model and parameters', async () => {
      const mockResponse = {
        data: {
          choices: [
            {
              message: {
                content: 'Response',
              },
            },
          ],
        },
      };

      mockApi.post.mockResolvedValue(mockResponse);

      await getOpenAISuggestion('test-key', 'test prompt');

      expect(mockApi.post).toHaveBeenCalledWith(
        expect.any(String),
        {
          model: 'gpt-3.5-turbo',
          messages: expect.any(Array),
          temperature: 0.7,
          max_tokens: 300,
        },
        expect.any(Object)
      );
    });

    it('should trim whitespace from response content', async () => {
      const mockResponse = {
        data: {
          choices: [
            {
              message: {
                content: '\n\n  Response with whitespace  \n\n',
              },
            },
          ],
        },
      };

      mockApi.post.mockResolvedValue(mockResponse);

      const result = await getOpenAISuggestion('test-key', 'test prompt');

      expect(result).toBe('Response with whitespace');
    });

    it('should handle different prompt types', async () => {
      const mockResponse = {
        data: {
          choices: [
            {
              message: {
                content: 'Response',
              },
            },
          ],
        },
      };

      mockApi.post.mockResolvedValue(mockResponse);

      const prompts = [
        'Short prompt',
        'A very long prompt that contains multiple sentences. It should still work correctly. Even with special characters!',
        'Prompt with émojis 😊 and unicode characters ñ',
      ];

      for (const prompt of prompts) {
        await getOpenAISuggestion('test-key', prompt);

        expect(mockApi.post).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            messages: [{ role: 'user', content: prompt }],
          }),
          expect.any(Object)
        );
      }
    });
  });
});