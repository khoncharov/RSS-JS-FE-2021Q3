import './style.scss';
import rssLogo from './assets/svg/rs_school_js.svg';

const appContainer = document.querySelector('#app') as HTMLElement;
appContainer.textContent = 'Template';
const img = document.createElement('img');
img.src = rssLogo;
appContainer.appendChild(img);
