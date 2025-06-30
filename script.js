let faqData = {};

// FAQ 데이터 불러오기
fetch("data/faq.json")
  .then(res => res.json())
  .then(data => {
    faqData = data;
  })
  .catch(err => {
    console.error("FAQ 데이터를 불러오는 데 실패했습니다.", err);
  });

// 사용자 입력 처리
function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById("chat-box");
  appendMessage("나", message);

  const response = getBotResponse(message);
  appendMessage("챗봇", response);

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}

// 챗봇 응답 처리
function getBotResponse(userMessage) {
  // 완전 일치하는 질문이 있는 경우
  if (faqData[userMessage]) {
    return faqData[userMessage];
  }

  // 유사 질문 키워드 매칭 (간단한 예)
  const lower = userMessage.toLowerCase();
  if (lower.includes("응시료")) {
    return "레벨 1은 10달러, 레벨 2는 25달러입니다.";
  }
  if (lower.includes("유효기간")) {
    return "모든 인증은 3년간 유효합니다.";
  }
  if (lower.includes("언어")) {
    return "한국어를 포함한 다양한 언어로 시험을 볼 수 있습니다.";
  }

  return "죄송해요, 아직 그 질문에 대한 답변은 준비 중이에요!";
}

// 메시지 화면에 출력
function appendMessage(sender, text) {
  const chatBox = document.getElementById("chat-box");
  const p = document.createElement("p");
  p.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(p);
}
