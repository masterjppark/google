const faq = {
  "레벨1 시험이 뭔가요?": "Google 공인교육자 레벨 1 시험은 Google 도구의 기본적인 사용 역량을 평가합니다.",
  "응시료는 얼마인가요?": "레벨 1 시험 응시료는 10달러입니다.",
  "응시 방법은?": "Google 계정으로 로그인한 후 시험 응시 페이지에서 응시할 수 있습니다."
};

function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<p><strong>나:</strong> ${message}</p>`;

  const response = faq[message] || "죄송해요, 아직 그 질문에 대한 답변은 준비 중이에요!";
  chatBox.innerHTML += `<p><strong>챗봇:</strong> ${response}</p>`;
  input.value = "";
}
