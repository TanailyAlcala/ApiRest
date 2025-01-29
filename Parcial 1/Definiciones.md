## Definiciones 

# ¿Qué es una API?
Una **API (Application Programming Interface)** es un conjunto de reglas, definiciones y protocolos que permiten que diferentes sistemas o aplicaciones se comuniquen entre sí de manera estructurada. En otras palabras, una API define cómo dos aplicaciones pueden interactuar e intercambiar información, sin necesidad de que el usuario final vea o entienda el funcionamiento interno.

Las APIs pueden usarse para diferentes propósitos, como:
- **Interacción entre aplicaciones web y móviles:** Una aplicación móvil puede usar una API para obtener datos desde un servidor.
- **Integraciones con servicios externos:** Plataformas como PayPal, Google Maps o redes sociales ofrecen APIs para que otras aplicaciones utilicen sus servicios.
- **Automatización de procesos:** Empresas utilizan APIs para conectar diferentes sistemas internos y optimizar tareas.

# ¿Qué es Rest?
**REST (Representational State Transfer)** es un conjunto de principios y restricciones de arquitectura para el desarrollo de servicios web, se basa en el uso del protocolo HTTP para permitir la comunicación entre sistemas distribuidos.

Los principales principios de REST incluyen:
- **Cliente-Servidor:** Se establece una separación entre el cliente (quien solicita información) y el servidor (quien la proporciona).
- **Sin estado (Stateless):** Cada solicitud del cliente al servidor debe contener toda la información necesaria, sin depender de solicitudes previas.
- **Caché:** Las respuestas pueden ser almacenadas en caché para mejorar la eficiencia.
- **Interfaz uniforme:** Todos los recursos son accedidos de manera consistente a través de URLs únicas.
- **Uso de HTTP y sus métodos estándar:**
- -GET → Obtener datos (Ej: recuperar una lista de usuarios).
- -POST → Crear nuevos datos (Ej: registrar un nuevo usuario).
- -PUT → Modificar datos existentes (Ej: actualizar la información de un usuario).
- -DELETE → Eliminar datos (Ej: borrar un usuario).

# ¿A qué se refiere el término RESTful?
El término **RESTful** se usa para describir APIs o servicios web que cumplen correctamente con los principios y restricciones de REST. En otras palabras, una API RESTful es aquella que está diseñada siguiendo la arquitectura REST, garantizando una comunicación eficiente y estructurada entre sistemas.

Para que una API sea considerada RESTful, debe cumplir con los siguientes criterios:

- Utilizar métodos HTTP estándar (GET, POST, PUT, DELETE, etc.).
- Identificar los recursos mediante URLs bien definidas.
- Mantener la comunicación sin estado (stateless).
- Utilizar formatos ligeros y compatibles como JSON o XML para la transmisión de datos.

El uso de RESTful es común en aplicaciones modernas porque permite desarrollar APIs escalables, eficientes y fáciles de integrar con otros sistemas.