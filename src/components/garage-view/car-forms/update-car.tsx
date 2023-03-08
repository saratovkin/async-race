import './car-forms.css';
import React, { FormEvent } from 'react';

interface Props {
  currentName: string,
  currentColor: string,
  onCarUpdated: (name: string, color: string) => void,
  onSpecsInput: (type: string, key: string, value: string) => void,
}

interface State {
}

class UpdateCar extends React.Component<Props, State> {

  onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const name = this.props.currentName;
    const color = this.props.currentColor;
    this.props.onCarUpdated(name, color);
    this.props.onSpecsInput('current', 'Name', '');
    this.props.onSpecsInput('current', 'Color', '#000000');
  };

  render() {
    return (
      <form
        className="car-form"
        onSubmit={(e) => this.onSubmit(e)}
      >
        <input
          type="text"
          placeholder="Car Model"
          value={this.props.currentName}
          onChange={(e) => this.props.onSpecsInput('current', 'Name', e.target.value)}
        />
        <input
          type="color"
          value={this.props.currentColor}
          onChange={(e) => this.props.onSpecsInput('current', 'Color', e.target.value)}
        />
        <button>Update</button>
      </form>
    );
  }
}

export default UpdateCar;
