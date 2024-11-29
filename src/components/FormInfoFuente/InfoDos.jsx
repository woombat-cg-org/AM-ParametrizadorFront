import { useState, useEffect } from 'react'

// Función para convertir a crontab y decodificar un crontab
const useCrontab = () => {
  // Generar crontab desde días, hora y filtro
  const generateCrontab = (dias, hora, filtro) => {
    const dayMap = {
      Lunes: '1',
      Martes: '2',
      Miércoles: '3',
      Jueves: '4',
      Viernes: '5',
      Sábado: '6',
      Domingo: '0',
    }

    const days = dias.map((dia) => dayMap[dia]).join(',')
    const [hours, minutes] = hora.split(':')
    const baseCrontab = `${minutes} ${hours} * * ${days}`
    return filtro ? `${baseCrontab} # ${filtro}` : baseCrontab
  }

  // Decodificar crontab a días, hora y filtro
  const decodeCrontab = (crontab) => {
    const [schedule, ...filterParts] = crontab.split('#')
    const [minutes, hours, , , days] = schedule.trim().split(' ')

    const reverseDayMap = {
      '1': 'Lunes',
      '2': 'Martes',
      '3': 'Miércoles',
      '4': 'Jueves',
      '5': 'Viernes',
      '6': 'Sábado',
      '0': 'Domingo',
    }

    const dias = days.split(',').map((day) => reverseDayMap[day])
    const hora = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`
    const filtro = filterParts.length ? filterParts.join('#').trim() : ''
    return { dias, hora, filtro }
  }

  return { generateCrontab, decodeCrontab }
}

const InfoDos = () => {
  const data = {
    dias_ejecucion: '',
    hora_ejecucion: '',
    filtro: '',
  }

  const [cront, setCront] = useState(data)
  const { dias_ejecucion, hora_ejecucion, filtro } = cront

  const { generateCrontab, decodeCrontab } = useCrontab()

  // Manejar la selección de días
  const toggleDay = (day) => {
    const diasArray = dias_ejecucion ? dias_ejecucion.split(', ') : []

    if (diasArray.includes(day)) {
      const updatedDias = diasArray.filter((d) => d !== day)
      setCront({ ...cront, dias_ejecucion: updatedDias.join(', ') })
    } else {
      const updatedDias = [...diasArray, day]
      setCront({ ...cront, dias_ejecucion: updatedDias.join(', ') })
    }
  }

  // Clase dinámica para los botones
  const getButtonClass = (day) =>
    dias_ejecucion.includes(day) ? 'selected' : ''

  // Efecto para generar crontab automáticamente
  useEffect(() => {
    const diasArray = dias_ejecucion ? dias_ejecucion.split(', ') : []
    if (hora_ejecucion && diasArray.length > 0) {
      const crontab = generateCrontab(diasArray, hora_ejecucion, filtro)
      console.log('Crontab generado automáticamente:', crontab)

      // Decodificar y mostrar para verificación
      const decoded = decodeCrontab(crontab)
      console.log('Decodificación del crontab:', decoded)
    }
  }, [dias_ejecucion, hora_ejecucion, filtro, generateCrontab, decodeCrontab])

  return (
    <div className="form_info_fuente_2">
      <div className="form_info_fuente_time">
        <label htmlFor="">Día Ejecución</label>
        <div className="form_info_fuente_time_days">
          {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day) => (
            <input
              key={day}
              type="button"
              value={day}
              onClick={() => toggleDay(day)}
              className={getButtonClass(day)}
            />
          ))}
        </div>
      </div>
      <div className="form_info_fuente_time">
        <label htmlFor="">Hora Ejecución</label>
        <input
          type="time"
          name="hora_ejecucion"
          value={hora_ejecucion}
          onChange={(e) =>
            setCront({ ...cront, [e.target.name]: e.target.value })
          }
        />
      </div>
      <div className="form_info_fuente_time">
        <label htmlFor="">Condición Filtro</label>
        <textarea
          rows="4"
          cols="50"
          name="filtro"
          placeholder="WHERE"
          value={filtro}
          onChange={(e) => setCront({ ...cront, filtro: e.target.value })}
        ></textarea>
      </div>
    </div>
  )
}

export default InfoDos