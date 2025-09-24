import api from "@/lib/apiFactory";
import { ApiError } from "@/utils/errorHandler";

export async function getOpenAISuggestion(apiKey: string, prompt: string) {
	try {
		const response = await api.post(
			"https://api.openai.com/v1/chat/completions",
			{
				model: "gpt-3.5-turbo",
				messages: [{ role: "user", content: prompt }],
				temperature: 0.7,
				max_tokens: 300,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${apiKey}`,
				},
			},
		);
		return response.data.choices[0]?.message?.content?.trim();
	} catch (error: any) {
		if (error.response) {
			throw new ApiError(
				error.response.status,
				error.response.data?.error?.message || error.message,
				error.response.data,
			);
		}
		throw error;
	}
}
