import React, { Component } from 'react';
import './App.css';
import Child from './Child';
import SimpleReactValidator from 'simple-react-validator';
import GradeService from './gradeService';

 
class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      asgnItems: [],
      assignment:'',
      weight:null,
      grade:null,
      gradeMessage:'',
      invalidWeightMessage:''
    };
    this.addAssignment = this.addAssignment.bind(this);
    this.setAssignment = this.setAssignment.bind(this);
    this.setWeight = this.setWeight.bind(this);
    this.setGrade = this.setGrade.bind(this);
    this.send = this.send.bind(this);
  }

  setAssignment(e){
    this.setState({assignment:e.target.value})
  }
  setWeight(e){
    this.setState({weight:e.target.value})
  }
  setGrade(e){
    this.setState({grade:e.target.value})
  }

  componentWillMount() {
    this.validator = new SimpleReactValidator({
      element: 
      (message, className) => <div className='warning'>{message}</div>,
    })
  }

  addAssignment(e) {
    if(this.validator.allValid()) {   
      let tempAssign = {"assignment":this.state.assignment, "weight":this.state.weight, 
                      "grade":this.state.grade}
      let tempAssignList = this.state.asgnItems;
      tempAssignList.push(tempAssign);
      this.setState({asgnItems:tempAssignList})
      this.setState({assignment:""})
      this.setState({weight:""})
      this.setState({grade:""})
    }
    else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  send(e) {
    let tempAssignList = this.state.asgnItems
    let totalWeight = 0
    for(var i = 0; i < tempAssignList.length; i++){
      totalWeight += parseFloat(tempAssignList[i].weight)
    }
    if (totalWeight == 100){  
      let tempGradeMessage = this.state.gradeMessage;
      let _grade = GradeService.calcGrade(this.state.asgnItems)
      if(_grade >= 90 && _grade <= 100){
        tempGradeMessage = 'The final grade is A. Grades have been sent'
        }
      else if(_grade >= 80 && _grade <= 89){
        tempGradeMessage = 'The final grade is B. Grades have been sent'
        }
      else if(_grade >= 70 && _grade <= 79){
        tempGradeMessage = 'The final grade is C. Grades have been sent'
        }
      else if(_grade >= 60 && _grade <= 69){
        tempGradeMessage = 'The final grade is D. Grades have been sent'
        }
      else if(_grade <= 59){
        tempGradeMessage = 'The final grade is F. Grades have been sent'
        }
      this.setState({gradeMessage:tempGradeMessage})
      this.setState({invalidWeightMessage:''})
      console.log(totalWeight)
    }
    else{
      let message = "* Weights must add up to 100";
      this.setState({invalidWeightMessage:message})
      this.setState({gradeMessage:''})
    }
  }


  render() {
    return  (
      <div>
        <Child asgnItems={this.state.asgnItems}></Child>
        <br/><br/><br/><br/>
        <div className='send'>
        <input type='button' onClick={this.send} value='Send grades to Student Records'></input>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {this.state.invalidWeightMessage}
        </div>

        <p className='gradeSent'>{this.state.gradeMessage}</p>
        
        <br/><br/><br/><br/>

        <table>
          <tbody>
        <tr>
          <td></td>
          <td className='inputCriteria'>Assignment</td>
          <td className='inputCriteria'>Weight</td>
          <td className='inputCriteria'>Grade out of 100</td>
        </tr>      
        <tr>
          <td className="add"><input type='button' onClick={this.addAssignment} value="Add New Assignment"></input></td>
          <td className="item"><input size = '7' value={this.state.assignment} 
          onChange={this.setAssignment} /></td>
          <td className="item"><input size = '7' value={this.state.weight} 
          onChange={this.setWeight} /></td> 
          <td className="item"><input size = '7' value={this.state.grade} 
          onChange={this.setGrade} /></td>
        </tr>
        <tr>
        <td></td>
        <td className="warning">{this.validator.message('assignment', this.state.assignment, 'required')}
        {this.validator.message('weight', this.state.weight, 'required|numeric')}
        {this.validator.message('grade', this.state.grade, 'required|numeric')}</td>
        </tr>
        </tbody>
        </table>
               
        
        
      </div>
    ); 
  }
}
export default App;