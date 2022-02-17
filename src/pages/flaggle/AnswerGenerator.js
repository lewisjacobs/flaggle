import { Answers } from "./answers";

function generate() {

    let currentAnswers = Answers

    let newAnswers = [];

    let index = 0;

    while(index < 305) {
        if(! currentAnswers.includes(index)) newAnswers.push(index);
        index++;
    }

    shuffle(newAnswers);

    console.log(newAnswers);
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

export default generate;