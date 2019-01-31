import RouterConstructor from './routerConstructor'
import ButtonComponent from '../components/createButComponent'

MainRouter.prototype = Object.create(RouterConstructor.prototype);
MainRouter.prototype.constructor = MainRouter;

export default function MainRouter () {
  RouterConstructor.call(this)

  this.createBut = new ButtonComponent()
}
