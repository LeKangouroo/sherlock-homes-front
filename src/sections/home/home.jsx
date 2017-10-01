import events from 'core/events';
import ExampleComponent from 'components/example-component/example-component.jsx';
import React from 'react';

class HomeSection extends React.Component
{
  constructor(props)
  {
    super(props);
    this.name = 'HomeSection';
  }
  componentDidMount()
  {
    events.notifyObservers('section:loaded', this);
  }
  componentWillUnmount()
  {
    events.notifyObservers('section:destroyed', this);
  }
  getName()
  {
    return this.name;
  }
  render()
  {
    return (
      <section className="s-home">
        <h1>Home section</h1>
        <ExampleComponent/>
      </section>
    );
  }
}

export default HomeSection;
