import './style.scss';
import { Application } from './app/application/app';
import { SELF_CHECK } from './app/application/self-check';

function bootstrap(): void {
  const app = new Application();
  app.init();
}

console.log(SELF_CHECK);

bootstrap();
