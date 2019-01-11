import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./store";
import { simpleAction } from './actions/simpleAction';
import './App.css';

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

class Slot extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      status: '',
      show: false,
      items: {
        names:["", "","","","","","","",""],
        phones:["", "","","","","","","",""]
      } 
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({uname: event.target.value});
  }
  handleChangePhone(event) {
    this.setState({uphone: event.target.value});
  }
  handleSubmit(event) {
    let newitems = this.state.items;
    newitems.names[this.props.stime - 9] = event.target.value;
    this.setState({items: newitems});
    event.preventDefault();
  }

  showModal = () => {
    this.setState({ show: true });
  }
  hideModal = () => {
    this.setState({ show: false });
  }
  showTime = (t) => {
    if(t<=12) return t + ':00AM';
    else return (t-12) + ':00PM'
  }
  showName = () => {
    let newitems = this.state.items;
    let cname = newitems.names[this.props.stime - 9];
    if(cname!='') return cname;
    else return this.state.uname;
  }
  showPhone = () => {
    let newitems = this.state.items;
    let cphone = newitems.phones[this.props.stime - 9];
    if(cphone!='') return cphone;
    else return this.state.uphone;
  }
  render() {
    let btn_class = this.state.status != 'X' ? "slot" : "slotred";
    return (
      <div>
      <Modal show={this.state.show} handleClose={this.hideModal} >
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.showName()} name="uname" onChange={this.handleChange} />
          </label>       
          <br />
          <label>
            Phone:
            <input type="text" value={this.showPhone()} name="uphone" onChange={this.handleChangePhone} />
          </label>    
          <br />   
          <input type="submit" value="Set Appointment" />          
        </form>
      </Modal>
      <button className={btn_class} onClick={()=>{ this.showModal(); this.setState({status: 'X'})}}>
        {this.showTime(this.props.stime)}
      </button>
      </div>
    );
  }
}

class App extends Component {
  renderSlot(i) {
    return <Slot stime={i} />;
  }
  renderSlots(s, e) {
    for(let cnt=9;cnt<17;cnt++)
    this.renderSlot(cnt);
  }
  simpleAction = (event) => {
    this.props.simpleAction();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          My Appointment Scheduler
        </header>
        <div className="section"> 
        {this.renderSlot(9)}
        {this.renderSlot(10)}
        {this.renderSlot(11)}
        {this.renderSlot(12)}
        {this.renderSlot(13)}
        {this.renderSlot(14)}
        {this.renderSlot(15)}
        {this.renderSlot(16)}
        {this.renderSlot(17)}
        <br />
        <br />
        </div>
        <div>
        <button onClick={this.simpleAction}>Test redux action</button>
        <br/>
        <pre>{JSON.stringify(this.props)}</pre>
        </div>
      </div>

    );
  }
}

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        {children}
        <button
          onClick={handleClose}
        >
          Close
        </button>
      </section>
    </div>
  );
};

const mapStateToProps = state => ({
  ...state
 })

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
//export default App;
