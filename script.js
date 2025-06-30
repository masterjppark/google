let faqData = [];

window.onload = () => {
  // 초기 인사 메시지
  addMessage(
    "안녕하세요. 저는 구글 공인교육자 제도에 대해 궁금한 점을 답변해드리는 챗봇입니다.\n\n구글 공인교육자 제도에 대해 궁금한 것을 물어보세요.",
    "bot-message"
  );

  fetch('data/faq.json')
    .then(res => res.json())
    .then(data => faqData = data)
    .catch(err => console.error("faq.json 불러오기 실패:", err));
};

function sendMessage() {
  const input = document.getElementById("user-input");
  const question = input.value.trim();
  if (!question) return;

  addMessage(question, "user-message");

  const answer = getAnswer(question);
  addMessage(answer, "bot-message");

  input.value = "";
}

function handleEnter(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
}

function addMessage(text, className) {
  const chat = document.getElementById("chat-window");
  const message = document.createElement("div");
  message.className = className;
  message.innerText = text;
  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;
}

function getAnswer(userQuestion) {
  const lower = userQuestion.toLowerCase();
  const found = faqData.find(item => lower.includes(item.question.toLowerCase()));
  return found
    ? found.answer
    : "죄송합니다, 질문하신 내용을 이해하지 못했습니다. Google 공인교육자 제도 관련하여 다른 질문이 있으신가요?";
}
