import { carItem } from './car-item';

class Car {
  start(id: number, duration: number): void {
    carItem.setRaceMode(true, id);

    const car = document.querySelector(`#car${id}`) as HTMLDivElement;
    car.style.animationName = 'car-movement';
    car.style.animationFillMode = 'both';
    car.style.animationTimingFunction = 'linear';
    car.style.animationDuration = `${duration}s`;
    car.style.animationPlayState = 'running';
  }

  stop(id: number): void {
    const car = document.querySelector(`#car${id}`) as HTMLDivElement;
    car.style.animation = 'none';

    carItem.setRaceMode(false, id);
  }
}

export const raceCar = new Car();
