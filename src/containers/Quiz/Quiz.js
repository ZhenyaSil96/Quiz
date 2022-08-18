import React from "react";
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends React.Component{
    state = {
        results:{}, //Ключ  по id {[id]: succes or error}
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz : [
            {
                question: 'Какой у тебя цвет?',
                rightAnswerId: 1,
                id:1,
                answers: [
                    {text: 'Синий', id : 1},
                    {text: 'Зеленый', id : 2},
                    {text: 'Белый', id : 3},
                    {text: 'Черный', id: 4}
                ]
            },
            {
                question: 'Сколько тебе лет',
                rightAnswerId: 2,
                id: 2,
                answers:[
                    {text: '10', id: 1},
                    {text: '15', id: 2},
                    {text: '20', id: 3},
                    {text: '25', id: 4}
                ]
            }
        ]
    }

onAnswerClickHeandler = answerId => {
    if(this.state.answerState) {
        const key = Object.keys(this.state.answerState)[0]
        if(this.state.answerState[key] === 'success') {
            return
        }
    }
    console.log('Answer id = ' , answerId)

    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results 


    if(question.rightAnswerId === answerId) {

        if(!results[question.id]){
            results[question.id] = 'succes'
        }

        this.setState({
            answerState: {[answerId]: 'succes'},
            results:results
        })
        const timeout = window.setTimeout(() => {
          if(this.isQuizFinished()) {
           this.setState({
            isFinished: true
           })
          }else{
            this.setState({
                activeQuestion: this.state.activeQuestion + 1,
                answerState : null,
            })
          }

            window.clearTimeout(timeout)
        }, 1000)
      
    }else {
        results[question.id] = 'error'
        this.setState(
            {
                answerState: {
                    [answerId]: 'error'
                },
                results: results   
            }
        )
    }

    
}

isQuizFinished(){
    return this.state.activeQuestion + 1 === this.state.quiz.length
}

retryHandler = () => {
    this.setState({
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        results: {}
    })
}

comonentDidMount() {
    console.log(' Quiz id', this.props.match.id)
}


    render() {
        return(
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                <h1>
                    Вопросы
                </h1>
                {
                   this.state.isFinished 
                   ? 
                   <FinishedQuiz
                     results = {this.state.results}
                     quiz = {this.state.quiz}
                     onRetry = {this.retryHandler}
                   />
                    : <ActiveQuiz
                      answers = {this.state.quiz[this.state.activeQuestion].answers}
                      question = {this.state.quiz[this.state.activeQuestion].question}
                      onAnswerClick = {this.onAnswerClickHeandler}
                      quizLength = {this.state.quiz.length}
                      answerNumber = {this.state.activeQuestion + 1}
                      state = {this.state.answerState}
                    />
                }
                </div>
            </div>
        )
    }
}
export default Quiz