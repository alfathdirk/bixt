import { LitElement, html } from 'lit-element';

export default class Bar extends LitElement {
  render () {
    return html`
      <div>
        <a href="/">Home</a>
        <a href="/foo">Foo</a>
        <a href="/bar">Bar</a>
      </div>
      <div>
        [bar]
      </div>
    `;
  }

  createRenderRoot () {
    return this;
  }
}
