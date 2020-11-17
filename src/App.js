import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

function Display(props){
  return(<p class ="display">{props.display}</p>);
}
function Button(props){
  return(<button onClick = {props.clicked}>{props.text}</button>);
}
const Calculate = {
  "+": (current,news) => current + news,
  "-": (current,news) => current - news,
  "*": (current,news) => current*news,
  "÷": (current,news) => current/news,
  "=": (current,news) => news,
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      currentOperand: "",
      formeOperand: "",
      resultOperand:"",
      memoryOperand:[],
      value: 0,
      operator: "",
      separator: null,
      p: 0
    };
    this.addnumber = this.addnumber.bind(this);
    this.Operation = this.Operation.bind(this);
    this.delnumber = this.delnumber.bind(this);
    this.addseparator = this.addseparator.bind(this);
  }
  addnumber(numero){
    this.setState({
      currentOperand: this.state.currentOperand + numero
    }
    ); 
  }
  addseparator(sep){
    if (!this.state.separator){
      this.setState({
        currentOperand: this.state.currentOperand + sep,
        separator: "1"
      }
      ); 

    }
  }
  delnumber(){
    let str = this.state.currentOperand;
    if (str.slice(-1) == "." || ","){
      this.setState({
        separator: null
      });
    }
    str = str.slice(0, -1);
    this.setState({
      currentOperand: str
    });


  }
  AC_Clean(){
    this.setState({
      currentOperand: "",
      separator: null
    });

  }
  Operation(nextOp){
    const new_value =  parseFloat(this.state.currentOperand)
    const {currentOperand, formeOperand, value, operator} = this.state;
    if (value == 0){
      this.setState({
      value: new_value,
      formeOperand: currentOperand,
      currentOperand: "",
      separator: operator
      })
    }
    else if (operator){
      const currentvalue = value || 0;
      if(currentOperand){
        const result = Calculate[operator](currentvalue,new_value);
        this.setState({
          value: result,
          formeOperand: formeOperand + operator + currentOperand,
          currentOperand: "",
          separator: null,
          resultOperand: String(result)
          
        })
      }
      else{
        const new_value = parseFloat(this.state.resultOperand);
        const result = Calculate[operator](currentvalue,new_value);
        this.setState({
          value: result,
          formeOperand: formeOperand + operator + currentOperand,
          currentOperand: "",
          separator: null,
          resultOperand: String(result)
          
        })

      }  
    }
    this.setState({
      operator: nextOp
    })      
 }
 Pushmemory(){
    if(this.state.currentOperand){
      const ms = this.state.currentOperand;
      let list = this.state.memoryOperand;
      if(!list[0]){
        list[this.state.p] = ms
        this.setState({
          memoryOperand: list,
          currentOperand:""
        })
      }
      else{
        list[this.state.p + 1] = ms;
        this.setState({
          memoryOperand: list,
          p: this.state.p + 1,
          currentOperand:""
        })

      }
   }  
 }
 Addmemory(){
  if(this.state.currentOperand){
    let list = this.state.memoryOperand;
    if(!list[0]){
      list[this.state.p] = this.state.currentOperand;
      this.setState({
        memoryOperand: list,
      })
    }
    else{
      let str = parseFloat(this.state.memoryOperand.slice(-1)) + parseFloat(this.state.currentOperand);
      str = String(str);
      list[this.state.p] = str;
      this.setState({
        memoryOperand: list
        })
    }
  }  
}
 Clearmemory(){
  this.setState({
    memoryOperand: [""],
    p: 0
    })

  }

 Popmemory(){
  if(this.state.memoryOperand[0]){
    if(this.statep == 0){
      this.setState({
        currentOperand: this.state.memoryOperand.pop(),
    })
  }
    else{
      this.setState({
        currentOperand: this.state.memoryOperand.pop(),
        p: this.state.p - 1
    })
    }
  }
 }

  render(){
    return (
      
      <div className="App">
        <div className="Memory-display">
          <Display display = {String(this.state.memoryOperand.reverse())}/> 
        </div>
        <div className="Result-display">
          <Display display = {this.state.resultOperand}/>
        </div>
        <div className="former-display"> 
          <Display display =  {this.state.formeOperand}/>
        </div>
        <div className="current-display"> 
          <Display display = {this.state.currentOperand}/>
        </div>
        <div className="body">
          <div className="keyboardm">
              
              <Button text = "MC" clicked = {() =>this.Clearmemory()}/>
              <Button text = "MR" clicked = {() =>this.Popmemory()}/>
              <Button text = "M+" clicked = {() =>this.Addmemory()}/>
              <Button text = "MS" clicked = {() =>this.Pushmemory()}/>
            </div> 
          <div className="keyboardop">
              <Button text = "." clicked = {() => this.addseparator(".")}/> 
              <Button text = "," clicked = {() => this.addseparator(",")}/> 
              <Button text = "+" clicked = {() =>this.Operation("+")}/> 
              <Button text = "-" clicked = {() =>this.Operation("-")}/> 
              <Button text = "÷" clicked = {() =>this.Operation("÷")}/> 
              <Button text = "*" clicked = {() =>this.Operation("*")}/> 
              <Button text = "=" clicked = {() =>this.Operation("=")}/>
              
            </div>
            <div className="keyboard">
              <Button text = "del" clicked = {() =>this.delnumber()}/>
              <Button text = "AC" clicked = {() =>this.AC_Clean()}/>
              <Button text = "0" clicked = {() => this.addnumber("0")}/> 
              <Button text = "1" clicked = {() => this.addnumber("1")}/> 
              <Button text = "2" clicked = {() => this.addnumber("2")}/> 
              <Button text = "3" clicked = {() => this.addnumber("3")}/> 
              <Button text = "4" clicked = {() => this.addnumber("4")}/> 
              <Button text = "5" clicked = {() => this.addnumber("5")}/> 
              <Button text = "6" clicked = {() => this.addnumber("6")}/> 
              <Button text = "7" clicked = {() => this.addnumber("7")}/> 
              <Button text = "8" clicked = {() => this.addnumber("8")}/> 
              <Button text = "9" clicked = {() => this.addnumber("9")}/>
            </div> 
          </div> 
      </div>
   );
  }
}
  
export default App;
