import { App } from './app';

( async () => {

    await ServerApp();

})();

async function ServerApp() {

    const app = new App();
    await app.main();

}