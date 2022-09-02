import React, {Component} from "react";
import classes from './QuizCreator.module.css'
import Button from '../../components/UI/Button'
import {creatControl, validate, validateForm} from '../../form/formFramework'
import Input from '../../components/UI/Input/input'
import Select from '../../components/UI/Select/Select'

function createOptionControl(number) {
    return creatControl({
      label: `Вариант ${number}`,
      errorMessage: 'Значение не может быть пустым',
      id: number
    }, {required: true})
  }
  
  function createFormControls() {
    return {
      question: creatControl({
        label: 'Введите вопрос',
        errorMessage: 'Вопрос не может быть пустым'
      }, {required: true}),
      option1: createOptionControl(1),
      option2: createOptionControl(2),
      option3: createOptionControl(3),
      option4: createOptionControl(4)
    }
  }
  
  export default class QuizCreator extends Component {
  
    state = {
      quiz: [],
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    }
  
    sibmitHandler = event => {
      event.preventDefault()
    }
  
    addQuestionHandler = event => {
      event.preventDefault()
    }
  
    createQuizHandler = () => {
  
    }
  
    changeHandler = (value, controlName) => {
      const formControls = {...this.state.formControls}
      const control = {...formControls[controlName]}

     
      control.touched = true
      control.value = value
      control.valid = validate(control.value, control.validation)
  
      formControls[controlName] = control
  
      this.setState({
        formControls,
        isFormValid: validateForm(formControls)
      })
  
    }
  
    renderControls() {
      return Object.keys(this.state.formControls).map((controlName, index) => {
        const control = this.state.formControls[controlName]
  
        return (
            <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event => this.changeHandler(event.target.value, controlName)}
          />
           
         
        )
      })
    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }
  
    render() {
        const select = <Select
            label='Выбирите правильный id'
            value = {this.state.rightAnswerId}
            onChange = {this.selectChangeHandler}
            options= {[
                {text:1, value:1},
                {text:2, value:2},
                {text:3, value:3},
                {text:4, value:4},
            ]}
        />
      return (
        <div className={classes.QuizCreator}>
          <div>
            <h1>Создание теста</h1>
  
            <form onSubmit={this.submitHandler}>
  
              { this.renderControls() }
  
            {select}
  
              <Button
                type="primary"
                onClick={this.addQuestionHandler}
              >
                Добавить вопрос
              </Button>
  
              <Button
                type="success"
                onClick={this.createQuizHandler}
              >
                Создать тест
              </Button>
  
            </form>
          </div>
        </div>
      )
    }
  }