export class ButtonCount extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return e("button", { onClick: () => alert("clicked") }, "Times Clicked: 0");
  }
}
