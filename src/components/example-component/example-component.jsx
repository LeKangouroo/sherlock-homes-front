import React from 'react';

class ExampleComponent extends React.Component
{
  constructor(props)
  {
    super(props);
    this.intervalId = null;
    this.state = {
      datetime: new Date()
    };
  }
  componentDidMount()
  {
    this.intervalId = setInterval(() => this.setState({ datetime: new Date() }), 1000);
  }
  componentWillUnmount()
  {
    clearInterval(this.intervalId);
  }
  getFormattedHour(datetime)
  {
    const h = datetime.getHours();
    const m = datetime.getMinutes();
    const s = datetime.getSeconds();

    return `${ h > 10 ? h : '0' + h }:${ m > 10 ? m : '0' + m }:${ s > 10 ? s : '0' + s }`;
  }
  render()
  {
    return (
      <div className="component-example">
        {this.getFormattedHour(this.state.datetime)}
      </div>
    );
  }
}

export default ExampleComponent;
