export class Loader {
  constructor(appWrapper) {
    this.appWrapper = appWrapper;
    this.loader = document.getElementById('loader');
  }

  toggleLoaderDisplay() {
    this.appWrapper.classList.toggle('load');
    this.loader.classList.toggle('show');
  }
}
