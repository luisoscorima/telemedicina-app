## 📄 **README – Sistema de Telemedicina**

*(Copia todo esto a tu archivo `README.md` en el repositorio o entrégalo como documento)*

---

# Sistema de Telemedicina – Práctica Calificada N°3

**Autor:** Luis Gustavo Oscorima Palomino
**Curso:** Diseño y Arquitectura de Software
**Fecha:** 04/07/2025

---

## 🚀 Descripción General

Sistema web que permite la gestión de consultas médicas virtuales, con funcionalidades de administración de usuarios (paciente, médico, admin), agenda de citas, historial médico, notificaciones simuladas y una pantalla de videollamada (simulada).

---

## 🔧 **Instrucciones para Probar**

1. **Instala dependencias**

   * En backend:

     ```bash
     cd backend
     npm install
     npm run start:dev
     ```
   * En frontend:

     ```bash
     cd frontend
     npm install
     npm run dev
     ```
2. **Crea usuarios de prueba** (o usa los siguientes demo si existen):

   * **Admin:** [admin1@demo.com](mailto:admin1@demo.com) / 123456
   * **Doctor:** [doctor1@demo.com](mailto:doctor1@demo.com) / 123456
   * **Paciente:** [paciente1@demo.com](mailto:paciente1@demo.com) / 123456
3. **Navega por el sistema** desde el navegador (usualmente [http://localhost:5173](http://localhost:5173)).
4. **Funcionalidades:**

   * Admin: gestión de usuarios, ver todas las citas, editar historiales.
   * Doctor: ver citas, confirmar/cancelar, registrar diagnósticos, ver historiales de sus pacientes.
   * Paciente: agendar citas, cancelar, ver historial, simular videollamada.
   * Notificaciones: mensajes/alertas en pantalla simulan el envío de emails/SMS.

---

## 🖼️ **Diagrama de Arquitectura**

```
┌─────────────────────────────┐
│     UI Web ReactJS          │
│ (Pantallas para cada rol)   │
└─────────────┬───────────────┘
              │
         [API REST]
              │
┌─────────────▼───────────────┐
│     Backend NestJS          │
│ ┌────────────┬────────────┐ │
│ │Usuarios    │ Citas      │ │
│ │Historial   │ Notifs     │ │
│ └────────────┴────────────┘ │
└─────────────┬───────────────┘
              │
      [TypeORM/Postgres]
              │
┌─────────────▼───────────────┐
│   Base de Datos Segura      │
└─────────────────────────────┘
```

---

## ⚡ **Tácticas, Patrones y Antipatrones**

* **Patrones:**

  * MVC (NestJS), Repository (TypeORM), Gateway (API)
* **Tácticas:**

  * JWT, modularidad, simulación de redundancia, control de roles.
* **Antipatrones evitados:**

  * Big Ball of Mud (subsistemas claros), God Class (código modular).

---

## 💡 **Subsistemas**

* **Usuarios:** Registro, login, gestión de roles.
* **Citas:** Reservar, listar, confirmar/cancelar.
* **Historial médico:** CRUD de diagnósticos.
* **Consultas:** Videollamada (simulada).
* **Notificaciones:** Alertas y mensajes simulando emails/SMS.
* **Seguridad:** Autenticación, control de acceso.

---

## 📲 **Presentación Breve de Cada Pantalla**

### 1. **Pantalla de Login**

Permite a usuarios autenticarse según su rol: paciente, doctor o admin.
Acceso diferenciado a funcionalidades y vistas.

### 2. **Panel del Administrador**

* Acceso solo para rol **admin**.
* Gestiona (CRUD) usuarios (paciente, médico, admin).
* Visualiza todas las citas y puede ver/editar cualquier historial médico.

### 3. **Gestión de Usuarios (Admin)**

* Lista de todos los usuarios, con opciones de crear, editar y eliminar.
* Cambia roles, datos y controla accesos.

### 4. **Todas las Citas (Admin)**

* Visualiza todas las citas agendadas del sistema.
* Detalles de paciente, doctor, estado.

### 5. **CRUD Historiales Médicos (Admin)**

* Lista y edita todos los registros médicos agrupados por paciente y doctor.

### 6. **Panel del Doctor**

* Muestra resumen y opciones para ver sus citas, pacientes y registrar diagnósticos.

### 7. **Citas del Doctor**

* Lista solo las citas asignadas al doctor.
* Permite confirmar/cancelar y acceder a historial del paciente.

### 8. **Detalle de Paciente (Doctor/Admin)**

* Muestra datos y el historial médico de un paciente específico.
* Permite crear nuevos registros de diagnóstico.

### 9. **Panel del Paciente**

* Acceso a ver citas, agendar nuevas, revisar historial y acceder a la videollamada (si está habilitada).

### 10. **Mis Citas (Paciente)**

* Lista de citas agendadas, estado, datos del doctor y posibilidad de cancelar si está pendiente.

### 11. **Agendar Nueva Cita (Paciente)**

* Formulario para seleccionar motivo, fecha y médico.
* Simula envío de notificación por email al doctor.

### 12. **Historial Médico (Paciente)**

* Lista de diagnósticos registrados por los médicos.
* Solo accesible por el paciente logueado.

### 13. **Videollamada Simulada**

* Pantalla visual que simula una videollamada real.
* Permite finalizar la llamada, solo modo demostración.

---

## 🔐 **Notas sobre Seguridad**

* Acceso a rutas protegido por JWT y validación de roles.
* Se recomienda cifrado en base de datos para producción.
* Datos sensibles no expuestos en frontend.

---

## 📦 **Cómo extender / Consideraciones**

* El sistema es modular, puede integrarse con APIs reales para correo/videollamada (ejemplo: Nodemailer, Twilio, WebRTC).
* Arquitectura lista para escalar y agregar microservicios.

---

## 👥 **Usuarios Demo (opcional)**

| Rol      | Email                                           | Contraseña |
| -------- | ----------------------------------------------- | ---------- |
| Admin    | [admin1@demo.com](mailto:admin1@demo.com)       | 123456     |
| Doctor   | [doctor1@demo.com](mailto:doctor1@demo.com)     | 123456     |
| Paciente | [paciente1@demo.com](mailto:paciente1@demo.com) | 123456     |

*(Puedes crear desde el panel de admin si es necesario)*

---

## 📞 **Contacto**

¿Dudas? \[Tu email aquí]

---

¿Quieres agregar capturas de pantalla? Si necesitas un texto para explicación de *decisiones de diseño* o *cómo simular el correo/videollamada* (para justificar), dímelo y te lo hago listo también.
