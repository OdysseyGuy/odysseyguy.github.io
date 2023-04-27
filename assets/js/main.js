const messages = ["Hello", "नमस्ते", "你好", "안녕하세요"];

function greetings() {
  return {
    messages: messages,
    init() {
      console.log("Hello");
    },
  };
}
