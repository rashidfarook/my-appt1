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
      items: {} 
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    console.log('Appointment submitted ...')
    console.log('Name: ' + this.state.value);
    console.log('Phone: ' + this.state.phone);
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

  render() {
    return (
      <div>
      <Modal show={this.state.show} handleClose={this.hideModal} >
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>       
          <input type="submit" value="Set Appointment" />
        </form>
      <pre>{JSON.stringify(this.props)}</pre>
      </Modal>
      <button className="slot" onClick={()=>{ this.showModal(); this.setState({status: 'X'})}}>
        {(this.state.status === 'X') ? this.state.status : this.showTime(this.props.status)}
      </button>
      </div>
    );
  }
}

class App extends Component {
  renderSlot(i) {
    return <Slot status={i} />;
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
