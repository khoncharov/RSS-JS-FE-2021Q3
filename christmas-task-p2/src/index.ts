import './style.scss';
import { Application } from './ts/application/app';
import { SELF_CHECK } from './ts/application/self-check';

function bootstrap(): void {
  const app = new Application();
  app.init();
}

console.log(SELF_CHECK);

bootstrap();
