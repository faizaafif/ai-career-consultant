from transformers import pipeline

class ConsultantLLM:
    def __init__(self):
        self.generator = pipeline(
            "text-generation",
            model="google/flan-t5-base",
            max_length=512
        )

    def generate(self, prompt: str) -> str:
        response = self.generator(prompt)
        return response[0]["generated_text"]
