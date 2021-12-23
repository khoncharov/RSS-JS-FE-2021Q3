import './style.scss';
import { Application } from './ts/application/app';

function bootstrap(): void {
  const app = new Application();
  app.init();
}

bootstrap();
