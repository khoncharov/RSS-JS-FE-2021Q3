import { carItem } from './car-item';

class Car {
  start(id: number, duration: number): void {
    carItem.setRaceMode(true, id);

    const car = document.querySelector(`#car${id}`) as HTMLDivElement;
    car.style.animationName = 'car-movement';
    car.style.animationFillMode = 'both';
    car.style.animationTimingFunction = 'linear';
    car.style.animationDuration = `${duration.toFixed(2)}s`;
    car.style.animationPlayState = 'running';
  }

  reset(id: number): void {
    const car = document.querySelector(`#car${id}`) as HTMLDivElement;
    car.style.animation = 'none';

    carItem.setRaceMode(false, id);
    const dashbord = car.querySelector('.dashboard') as HTMLDivElement;
    dashbord.classList.remove('check-engine');
  }

  stop(id: number): void {
    const car = document.querySelector(`#car${id}`) as HTMLDivElement;
    car.style.animationPlayState = 'paused';
    const dashbord = car.querySelector('.dashboard') as HTMLDivElement;
    dashbord.classList.add('check-engine');
  }
}

export const raceCar = new Car();
