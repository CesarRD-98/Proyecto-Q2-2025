# 📋 Sistema de Tickets - Backend (NestJS)

Este proyecto es una API RESTful construida con NestJS y TypeORM para manejar un sistema de tickets con autenticación por roles (`admin`, `technician`, `user`).

## 🚀 Tecnologías Usadas
- NestJS
- TypeORM
- MySQL
- JWT (JSON Web Tokens)
- Passport (estrategias `local` y `jwt`)
- Bcrypt (hash de contraseñas)

## ✅ Requisitos
- Node.js >= 18
- MySQL >= 5.7

## ⚙️ Instalación
```bash
npm install
```

### 📁 Configura `.env`
Crea un archivo `.env` y configura tus credenciales:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=tu_password
DB_NAME=tickets_db
JWT_SECRET=secret123
```

### 🗃️ Crear Base de Datos en MySQL
```sql
CREATE DATABASE tickets_db;
```

### 👤 Seeding Automático del Usuario Admin
Cuando inicies el proyecto por primera vez, si no existe el usuario `admin@gmail.com`, se creará automáticamente con:
- **Email:** `admin@gmail.com`
- **Contraseña:** `admin123`
- **Rol:** `admin`

## 🛠️ Ejecutar el Proyecto
```bash
npm run start:dev
```

---

## 🧪 Endpoints y Uso con Postman

### 🔐 Login
**POST** `/auth/login`
```json
{
  "email": "admin@gmail.com",
  "password": "admin123"
}
```
🔁 Token JWT en respuesta. Usar como:
```
Authorization: Bearer <token>
```

### 👤 Crear Usuario (admin)
**POST** `/users`
```json
{
  "name": "Tecnico Juan",
  "email": "tech@mail.com",
  "password": "tech123",
  "role": "technician"
}
```

### 🎫 Tickets
- **POST** `/tickets`: Crear ticket (user, technician, admin)
- **GET** `/tickets`: Listar (según permisos)
- **GET** `/tickets/:id`: Ver detalle
- **PUT** `/tickets/:id`: Actualizar estado/asignación (technician/admin)

### 📊 Reportes
**GET** `/reports?from=2025-01-01&to=2025-06-08` (solo technician o admin)
```json
{
  "total": 5,
  "finalizados": 2
}
```

---

## 🧑‍💻 Roles del Sistema
- `user`: Puede crear, ver y cancelar sus propios tickets.
- `technician`: Puede ver todos los tickets, asignar y cambiar estado, ver reportes.
- `admin`: Control total, incluyendo gestión de usuarios.

---

## 🗂 Estructura de Carpetas
```
src/
├── auth/         # Autenticación (JWT, local)
├── users/        # Usuarios y roles
├── tickets/      # CRUD de tickets
├── reports/      # Reportes por fechas
├── common/       # Decoradores, guards
└── main.ts       # Punto de entrada y seeding inicial
```

## 🧾 Notas
- Se usa `synchronize: true` solo en desarrollo.
- Puedes usar Swagger para documentar la API si deseas extenderla.
- La contraseña se encripta automáticamente con bcrypt.

---

## 🔚 Estado Actual
✅ Login funcional  
✅ Autenticación por roles  
✅ Seeding automático de admin  
✅ Gestión de tickets y reportes  

¡Tu backend NestJS está listo para integrarse con el frontend! 🎉
