# Guía de Configuración de Streaming: Caster.fm

Esta guía detalla paso a paso el proceso de registro, configuración del servidor Shoutcast y vinculación de la transmisión por streaming en **Caster.fm** para la plataforma de **Radio Universal de Lomas Coloradas**.

---

## Paso 1: Registro en Caster.fm

1. Visite el sitio web oficial [Caster.fm](https://www.caster.fm/) y seleccione **"Free Signup"** o **"Get Started"**.
2. Complete el registro introduciendo el nombre del canal (ej. `radiouniversallomas`), correo electrónico y contraseña.
3. Inicie sesión para acceder a su **Dashboard** de Caster.fm.

---

## Paso 2: Configuración del Servidor Shoutcast en Caster.fm

1. En el Dashboard de Caster.fm, haga clic en el botón **"Start Server"** para encender su servidor Shoutcast temporal de transmisión.
2. Tome nota de las credenciales asignadas automáticamente por el servidor:
   - **Server Host / IP:** (ej. `shoutcast2.caster.fm` o `192.99.xx.xx`)
   - **Port Number:** (ej. `8000` o puerto asignado)
   - **Source Password:** (contraseña generada para el encoder/locutor)
   - **Bitrate máximo:** (generalmente 128 Kbps en plano gratuito o superior en plano Pro)
   - **Mount Point / Stream Path:** `/listen` o `/stream`

> **Nota sobre la sesión en Caster.fm:**
> En cuentas gratuitas de Caster.fm, el servidor requiere que inicies sesión en el dashboard y presiones "Start Server" antes de salir al aire. En planos Pro el servidor permanece encendido 24/7 sin interrupción.

---

## Paso 3: Configuración del Emisor de Audio (Mixxx, BUTT, OBS, SAM Broadcaster)

### Ejemplo de Configuración en Mixxx (Software Gratuito de DJ y Radio):
1. Inicie Mixxx y diríjase a **Opciones -> Preferencias -> Emisión en vivo (Live Broadcasting)**.
2. En la sección **Tipo de servidor**, seleccione **ShoutCast v1 / v2**.
3. Complete los campos con los datos proporcionados por Caster.fm:
   - **Host:** Ingrese el Server Host de Caster.fm.
   - **Puerto:** Ingrese el puerto asignado.
   - **Contraseña:** Ingrese la Source Password.
   - **Nombre de la emisora:** Radio Universal Lomas Coloradas
   - **Formato de audio:** MP3 (128 kbps) o AAC+.
4. Marque la casilla **"Habilitar emisión en vivo"** y presione **Aceptar**.
5. Mixxx mostrará una notificación verde confirmando que está emitiendo en directo.

---

## Paso 4: Obtención de la URL del Flujo de Audio (Direct Stream URL)

1. Para reproducir el flujo de Caster.fm directamente en el sitio web de Radio Universal sin redireccionar a reproductores externos:
   - En el Dashboard de Caster.fm, ubique la opción **HTML5 Player Code** o **Direct Stream Link**.
   - El formato del enlace HTTPS directo suele tener la forma:
     `https://shoutcast2.caster.fm:8000/listen` o la URL provista por el proxy SSL de Caster.fm.

---

## Paso 5: Registro en la Sección Admin de la Web

1. Diríjase al panel de administración en la web de Radio Universal (`/admin`).
2. Acceda a la pestaña **"Configuración de Transmisión Web"**.
3. Seleccione la opción de Proveedor: **Caster.fm**.
4. Ingrese la **URL de Streaming HTTPS** obtenida en Caster.fm.
5. (Opcional) Agregue la URL de respaldo si cuenta con un servidor secundario en Listen2MyRadio.
6. Guarde la configuración y verifique la salida de audio directamente desde el reproductor web.
