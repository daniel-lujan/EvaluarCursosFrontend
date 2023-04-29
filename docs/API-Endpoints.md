
## `GET /log`
**Request Scheme**
Se hace una petición al backend con la Cookie `session`.
Si el usuario es auténtico, el backend deberá responder con la siguiente información:
```json
{
	"role": "student",
	"courses": [
			{
				"id": 583753,
				"code": "Código",
				"teacher": "Nombre de Profesor",
				"name": "Nombre de la materia"
			},
			{
				"id": 839084,
				"code": "Código 2",
				"teacher": "Nombre de Profesor 2",
				"name": "Nombre de la materia 2"
			},
	]
}
```
Y si no lo es, deberá responder con un `HTTP Error Status 401`.

## `POST /log`

**Request Scheme**
`Content-Type: application/json`
```json
{
	"email": "example@udea.edu.co",
	"password": "password"
}
```
**Respuesta Scheme**
```json
{
	"role": "student",
	"courses": [
			{
				"id": 42546,
				"code": "Código de la materia en el plan de estudios",
				"teacher": "Nombre de Profesor",
				"name": "Nombre de la materia",
				"evaluated": false,
			},
			{
				"id": 374563635,
				"code": "Código 2",
				"teacher": "Nombre de Profesor 2",
				"name": "Nombre de la materia 2",
				"evaluated": false,
			},
	]
}
```

En la HTTP Response se espera una cookie `session` con un token que identifique al usuario en la base de datos.

## `POST /form`

**Request Scheme**
Esta solicitud se hace con la Cookie `session` para identificar al usuario.
```json
{
	"id": 34265844357,
	"q1": 1,
	"q2": 3,
	
	"qN": 4,
	"feedback": "Comentario final"
}
```

**Response Scheme**
Si se registra correctamente, retornar un `HTTP Status 200`, de lo contrario `HTTP Status 400`.

## `GET /courses?semester=value&faculty=value&course=value`

Obtener una lista de cursos para un profesor. Los filtros de semestre, facultad y nombre del curso se pasan en la URL como `Query Params`, **todos opcionales**.

**Response Scheme**
```json
[
	{
		"id": "ID de materia",
		"name": "Nombre de la materia",
		"code": "Código de la materia",
		"faculty": "Facultad"
	},
	
	{
		"id": "ID de materia 2",
		"name": "Nombre de la materia 2",
		"code": "Código de la materia 2",
		"faculty": "Facultad 2"
	},
]
```

## `GET /course/{id}`

Obtiene el informe de evaluaciones para un curso. En la respuesta se debe incluir, para cada pregunta, el promedio (`average`), desviación estándar (`desv_est`),  coeficiente de varianza (`coef_var`) y la cantidad de respuestas de esa pregunta (`answers`).

**Response Scheme**
```json
{
	"q1": {
		"average": 4.36,
		"desv_est": 1.15,
		"coef_var": 0.3,
		"answers": 12
	},
	"q2": {
		"average": 2.33,
		"desv_est": 2.3,
		"coef_var": 0.9,
		"answers": 3
	},
	
	"qN": {
		"average": 3.53,
		"desv_est": 3.0,
		"coef_var": 1.2,
		"answers": 6
	},
}
```