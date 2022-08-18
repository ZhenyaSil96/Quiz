import React from "react";
import Layout from "./hoc/Layout/Layout";
import Quiz from './containers/Quiz/Quiz'
import { BrowserRouter, Routes, Route,Switch } from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";

function App() {
  return (
    <BrowserRouter>
    
    <Layout>
      <Routes>
        <Route path="/quiz/:id" element= {<Quiz/>}/>
        <Route path="/auth" element= {<Auth/>}/>
        <Route path="/quiz-creator" element= {<QuizCreator/>}/>
        <Route path="/" element= {<QuizList/>}/>
      </Routes>
     
    </Layout>
    
    </BrowserRouter>
  );
}

export default App;
