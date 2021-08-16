
let all_options = [
  "Not at all",
  "Several days",
  "More than half the days",
  "Nearly everyday"
];

let questions = [
  {
    id: 1,
    question: "How often have you been bothered for no specific reason?",
    options: all_options
  },
  {
    id: 2,
    question: "How often have you been bothered by not being able to stop or control worrying?",
    options: all_options
  },
  {
    id: 3,
    question: "How often have you been bothered by worrying too much about different things?",
    options: all_options
  },
  {
    id: 4,
    question: "How often have you been bothered by having trouble relaxing?",
    options: all_options
  },
  {
    id: 5,
    question: "How often have you been bothered by being so restless that it is hard to sit still?",
    options: all_options
  },
  {
    id: 6,
    question: "Have you had an anxiety attack (suddenly feeling fear or panic)?",
    options: all_options
  },
  {
    id: 7,
    question: "How often have you been bothered by becoming easily annoyed or irritable?",
    options: all_options
  },
  {
    id: 8,
    question: "How often have you been bothered by feeling afraid as if something awful might happen?",
    options: all_options
  },
  {
    id: 8,
    question: "If this questionnaire has highlighted any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?",
    options: all_options
  },
];

let question_count = 0;
let points2 = 0;

window.onload = function() {
  show(question_count);

};

function next() {

   
  // if the question is last then redirect to final page
  if (question_count == questions.length - 1) {
    sessionStorage.setItem("time", time);
    clearInterval(mytime);
    location.href = "start3.html";
  }
  console.log(question_count);

  let user_answer = document.querySelector("li.option.active").innerHTML;
  // check if the answer is right or wrong
  if (user_answer == questions[question_count].options[0]) {
    points2 += 0;
    sessionStorage.setItem("points2", points2);
  }
  if (user_answer == questions[question_count].options[1]) {
    points2 += 1;
    sessionStorage.setItem("points2", points2);
  }
  if (user_answer == questions[question_count].options[2]) {
    points2 += 2;
    sessionStorage.setItem("points2", points2);
  }
  if (user_answer == questions[question_count].options[3]) {
    points2 += 3;
    sessionStorage.setItem("points2", points2);
  }
  console.log(points2);

  question_count++;
  show(question_count);
}

function show(count) {
  let question = document.getElementById("questions");
  let [first, second, third, fourth] = questions[count].options;

  question.innerHTML = `
  <h2>Q${count + 1}. ${questions[count].question}</h2>
   <ul class="option_group">
  <li class="option">${first}</li>
  <li class="option">${second}</li>
  <li class="option">${third}</li>
  <li class="option">${fourth}</li>
</ul> 
  `;
  toggleActive();
}

function toggleActive() {
  let option = document.querySelectorAll("li.option");
  for (let i = 0; i < option.length; i++) {
    option[i].onclick = function() {
      for (let i = 0; i < option.length; i++) {
        if (option[i].classList.contains("active")) {
          option[i].classList.remove("active");
        }
      }
      option[i].classList.add("active");
    };
  }
}
