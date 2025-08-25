# Ejemplo de Actualización de Entrenador

## Endpoint
```
PATCH /users/trainer/:trainerId
```

## Ejemplo de Request

### URL
```
http://localhost:8000/users/trainer/eaee096b-8ee4-43c0-b3a4-f5ec73d0d542
```

### Headers
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

### Payload de Ejemplo

#### 1. Actualización Básica
```json
{
  "fullName": "Carlos Entrenador Actualizado",
  "age": 32,
  "phone": "+1234567890"
}
```

#### 2. Actualización con RFC y CURP
```json
{
  "fullName": "Carlos Entrenador Actualizado",
  "age": 32,
  "phone": "+1234567890",
  "rfc": "XAXX010101000",
  "curp": "XAXX010101HDFXXX00"
}
```

#### 3. Actualización con Fecha de Nacimiento
```json
{
  "fullName": "Carlos Entrenador Actualizado",
  "age": 32,
  "phone": "+1234567890",
  "dateOfBirth": "1992-05-15"
}
```

#### 4. Actualización Completa
```json
{
  "fullName": "Carlos Entrenador Actualizado",
  "age": 32,
  "phone": "+1234567890",
  "rfc": "XAXX010101000",
  "curp": "XAXX010101HDFXXX00",
  "dateOfBirth": "1992-05-15"
}
```

## Campos Disponibles para Actualización

| Campo | Tipo | Descripción | Requerido | Validación |
|-------|------|-------------|-----------|------------|
| `fullName` | string | Nombre completo del entrenador | ✅ Sí | No puede estar vacío |
| `age` | number | Edad del entrenador | ❌ No | Entre 18-100 años |
| `phone` | string | Número de teléfono | ❌ No | Formato libre |
| `rfc` | string | RFC del entrenador | ❌ No | Exactamente 13 caracteres |
| `curp` | string | CURP del entrenador | ❌ No | Exactamente 18 caracteres |
| `dateOfBirth` | string | Fecha de nacimiento | ❌ No | Formato YYYY-MM-DD, edad entre 18-100 años |

## Notas Importantes

1. **Email NO se puede editar** - El campo email no está disponible para actualización
2. **Campos opcionales** - Solo se envían los campos que se quieren actualizar
3. **Validaciones automáticas** - El sistema valida automáticamente la edad basada en la fecha de nacimiento
4. **Formato de fecha** - La fecha de nacimiento debe estar en formato ISO (YYYY-MM-DD)
5. **Campos vacíos** - Los campos vacíos o null no se envían al backend

## Respuesta del Sistema

### Éxito (200 OK)
```json
{
  "message": "Entrenador actualizado exitosamente",
  "trainer": {
    "id": "eaee096b-8ee4-43c0-b3a4-f5ec73d0d542",
    "fullName": "Carlos Entrenador Actualizado",
    "age": 32,
    "phone": "+1234567890",
    "rfc": "XAXX010101000",
    "curp": "XAXX010101HDFXXX00",
    "dateOfBirth": "1992-05-15",
    "updatedAt": "2025-01-27T10:30:00.000Z"
  }
}
```

### Error de Validación (400 Bad Request)
```json
{
  "message": "Error de validación",
  "errors": {
    "age": "La edad debe ser un número entre 18 y 100",
    "rfc": "El RFC debe tener exactamente 13 caracteres"
  }
}
```

### Error de Autenticación (401 Unauthorized)
```json
{
  "message": "No hay token de autenticación"
}
```
