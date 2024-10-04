const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

const BASE_URL = "http://localhost:3001"; // Ajusta esto según tu configuración

async function waitAndRetry(action, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            await action();
            return;
        } catch (error) {
            console.log(`Intento ${attempt} fallido: ${error.message}`);
            if (attempt === maxAttempts) throw error;
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
}

async function runTest() {
    let driver;
    try {
        driver = await new Builder().forBrowser('chrome').build();
        console.log("Navegador iniciado");

        await waitAndRetry(async () => {
            await driver.get(BASE_URL);
            let title = await driver.getTitle();
            console.log(`Título de la página: ${title}`);
            assert(title.includes('VDAE'), "El título de la página principal no contiene 'VDAE'");
        });

        console.log("Navegación a la página principal completada");

        await waitAndRetry(async () => {
            await driver.get(`${BASE_URL}/registro`);
            await driver.findElement(By.id('nombre')).sendKeys('Usuario');
            await driver.findElement(By.id('apellido')).sendKeys('Prueba');
            await driver.findElement(By.id('correoElectronico')).sendKeys('usuario.prueba@example.com');
            await driver.findElement(By.id('contraseña')).sendKeys('contraseña123');
            await driver.findElement(By.css('button[type="submit"]')).click();
        });

        console.log("Formulario de registro completado");

        await driver.wait(until.urlContains('registro-exitoso'), 10000);
        console.log("Registro completado con éxito");

        console.log("Todas las pruebas pasaron exitosamente.");

    } catch (error) {
        console.error('Error en la prueba:', error);
    } finally {
        if (driver) {
            await driver.quit();
            console.log("Navegador cerrado");
        }
    }
}

runTest();
