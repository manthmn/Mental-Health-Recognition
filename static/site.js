
let all_options = [
  "Not at all",
  "Several days",
  "More than half the days",
  "Nearly everyday"
];

let questions = [
  {
    id: 1,
    question: "Little interest or pleasure in doing things?",
    options: all_options
  },
  {
    id: 2,
    question: "Feeling down, depressed, or hopeless?",
    options: all_options
  },
  {
    id: 3,
    question: "Trouble falling or staying asleep, or sleeping too much?",
    options: all_options
  },
  {
    id: 4,
    question: "Feeling tired or having little energy?",
    options: all_options
  },
  {
    id: 5,
    question: "Poor appetite or overeating?",
    options: all_options
  },
  {
    id: 6,
    question: "Feeling bad about yourself - or that you are a failure or have let yourself or your family down?",
    options: all_options
  },
  {
    id: 7,
    question: "Moving or speaking so slowly that other people could have noticed Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",
    options: all_options
  },
  {
    id: 8,
    question: "Thoughts that you would be better off dead, or of hurting yourself in some way?",
    options: all_options
  },
  {
    id: 8,
    question: "Trouble concentrating on things, such as reading the newspaper or watching television?",
    options: all_options
  },
];

let question_count = 0;
let points = 0;

window.onload = function() {
  show(question_count);

};

function next() {


   
  // if the question is last then redirect to final page
  if (question_count == questions.length - 1) {
    sessionStorage.setItem("time", time);
    clearInterval(mytime);
    location.href = "start2.html";
  }

  
  
  console.log(question_count);

  let user_answer = document.querySelector("li.option.active").innerHTML;
  // check if the answer is right or wrong
  if (user_answer == questions[question_count].options[0]) {
    points += 0;
    sessionStorage.setItem("points", points);
  }
  if (user_answer == questions[question_count].options[1]) {
    points += 1;
    sessionStorage.setItem("points", points);
  }
  if (user_answer == questions[question_count].options[2]) {
    points += 2;
    sessionStorage.setItem("points", points);
  }
  if (user_answer == questions[question_count].options[3]) {
    points += 3;
    sessionStorage.setItem("points", points);
  }
  console.log(points);

  question_count++;
  show(question_count);
}

function show(count) {
  let question = document.getElementById("questions");
  //document.getElementById("image").src = "/video_feed";
  
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
  //image.getAttribute('src') = "{{url_for('video_feed')}}";
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
