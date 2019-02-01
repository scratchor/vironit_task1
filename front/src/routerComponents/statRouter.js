import RouterConstructor from './routerConstructor'
import ButtonComponent from '../components/createButComponent'
import AtmStatComponent from '../components/atmStatComponent'

StatRoute.prototype = Object.create(RouterConstructor.prototype)
StatRoute.prototype.constructor = StatRoute

// ingerited from RouterConstructor for creating statistic page
export default function StatRoute (id, counterNum, state) {
  RouterConstructor.call(this)

  this.createBut = new ButtonComponent()
  this.atm = new AtmStatComponent(id, counterNum, state)
}

StatRoute.prototype.updateParams = function (newParams) {
  Object.assign(this.params, newParams)
  return this.makeElem()
}
