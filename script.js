document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const messagesContainer = document.getElementById('chatbot-messages');

    // --- 챗봇 답변 데이터 (이 부분을 FAQ 내용으로 채워 넣으세요!) ---
    // 질문 키워드를 포함하면 해당 답변을 반환하도록 설정합니다.
    const qaData = {
        "google 공인 교육자 level 1 시험 비용": "Google 공인 교육자 Level 1 시험은 10달러입니다.",
        "google 공인 교육자 자격증 유효 기간": "Google 공인 교육자 자격증은 36개월(3년) 동안 유효합니다.",
        "google 공인 트레이너 되는 법": "Google 공인 트레이너가 되려면 7단계를 거쳐야 합니다: 트레이너 과정 이수, 트레이너 기술 평가 통과, 교육자 Level 1 및 2 시험 통과, 트레이너 비디오 제출, 전문 개발 경험 입증, 지원서 제출. 자세한 내용은 웹사이트를 참고해주세요.",
        "구글 워크스페이스 for education": "Google Workspace for Education은 학교와 학습을 위한 생산성 도구 모음입니다. Classroom, Meet, Gmail 등이 포함됩니다.",
        "크롬북이란": "Chromebook은 ChromeOS를 운영체제로 사용하는 노트북입니다. 빠르고 안전하며 관리가 쉽습니다.",
        "ai 접근 방식": "Google은 교육 분야에서 시간을 절약하고, 학습을 맞춤화하며, 창의성을 높이는 데 도움이 되는 AI 솔루션에 중점을 둡니다. Gemini with enhanced data protection도 여기에 포함됩니다.",
        "시험 결과": "시험 결과는 일반적으로 3영업일 이내에 받아보실 수 있습니다.",
        "재시험 정책": "시험에 불합격한 경우, 첫 번째 재응시는 14일 후에 가능하며, 두 번째는 60일 후, 그 이후는 다시 60일 후에 가능합니다.",
        "공인 교육자 재인증": "Google 공인 교육자 자격증은 36개월마다 재인증해야 합니다.",
        "google for education 제품": "Google for Education은 Workspace for Education, Classroom, Google Meet, Chromebook 등을 포함한 다양한 제품을 제공합니다.",
        "공인 트레이너 자격 유지": "공인 트레이너 자격을 유지하려면 36개월마다 재인증하고, 최소 10회의 Google 관련 교육 세션을 보고하며, 유효한 Level 1 및 2 인증을 유지해야 합니다.",
        // 더 많은 Q&A 쌍을 여기에 추가하세요.
        // 특정 키워드에 대한 복수의 표현을 포함하면 더 좋습니다.
        "레벨1 비용": "Google 공인 교육자 Level 1 시험은 10달러입니다.",
        "자격증 기간": "Google 공인 교육자 자격증은 36개월(3년) 동안 유효합니다."
    };

    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        messageElement.textContent = text;
        messagesContainer.appendChild(messageElement);
        // 스크롤을 항상 최하단으로 이동
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function getBotResponse(userQuestion) {
        const lowerCaseQuestion = userQuestion.toLowerCase().trim();

        for (const keyword in qaData) {
            // 사용자의 질문에 키워드가 포함되어 있는지 확인
            if (lowerCaseQuestion.includes(keyword)) {
                return qaData[keyword];
            }
        }
        return "죄송합니다, 질문하신 내용을 이해하지 못했습니다. Google for Education 관련하여 다른 질문이 있으신가요?";
    }

    function sendMessage() {
        const userText = userInput.value;
        if (userText === "") return; // 빈 메시지는 전송하지 않음

        addMessage(userText, 'user');
        userInput.value = ''; // 입력 필드 초기화

        // 챗봇 답변을 비동기로 처리하여 자연스러운 대화 흐름 연출
        setTimeout(() => {
            const botResponse = getBotResponse(userText);
            addMessage(botResponse, 'bot');
        }, 500); // 0.5초 후에 챗봇 답변 표시
    }

    // 전송 버튼 클릭 시
    sendButton.addEventListener('click', sendMessage);

    // Enter 키 입력 시
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
