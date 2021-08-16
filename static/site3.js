

let questions = [
  {
    id: 1,
    question: "https://openpsychometrics.org/tests/HEMCR/ink/I1.jpg",
    answer: "Random Access Memory",
    options: [
      "bat",
      "butterfly",
      "moth",
      "Other"
    ]
  },
  {
    id: 2,
    question: "https://openpsychometrics.org/tests/HEMCR/ink/I2.jpg",
    answer: "Central Processing Unit",
    options:[
      "two humans",
      "four-legged animal such as a dog",
      "elephant or bear",
      "Other"
    ]
  },
  {
    id: 3,
    question: "https://openpsychometrics.org/tests/HEMCR/ink/I3.jpg",
    answer: "Electronic Mail",
    options: [
      "two male",
      "Butterfly",
      "two female",
      "Other"
    ]
  },
  {
    id: 4,
    question: "https://openpsychometrics.org/tests/HEMCR/ink/I4.jpg",
    answer: "Electronic Mail",
    options: [
      "animal hide",
      "animal skin",
      "skin rug",
      "Other"
    ]
  },
  {
    id: 5,
    question: "https://openpsychometrics.org/tests/HEMCR/ink/I5.jpg",
    answer: "Electronic Mail",
    options:  [
      "bat",
      "butterly",
      "moth",
      "Other"
    ]
  },
  {
    id: 6,
    question: "https://openpsychometrics.org/tests/HEMCR/ink/I6.jpg",
    answer: "Electronic Mail",
    options:[
      "animal hide",
      "animal skin",
      "skin rug",
      "Other"
    ]
  },
  {
    id: 7,
    question: "https://openpsychometrics.org/tests/HEMCR/ink/I7.jpg",
    answer: "Electronic Mail",
    options: [
      "human heads",
      "faces",
      "heads of women or children",
      "Other"
    ]
  },
  {
    id: 8,
    question: "https://openpsychometrics.org/tests/HEMCR/ink/I8.jpg",
    answer: "Electronic Mail",
    options: [
      "pink four-legged animal",
      "some animal other than a cat or dog",
      "Mountain",
      "Other"
    ]
  },
  {
    id: 9,
    question: "https://openpsychometrics.org/tests/HEMCR/ink/I9.jpg",
    answer: "Electronic Mail",
    options: [
      "Human",
      "Two elephant",
      "Two Deer",
      "Other"
    ]
  },
  {
    id: 10,
    question: "https://openpsychometrics.org/tests/HEMCR/ink/I10.jpg",
    answer: "Electronic Mail",
    options: [
      "Crab",
      "lobster , rabit head",
      "blue spider , worms , caterpillars",
      "Other"
    ]
  },
];

let question_count = 0;
let points3 = 0;
sessionStorage.setItem("points3", points3);

window.onload = function() {
  show(question_count);

};

function next() {

   
  // if the question is last then redirect to final page
  if (question_count == questions.length - 1) {
    sessionStorage.setItem("time", time);
    clearInterval(mytime);
    location.href = "end.html";
  }
  console.log(question_count);

  let user_answer = document.querySelector("li.option.active").innerHTML;
  // check if the answer is right or wrong
  if (user_answer == questions[question_count].options[3]) {
    points3 += 1;
    sessionStorage.setItem("points3", points3);
  }
  console.log(points3);

  question_count++;
  show(question_count);
}

function show(count) {
  let question = document.getElementById("questions");
  let [first, second, third, fourth] = questions[count].options;

  question.innerHTML = `
  <h2>Image ${count + 1}</h2>
  <img src="${questions[count].question}" ,class="center",alt="Italian Trulli">
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
