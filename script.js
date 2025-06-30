// 전역 변수
let faqData = null;
let isLoading = false;

// DOM 요소들
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const typingIndicator = document.getElementById('typingIndicator');
const quickQuestionsContainer = document.getElementById('quickQuestions');

// 초기화
document.addEventListener('DOMContentLoaded', async () => {
    await loadFAQData();
    setupEventListeners();
    messageInput.focus();
});

// FAQ 데이터 로드
async function loadFAQData() {
    try {
        showLoadingMessage('FAQ 데이터를 불러오는 중...');
        
        const response = await fetch('data/faq.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        faqData = await response.json();
        hideLoadingMessage();
        loadQuickQuestions();
        
        console.log('FAQ 데이터 로드 완료:', faqData);
        
    } catch (error) {
        console.error('FAQ 데이터 로드 실패:', error);
        hideLoadingMessage();
        showErrorMessage('FAQ 데이터를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.');
        
        // 에러 발생시 기본 FAQ 데이터 사용
        useFallbackData();
    }
}

// 대체 데이터 사용 (faq.json 로드 실패시)
function useFallbackData() {
    faqData = {
        "quick_questions": [
            "Google 인증교육자란 무엇인가요?",
            "인증 시험은 어떻게 신청하나요?",
            "Level 1과 Level 2의 차이점은?",
            "시험 준비는 어떻게 하나요?"
        ],
        "questions": [
            {
                "keywords": ["구글 인증교육자", "google 인증교육자", "인증교육자란", "google certified educator"],
                "answer": "Google 인증교육자(Google Certified Educator)는 Google for Education 도구들을 효과적으로 활용할 수 있는 능력을 인증받은 교육자입니다. Level 1과 Level 2로 나뉘며, 각각 다른 수준의 Google 도구 활용 능력을 평가합니다."
            },
            {
                "keywords": ["시험 신청", "신청 방법", "어떻게 신청"],
                "answer": "Google 인증교육자 시험은 온라인으로 신청할 수 있습니다.\n1. Google for Education 웹사이트 방문\n2. 'Training & Certification' 메뉴 선택\n3. 원하는 레벨(Level 1 또는 Level 2) 선택\n4. 시험 일정 및 결제 진행\n\n시험 비용은 Level 1이 $10, Level 2가 $25입니다."
            }
        ]
    };
    
    loadQuickQuestions();
    console.log('대체 FAQ 데이터 사용');
}

// 빠른 질문 버튼들 로드
function loadQuickQuestions() {
    if (!faqData || !faqData.quick_questions) return;
    
    quickQuestionsContainer.innerHTML = '';
    
    faqData.quick_questions.forEach(question => {
        const button = document.createElement('div');
        button.className = 'quick-question';
        button.textContent = question;
        button.onclick = () => sendQuickQuestion(question);
        quickQuestionsContainer.appendChild(button);
    });
}

// 이벤트 리스너 설정
function setupEventListeners() {
    sendButton.addEventListener('click', sendMessage);
    
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !isLoading) {
            sendMessage();
        }
    });

    messageInput.addEventListener('input', () => {
        sendButton.disabled = !messageInput.value.trim() || isLoading;
    });
}

// 메시지 전송
async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message || isLoading) return;

    // 사용자 메시지 추가
    addMessage(message, true);
    messageInput.value = '';
    setLoadingState(true);

    // 타이핑 표시
    showTyping();

    try {
        // 답변 생성 (실제 응답 시간 시뮬레이션)
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
        
        const answer = findAnswer(message);
        hideTyping();
        addMessage(answer);
        
    } catch (error) {
        console.error('답변 생성 오류:', error);
        hideTyping();
        addMessage('죄송합니다. 일시적인 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
        setLoadingState(false);
        messageInput.focus();
    }
}

// 빠른 질문 전송
function sendQuickQuestion(question) {
    if (isLoading) return;
    messageInput.value = question;
    sendMessage();
}

// 답변 찾기
function findAnswer(question) {
    if (!faqData || !faqData.questions) {
        return "죄송합니다. FAQ 데이터를 불러올 수 없어서 답변을 제공할 수 없습니다.";
    }

    const lowerQuestion = question.toLowerCase();
    
    // 키워드 매칭으로 답변 찾기
    for (const item of faqData.questions) {
        for (const keyword of item.keywords) {
            if (lowerQuestion.includes(keyword.toLowerCase())) {
                return item.answer;
            }
        }
    }
    
    // 답변을 찾지 못한 경우
    return "죄송합니다. 해당 질문에 대한 정보를 찾을 수 없습니다. Google for Education 관련 다른 질문을 해주시거나, 더 구체적으로 질문해 주세요.\n\n예를 들어:\n• Google 인증교육자 시험 신청 방법\n• Level 1과 Level 2의 차이점\n• 시험 준비 방법\n• 인증서 유효기간\n\n등에 대해 질문해 주세요.";
}

// 메시지 추가
function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    
    // 줄바꿈 처리
    const formattedContent = content.replace(/\n/g, '<br>');
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${isUser ? '👤' : '🤖'}</div>
        <div class="message-content">${formattedContent}</div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// 로딩 상태 설정
function setLoadingState(loading) {
    isLoading = loading;
    sendButton.disabled = loading || !messageInput.value.trim();
    messageInput.disabled = loading;
    
    if (loading) {
        sendButton.textContent = '전송 중...';
    } else {
        sendButton.textContent = '전송';
    }
}

// 타이핑 표시/숨김
function showTyping() {
    typingIndicator.style.display = 'flex';
    scrollToBottom();
}

function hideTyping() {
    typingIndicator.style.display = 'none';
}

// 로딩 메시지 표시
function showLoadingMessage(message) {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-message';
    loadingDiv.id = 'loadingMessage';
    loadingDiv.textContent = message;
    chatMessages.appendChild(loadingDiv);
    scrollToBottom();
}

// 로딩 메시지 숨김
function hideLoadingMessage() {
    const loadingMessage = document.getElementById('loadingMessage');
    if (loadingMessage) {
        loadingMessage.remove();
    }
}

// 에러 메시지 표시
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    chatMessages.appendChild(errorDiv);
    scrollToBottom();
}

// 하단으로 스크롤
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 전역 에러 핸들러
window.addEventListener('error', (event) => {
    console.error('전역 에러:', event.error);
});

// fetch 에러 핸들러
window.addEventListener('unhandledrejection', (event) => {
    console.error('처리되지 않은 Promise 거부:', event.reason);
    event.preventDefault();
});
