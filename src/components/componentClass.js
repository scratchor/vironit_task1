
import EventEmitter from '../core/eventEmitter.js'

Component.prototype = Object.create(EventEmitter.prototype);
Component.prototype.constructor = Component;

// class Component
export default function Component () {
  EventEmitter.call(this);

  this.element = this.updateParams();
};

Component.prototype.updateParams = function (newParams) {
  Object.assign(this.params, newParams)
  return this.makeElem()
};

Component.prototype.makeElem = function () {
  let elem = document.getElementById(`${this.params.id}`)
  if (!this.params.element) {
    elem.outerHTML = ''
    return
  };
  if (elem) {
    elem.outerHTML = ''
  }
  elem = document.createElement(this.params.element)
  if (this.params.elClass) {
    if (Array.isArray(this.params.elClass)) {
      this.params.elClass.forEach(e => elem.classList.add(e))
    } else {
      elem.classList.add(this.params.elClass)
    }
  }
  if (this.params.id) {
    elem.setAttribute('id', `${this.params.id}`)
  }
  if (this.params.textContent) {
    elem.textContent = `${this.params.textContent}`
  }
  if (this.params.backgroundColor) {
    elem.style.backgroundColor = `${this.params.backgroundColor}`
  }
  this.render(elem)
  return elem;
};

Component.prototype.render = function (elem) {
  const parent = this.params.parent
  parent.appendChild(elem)
};
