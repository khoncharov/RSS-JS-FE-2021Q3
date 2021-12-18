import './style.scss';
import { Application } from './ts/application/app';

function bootstrap() {
  const app = new Application();
  app.init();
}

bootstrap();
