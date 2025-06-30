document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const messagesContainer = document.getElementById('chatbot-messages');

    // 1. 시작 시 챗봇 소개 메시지 추가
    // DOMContentLoaded 이벤트가 발생했을 때 초기 메시지를 추가
    addMessage('안녕하세요! 저는 Google 공인 교육자 제도에 대해 궁금한 점을 알려주는 챗봇입니다.', 'bot');

    // --- 챗봇 답변 데이터 ---
    // 각 객체는 'keywords' 배열과 'answer' 문자열을 가집니다.
    // 'keywords' 배열에는 해당 답변을 유도할 수 있는 다양한 질문 키워드를 포함합니다.
    const qaData = [
        // 2. '안녕'에 대한 답변 수정
        {
            keywords: ["안녕", "안녕하세요", "hi", "hello", "반가워"],
            answer: "안녕하세요! 반갑습니다. 궁금한 점을 말씀해 주세요."
        },
        // 3. '누구'에 대한 답변 수정
        {
            keywords: ["너는 누구니", "넌 누구야", "자기소개", "누구세요", "정체", "이름"],
            answer: "저는 Google 공인 교육자 제도에 대해 궁금한 점을 알려주는 챗봇입니다."
        },
        // 4. 용어 수정 (구글 공인 교육자 L1, L2) 반영 및 기존 Q&A 강화
        {
            keywords: ["google 공인 교육자 l1 시험 비용", "공인 교육자 l1 비용", "l1 가격", "l1 얼마", "l1 응시료", "l1 시험료"],
            answer: "Google 공인 교육자 L1 시험은 10달러입니다."
        },
        {
            keywords: ["google 공인 교육자 l2 시험 비용", "공인 교육자 l2 비용", "l2 가격", "l2 얼마", "l2 응시료", "l2 시험료"],
            answer: "Google 공인 교육자 L2 시험은 25달러입니다."
        },
        {
            keywords: ["google 공인 교육자 l1 자격증 유효 기간", "l1 자격증 기간", "l1 인증서 유효", "l1 교육자 인증 만료"],
            answer: "Google 공인 교육자 L1 자격증은 36개월(3년) 동안 유효합니다."
        },
        {
            keywords: ["google 공인 교육자 l2 자격증 유효 기간", "l2 자격증 기간", "l2 인증서 유효", "l2 교육자 인증 만료"],
            answer: "Google 공인 교육자 L2 자격증은 36개월(3년) 동안 유효합니다."
        },
        {
            keywords: ["google 공인 트레이너 되는 법", "트레이너 방법", "트레이너 되는", "트레이너 과정", "공인 트레이너 되는 법", "트레이너 자격", "트레이너 신청"],
            answer: "Google 공인 트레이너가 되려면 7단계를 거쳐야 합니다: 트레이너 과정 이수, 트레이너 기술 평가 통과, Google 공인 교육자 L1 및 L2 시험 통과, 트레이너 비디오 제출, 전문 개발 경험 입증, 지원서 제출. 자세한 내용은 Google for Education 웹사이트를 참고해주세요."
        },
        {
            keywords: ["구글 워크스페이스 for education", "워크스페이스 교육", "google workspace education", "google workspace 제품"],
            answer: "Google Workspace for Education은 학교와 학습을 위한 생산성 도구 모음입니다. Classroom, Google Meet, Gmail, Docs, Sheets 등이 포함됩니다."
        },
        {
            keywords: ["크롬북이란", "크롬북 뭐야", "chromebook", "크롬os", "크롬 운영체제"],
            answer: "Chromebook은 ChromeOS를 운영체제로 사용하는 노트북입니다. 빠르고 안전하며 관리가 쉽습니다. ChromeOS Flex도 있습니다."
        },
        {
            keywords: ["ai 접근 방식", "구글 교육 ai", "ai 교육", "gemini", "제미니"],
            answer: "Google은 교육 분야에서 시간을 절약하고, 학습을 맞춤화하며, 창의성을 높이는 데 도움이 되는 AI 솔루션에 중점을 둡니다. Gemini with enhanced data protection도 이의 일환입니다."
        },
        {
            keywords: ["시험 결과", "인증 결과", "합격 여부", "l1 시험 결과", "l2 시험 결과"],
            answer: "시험 결과는 일반적으로 3영업일 이내에 받아보실 수 있습니다."
        },
        {
            keywords: ["재시험 정책", "시험 재응시", "불합격 재응시", "l1 재시험", "l2 재시험"],
            answer: "시험에 불합격한 경우, 첫 번째 재응시는 14일 후에 가능하며, 두 번째는 60일 후, 그 이후는 다시 60일 후에 가능합니다."
        },
        {
            keywords: ["공인 교육자 재인증", "교육자 재인증", "google 공인 교육자 l1 재인증", "google 공인 교육자 l2 재인증"],
            answer: "Google 공인 교육자 L1 및 L2 자격증은 36개월(3년)마다 재인증해야 합니다."
        },
        {
            keywords: ["google for education 제품", "구글 교육 제품", "edu 제품"],
            answer: "Google for Education은 Workspace for Education, Classroom, Google Meet, Chromebook 등을 포함한 다양한 제품을 제공합니다."
        },
        {
            keywords: ["공인 트레이너 자격 유지", "트레이너 자격 유지", "트레이너 유지 요건"],
            answer: "공인 트레이너 자격을 유지하려면 36개월마다 재인증하고, 최소 10회의 Google 관련 교육 세션을 보고하며, 유효한 Google 공인 교육자 L1 및 L2 인증을 유지해야 합니다."
        },
        {
            keywords: ["혁신가 프로그램", "공인 혁신가", "innovator academy"],
            answer: "Google 공인 혁신가는 교육 분야에서 변화를 주도하는 리더들을 위한 프로그램입니다. 혁신가 아카데미에 대한 정보는 웹사이트에서 확인하실 수 있습니다."
        },
        {
            keywords: ["챔피언 프로그램", "pd 파트너 챔피언", "pd 파트너"],
            answer: "Professional Development (PD) 파트너는 Google for Education 챔피언(트레이너, 혁신가, 코치)이 되는 과정을 지원할 수 있습니다."
        },
        // --- 일반적인 대화 및 예외 처리 키워드 ---
        {
            keywords: ["고마워", "감사합니다", "땡큐", "수고했어"],
            answer: "천만에요! 더 궁금한 점이 있으시면 언제든지 말씀해주세요."
        },
        {
            keywords: ["이런", "흠", "그렇군", "음", "아하", "알았어"],
            answer: "네, 혹시 더 궁금한 점이 있으신가요?"
        },
        {
            keywords: ["바보", "멍청이", "몰라", "모르겠어", "엉뚱한", "이상해"],
            answer: "죄송합니다. 아직 학습 중이라 모든 질문에 답변하기 어려울 수 있습니다. 좀 더 구체적으로 질문해주시거나, 다른 방식으로 질문해주시면 답변에 도움을 드릴 수 있습니다!"
        },
        {
            keywords: ["나가기", "종료", "그만"],
            answer: "다음에 또 궁금한 점이 있으시면 언제든지 찾아주세요! 안녕히 계세요."
        }
    ];

    // 메시지를 대화창에 추가하는 함수
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        messageElement.textContent = text;
        messagesContainer.appendChild(messageElement);
        // 새로운 메시지가 추가될 때마다 스크롤을 최하단으로 이동
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // 사용자 질문에 따라 챗봇 답변을 생성하는 함수
    function getBotResponse(userQuestion) {
        const lowerCaseQuestion = userQuestion.toLowerCase().trim();

        for (const item of qaData) {
            for (const keyword of item.keywords) {
                if (lowerCaseQuestion.includes(keyword)) {
                    return item.answer;
                }
            }
        }
        // 일치하는 키워드가 없을 경우 기본 답변 반환
        return "죄송합니다, 질문하신 내용을 이해하지 못했습니다. Google 공인 교육자 제도 관련하여 다른 질문이 있으신가요?";
    }

    // 메시지 전송 처리 함수
    function sendMessage() {
        const userText = userInput.value;
        if (userText === "") return; // 빈 메시지는 전송하지 않음

        addMessage(userText, 'user'); // 사용자 메시지 추가
        userInput.value = ''; // 입력 필드 초기화

        // 챗봇 답변을 비동기로 처리하여 자연스러운 대화 흐름 연출
        setTimeout(() => {
            const botResponse = getBotResponse(userText);
            addMessage(botResponse, 'bot'); // 챗봇 메시지 추가
        }, 700); // 0.7초 후에 챗봇 답변 표시 (조절 가능)
    }

    // 전송 버튼 클릭 이벤트 리스너
    sendButton.addEventListener('click', sendMessage);

    // 사용자 입력 필드에서 Enter 키 입력 이벤트 리스너
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
