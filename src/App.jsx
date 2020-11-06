import React from "react";
import {ActionButton} from "./components/action-btn";
import "./assets/reset.css";
import "./assets/style.css";
import "./assets/mobile.css";

  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        result: 0,               //計算結果
        formula:["0","+"],       //計算式、最初にイコールを入力された時のエラー対策
        disabled:true,           //クリック可能の有無
        input:[],                //現在出力されている値
      };
      this.handleClick = this.handleClick.bind(this)
    }

    handleClick(value) {
      const {formula, input} = this.state;
      let Formula = formula.slice();          //計算式の配列取得
      let nowInput = input.slice();              //現在の入力されている値を取得

      if (!(value === "=")) {                    //イコール以外
        let changeNum = Number(value)            //入力された文字列を数値に変更

        if (!(isNaN(changeNum))) {               //数値化できたか判定
          nowInput.push(value)
          this.setState({
            input: nowInput,                     //入力された値を更新する
            disabled:false,                      //演算子を入力できるようにする
          })
        } else{                                  //『+、-、*、/、%』だった場合
          
          nowInput.splice(0)                     //現在入力されている値を空っぽにする
          this.setState({
            input: nowInput,
            disabled:true,                       //演算子をクリック可能にする
          })
        }
        Formula.push(value)                   //式の後ろに値を追加して式を構築
        this.setState({
          formula: Formula,                   //式配列に値を追加して保存
        })

      } else{                                    //イコールだったら
        let stringFormula = formula.join("")     //計算式の配列を文字列かして並べる
        let answer = eval(stringFormula)         //文字列化した計算式を計算する、答えは数値化される
        let stringAnswer = String(answer)        //合計値を文字列化へ
        Formula.splice(0)                     //計算式を空っぽにして
        Formula.push(stringAnswer)            //合計値を計算式の先頭に配置して続きの計算に備える
        nowInput.splice(0)                       //入力されている値をクリア
        nowInput.push(stringAnswer)              //入力されている値を合計値に入れ替える
        this.setState({
          formula: Formula,
          result: answer,                        //合計を保存する
          input: nowInput,                       //出力されている値を更新
        })
      }
    }

    // AC
    handleReset(){
      this.setState({
        result: 0,
        formula:[],
        disabled: true,
        input: [],
      })
    }

    render() {
      return (
        <div className="body-content">
          <div className="title">
            <div className="title-field">
              Calculator
            </div>
          </div>
          <div className="content">
            <div className="result">
              <div className="result-field">
                {this.state.input}
              </div>
            </div>
            <div className="btn-content">

              <div className="btn-group">
                <button  className="btn ac"  
                  onClick={() => this.handleReset("AC")}
                >
                  {"AC"}
                </button>
                <ActionButton 
                  handleClick={this.handleClick}
                  value={"%"} 
                  btnValue={"%"}
                  style={"btn string"} 
                  disabled={this.state.disabled}
                />
                <ActionButton 
                  handleClick={this.handleClick}
                  value={"*"} 
                  btnValue={"x"}
                  style={"btn string"} 
                  disabled={this.state.disabled}
                />
              </div>

              <div className="btn-group">
                <ActionButton 
                  handleClick={this.handleClick}
                  value={"7"} 
                  btnValue={"7"}
                  style={"btn number"} 
                  disabled={false}
                />
                <ActionButton 
                  handleClick={this.handleClick}
                  value={"8"} 
                  btnValue={"8"}
                  style={"btn number"} 
                  disabled={false}
                />
                <ActionButton 
                  handleClick={this.handleClick}
                  value={"9"} 
                  btnValue={"9"}
                  style={"btn number"} 
                  disabled={false}
                />
                <ActionButton 
                  handleClick={this.handleClick}
                  value={"/"} 
                  btnValue={"÷"}
                  style={"btn string"} 
                  disabled={this.state.disabled}
                />
              </div>

              <div className="btn-group">
                <ActionButton 
                  handleClick={this.handleClick}
                  value={"4"} 
                  btnValue={"4"}
                  style={"btn number"} 
                  disabled={false}
                />
                <ActionButton 
                  handleClick={this.handleClick}
                  value={"5"} 
                  btnValue={"5"}
                  style={"btn number"} 
                  disabled={false}
                />
                <ActionButton 
                  handleClick={this.handleClick}
                  value={"6"} 
                  btnValue={"6"}
                  style={"btn number"} 
                  disabled={false}
                />
                <ActionButton 
                  handleClick={this.handleClick}
                  value={"-"}
                  btnValue={"-"}
                  style={"btn string"} 
                  disabled={this.state.disabled}
                />
              </div>

              <div className="btn-group">
                <ActionButton 
                  handleClick={this.handleClick}
                  value={"1"} 
                  btnValue={"1"}
                  style={"btn number"} 
                  disabled={false}
                />
                <ActionButton 
                  handleClick={this.handleClick}
                  value={"2"} 
                  btnValue={"2"}
                  style={"btn number"} 
                  disabled={false}
                />
                <ActionButton 
                  handleClick={this.handleClick}
                  value={"3"} 
                  btnValue={"3"}
                  style={"btn number"} 
                  disabled={false}
                />
                <ActionButton 
                  handleClick={this.handleClick}
                  value={"+"} 
                  btnValue={"+"}
                  style={"btn string"} 
                  disabled={this.state.disabled}
                />
              </div>
              <div className="btn-group">
                <ActionButton 
                  handleClick={this.handleClick}
                  value={"0"} 
                  btnValue={"0"}
                  style={"btn number"} 
                  disabled={false}
                />
                <button className="btn space" disabled={true}></button>
                <button className="btn space" disabled={true}></button>
                <button  className="btn string"  
                  onClick={() => this.handleClick("=")}
                  disabled={this.state.disabled}
                >{"="}
                </button>
              </div>
            </div>
          </div>
          {/* <div className="other-content">
            <div className="status">合計 {this.state.result}</div>
            <div className="formula">計算式 {this.state.formula}</div>
          </div> */}
        </div>
      );
    }
  }
export default App;
// プラマイチェンジボタン
{/* <button  className="btn string"  
  onClick={() => this.handleClick("*-1")}
  // disabled={this.state.disabled}
  >{"+/-"}
</button> */}
