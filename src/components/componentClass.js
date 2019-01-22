
// class Component
export default function Component (elClass, id, parentId, textContent, backColor) {
  this.params = {
    element: 'div',
    elClass: elClass,
    previousClass: this.params.elClass,
    id: id,
    parent: document.getElementById(`${parentId}`),
    textContent: textContent,
    backgroundColor: backColor
  }
}

Component.prototype.updateParams = function (newParams) {
  Object.assign(this.params, newParams)
  this.makeElem()
}

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
}

Component.prototype.render = function (elem) {
  const parent = this.params.parent
  parent.appendChild(elem)
}
