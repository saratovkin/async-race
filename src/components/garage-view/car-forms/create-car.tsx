import React, { FormEvent } from 'react';

interface Props {
  newName: string,
  newColor: string,
  onCarAdded: (name: string, color: string) => void,
  onSpecsInput: (type: string, key: string, value: string) => void,
}

interface State {
}

class CreateCar extends React.Component<Props, State> {

  onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const name = this.props.newName;
    const color = this.props.newColor;
    this.props.onCarAdded(name, color);
    this.props.onSpecsInput('new', 'Name', '');
    this.props.onSpecsInput('new', 'Color', '#000000');
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
          value={this.props.newName}
          onChange={(e) => this.props.onSpecsInput('new', 'Name', e.target.value)}
        />
        <input
          type="color"
          value={this.props.newColor}
          onChange={(e) => this.props.onSpecsInput('new', 'Color', e.target.value)}
        />
        <button>Create</button>
      </form>
    );
  }
}

export default CreateCar;
