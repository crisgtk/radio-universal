# Guía de Configuración de Streaming: Listen2MyRadio

Esta guía explica paso a paso cómo configurar la transmisión de radio por streaming utilizando el servicio de **Listen2MyRadio**, la obtención del flujo de audio (Stream URL) y su integración en la plataforma web de **Radio Universal de Lomas Coloradas**.

---

## Paso 1: Creación de Cuenta en Listen2MyRadio

1. Ingrese a [Listen2MyRadio.com](https://www.listen2myradio.com/) y haga clic en **"Register"** o **"Free Sign Up"**.
2. Complete el formulario con su correo electrónico, nombre y contraseña.
3. Inicie sesión en la plataforma y vaya al panel de control de su servidor de radio (**Radio Control Panel**).

---

## Paso 2: Configuración del Servidor de Radio (Shoutcast / Icecast)

1. En el panel principal de Listen2MyRadio, seleccione la opción **"Turn ON / Install Radio"** para activar su servidor.
2. Configure las opciones básicas:
   - **Radio Name:** Radio Universal Lomas Coloradas
   - **Server Type:** Shoutcast v2 o Icecast v2 (Recomendado: Shoutcast para máxima compatibilidad con reproductores HTML5).
   - **Admin Password:** Defina una contraseña segura para administrar la radio.
   - **Broadcasting Password:** Defina la contraseña que utilizará el software locutor (Mixxx, BUTT, OBS).
   - **Bitrate:** Seleccione el bitrate permitido (ej. 128 kbps MP3 o 64 kbps AAC+).
3. Guarde los cambios y encienda el servidor haciendo clic en **"Turn ON"**.

---

## Paso 3: Obtención de los Datos de Transmisión

Una vez que el servidor esté **ONLINE**, copie los siguientes datos clave de su panel:
- **Server IP / Host:** (ejemplo: `stream.listen2myradio.com` o `198.27.xx.xx`)
- **Port (Puerto):** (ejemplo: `8000` o `12345`)
- **Stream Mount Point:** (para Icecast, ej. `/stream` o `/live`)
- **Stream URL directo:** (ejemplo: `http://stream.listen2myradio.com:8000/stream` o `https://uk1.internet-radio.com:8000/live`)

> **Importante para HTML5 y Navegadores Modernos:**
> Los navegadores modernos (Chrome, Safari, Edge) exigen que las fuentes de audio cargadas en páginas HTTPS utilicen también el protocolo **HTTPS**. Asegúrese de activar la opción **SSL Stream / HTTPS Proxy** disponible en el panel de Listen2MyRadio para obtener un enlace `https://...`.

---

## Paso 4: Configuración del Software Emisor en la Radio / Estudio

En la computadora del estudio o del locutor (usando software como **BUTT (Broadcast Using This Tool)**, **Mixxx**, **OBS Studio** o **RadioBOSS**):

### Configuración en BUTT:
1. Abra BUTT y vaya a **Settings -> Server Settings -> Add**.
2. **Name:** Radio Universal Lomas Coloradas
3. **Type:** ShoutCast o IceCast (según lo elegido en el Paso 2).
4. **Address:** Ingrese la IP o Host de Listen2MyRadio.
5. **Port:** Ingrese el puerto entregado por Listen2MyRadio.
6. **Password:** Ingrese su **Broadcasting Password**.
7. **User:** `source` (si utiliza Icecast) o déjelo en blanco si utiliza Shoutcast.
8. En la pestaña **Audio Settings**, seleccione su micrófono / consola de audio física y ajuste el formato a **MP3 128 kbps** o **AAC+ 64 kbps**.
9. Haga clic en **Play (Connect)** en BUTT. Si la conexión es exitosa, el estado cambiará a **"Connected"** y estará emitiendo en vivo.

---

## Paso 5: Conexión con el Sitio Web y Panel Admin

Para que el reproductor web de la radio reciba la señal:

1. Inicie sesión en el **Panel de Administración** de la web de la radio.
2. Vaya a la sección **"Configuración de Transmisión Web"**.
3. Seleccione Proveedor: **Listen2MyRadio**.
4. Ingrese la **URL de Streaming HTTPS** obtenida en el Paso 3.
5. Cambie el estado del aire a **"EN VIVO"** y guarde los cambios.
6. El reproductor flotante en la web comenzará a emitir inmediatamente la señal en tiempo real para todos los oyentes.
