import React, { Component } from 'react';
import './App.css';

class Child extends Component {
    constructor(props) {
        super(props)
    }
 
    deleteAssignment(index, event) {       
        let tempAssignList = this.props.asgnItems;
        tempAssignList.splice(index, 1);
        this.setState({"asgnItems":tempAssignList});
        event.preventDefault();
      }
 
    render() {
      return  (
          <div>
            <table>
                <tbody>
                    <tr>
                        <td></td> 
                        <td className='headerAssignment'>Assignment</td>
                        <td className='headerItem'>Weight</td>
                        <td className='headerItem'>Grade out of 100</td>  
                    </tr>
                </tbody>
            </table>        
            <table>
                <tbody>
                    {this.props.asgnItems.map((asgn, index) => (
                    <tr key={index + " " + asgn.grade}>               
                        <td className="delete"><input type='button' onClick={(e) => this.deleteAssignment(index, e)} value='delete'></input></td> 
                        <td className="headitemassignment">{asgn.assignment}</td> 
                        <td className="headitem">{asgn.weight}</td> 
                        <td className="headitem">{asgn.grade}</td>
                    </tr>
                ))}
                </tbody>            
            </table> 
          </div>
      ); 
    }
  }
  export default Child;