import { useState, useEffect } from 'react'

// Función para convertir días y hora en crontab
const useCrontab = () => {
  const generateCrontab = (dias, hora) => {
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
    return `${minutes} ${hours} * * ${days}`
  }

  const decodeCrontab = (crontab) => {
    const [minutes, hours, , , days] = crontab.trim().split(' ')
    const reverseDayMap = {
        '1': 'Lunes',
        '2': 'Martes',
        '3': 'Miércoles',
        '4': 'Jueves',
        '5': 'Viernes',
        '6': 'Sábado',
        '0': 'Domingo',
    }

    const diasArray = days.split(',').map((day) => reverseDayMap[day])
    const dias = diasArray.join(', ')
    const hora = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`
    return { dias, hora }
  }

  return { generateCrontab, decodeCrontab }
}

const InfoDos = ({ paramFuente, setParamFuente }) => {

  const data = {
    dias_ejecucion: '',
    hora_ejecucion: '',
    filtro: ''
  }

  const [cront, setCront] = useState(data)
  const { dias_ejecucion, hora_ejecucion, filtro } = cront

  const [crontab, setCrontab] = useState('')
  const { generateCrontab, decodeCrontab } = useCrontab()

  const weekDaysOrder = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ]

  // Manejar la selección de días y reordenar
  const toggleDay = (day) => {
    const diasArray = dias_ejecucion ? dias_ejecucion.split(', ') : []

    let updatedDias
    if (diasArray.includes(day)) {
      updatedDias = diasArray.filter((d) => d !== day)
    } else {
      updatedDias = [...diasArray, day]
    }

    // Reordenar días seleccionados
    updatedDias.sort((a, b) => weekDaysOrder.indexOf(a) - weekDaysOrder.indexOf(b))

    setCront({ ...cront, dias_ejecucion: updatedDias.join(', ') })
  }

  // Clase dinámica para los botones
  const getButtonClass = (day) =>
    dias_ejecucion.includes(day) ? 'selected' : ''

  // Generar automáticamente el crontab
  useEffect(() => {
    const diasArray = dias_ejecucion ? dias_ejecucion.split(', ') : []
    if (hora_ejecucion && diasArray.length > 0) {
      const crontab = generateCrontab(diasArray, hora_ejecucion)
      setCrontab(crontab)
    } else {
      setCrontab('')
    }
  }, [dias_ejecucion, hora_ejecucion])

  useEffect(() => {
    if(crontab) {
      setParamFuente({
        ...paramFuente,
        info_fuente: {
          ...paramFuente.info_fuente,
          cron_tab: crontab
        }
      })
    }
  }, [crontab])

  const { info_fuente } = paramFuente
  const { cron_tab, condicion_filtro, tipo_fuente_ingesta } = info_fuente

  useEffect(() => {
    if(cron_tab) {
      const crontab = decodeCrontab(cron_tab)
      setCront({
        ...cront,
        dias_ejecucion: crontab.dias,
        hora_ejecucion: crontab.hora
      })
    }
  }, [cron_tab])

  return (
    <div className="form_info_fuente_2">
      <div className="form_info_fuente_time">
        <label htmlFor="">Día Ejecución</label>
        <div className="form_info_fuente_time_days">
          {weekDaysOrder.map((day) => (
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
      {
        tipo_fuente_ingesta === "SQL" ? (
          <>
            <div className="form_info_fuente_time">
              <label htmlFor="">Condición Filtro</label>
              <textarea
                rows="4"
                cols="50"
                name="condicion_filtro"
                placeholder="WHERE"
                value={condicion_filtro}
                onChange={(e) => setParamFuente({ ...paramFuente, info_fuente: {...paramFuente.info_fuente, [e.target.name]: e.target.value} })}
              ></textarea>
            </div>
          </>
        ) : (
          <>
            <div className="form_info_fuente_time">
              <label htmlFor="">Condición Filtro</label>
              <textarea
                rows="4"
                cols="50"
                name="condicion_filtro"
                placeholder="Condición Filtro no disponible para este tipo de fuente."
                disabled
                value={condicion_filtro}
                onChange={(e) => setParamFuente({ ...paramFuente, info_fuente: {...paramFuente.info_fuente, [e.target.name]: e.target.value} })}
              ></textarea>
            </div>
          </>
      )
      } 
    </div>
  )
}

export default InfoDos