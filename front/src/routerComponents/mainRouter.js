import RouterConstructor from './routerConstructor'
import ButtonComponent from '../components/createButComponent'

MainRouter.prototype = Object.create(RouterConstructor.prototype)
MainRouter.prototype.constructor = MainRouter

// ingerited from RouterConstructor for creating main page
export default function MainRouter () {
  RouterConstructor.call(this)

  this.createBut = new ButtonComponent()
}
