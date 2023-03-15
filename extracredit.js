const e = React.createElement;

class ButtonCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return e(
      "button",
      { onClick: () => this.setState({ count: this.state.count + 1 }) },
      `Times Clicked: ${this.state.count}`
    );
  }
}

const domContainer = document.querySelector("#count_button_container");
const root = ReactDOM.createRoot(domContainer);
root.render(e(ButtonCount));
