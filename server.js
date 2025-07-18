// 공통 API 요청 함수
const apiRequest = async (url, options = {}) => {
  // try catch 문을 사용해서 오류 처리하기
  // 값은 json 형태로 반환하기
  // http 상태 코드가 200이 아닐 경우 catch문으로 코드 전달하기
  // 파라미터 추가 X, 파라미터 전부 사용

  try {
    const response = await fetch(url, options);

    if (response.status !== 200) {
      throw new Error("Status code is not 200");
    }

    return response.json();
  } catch (error) {
    console.log(error + "!!!");
  }
};

// GET 요청
const fetchData = async (number) => {
    // apiRequest 함수 써서 number에 해당하는 post를 return하는 함수 내부 쓰기
    // 파라미터 추가 X, 파라미터 전부 사용

    return apiRequest();
};

// POST 요청
const postData = async (data) => {
    data = JSON.stringify(data);
    // apiRequest 함수 써서 data를 post하는 함수 내부 쓰기

    // options 파라미터 부분에는 
    // method(POST), headers({"Content-Type": "application/json"} 이거 하나만), body(전달해줄 값) 
    // 을 설정해서 apiRequest 함수에 넘겨주기

    // 파라미터 추가 X, 파라미터 전부 사용

};

// 랜덤 색상 생성
const generateRandomColor = () => {
  return Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
};

// 결과 HTML 생성
const createResultHTML = (id, data, color, isError = false) => {
  if (isError || typeof data === "string") {
    return `<div class="card"><p style="color:#${color}">ID : ${id}</p><p>${data}</p></div>`;
  }
  return `<div class="card"><p style="color:#${color}">ID : ${data.id}</p><p>title : ${data.title}</p><p>body : ${data.body}</p></div>`;
};

// 결과 표시
const displayResult = (resultDiv, message,) => {
  resultDiv.innerHTML = message + resultDiv.innerHTML;
};

addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("fetchButton");
  const fetchSpecificButton = document.getElementById("fetchSpecificButton");
  const createPostButton = document.getElementById("createPostButton");
  const getPostIdInput = document.getElementById("getPostIdInput");
  const postTitleInput = document.getElementById("postTitleInput");
  const postBodyInput = document.getElementById("postBodyInput");
  const resultDiv = document.getElementById("result");

  // GET 버튼 이벤트 (랜덤)
  button.addEventListener("click", async () => {
    const r = Math.floor(Math.random() * 100 - 50);
    const color = generateRandomColor();

    const searchMessage = `<p style="color:#${color}">ID 검색: ${r}</p>`;
    displayResult(resultDiv, searchMessage);

    const data = await fetchData(r);
    const resultHTML = createResultHTML(
      r,
      data,
      color,
      typeof data === "string"
    );

    displayResult(resultDiv, resultHTML);
  });

  // 특정 ID로 GET 요청
  fetchSpecificButton.addEventListener("click", async () => {
    const id = parseInt(getPostIdInput.value);
    const color = generateRandomColor();
    const searchMessage = `<p style="color:#${color}">ID 검색: ${id}</p>`;
    displayResult(resultDiv, searchMessage);

    const data = await fetchData(id);
    const resultHTML = createResultHTML(
      id,
      data,
      color,
      typeof data === "string"
    );

    displayResult(resultDiv, resultHTML);
    getPostIdInput.value = ""; // 입력 필드 초기화
  });

  // 입력 폼으로 POST 요청
  createPostButton.addEventListener("click", async () => {
    const userId = 1;
    const title = postTitleInput.value.trim();
    const body = postBodyInput.value.trim();

    const color = generateRandomColor();
    const createMessage = `<p style="color:#${color}">새 포스트 생성</p>`;
    displayResult(resultDiv, createMessage);
    const data = await postData({
      userId: userId,
      title: title,
      body: body,
    });
    const resultHTML = createResultHTML(
      userId,
      data,
      color,
      typeof data === "string"
    );

    displayResult(resultDiv, resultHTML);

    // 입력 필드들 초기화
    postTitleInput.value = "";
    postBodyInput.value = "";
  });
});
