const InfoCuatro = ({ paramFuente }) => {

  const { info_fuente, campos } = paramFuente
  const { titulo, tipo_fuente, directorio_salida_parquet, flag_particionada, cron_tab, periodicidad } = info_fuente

  const campos_particion = flag_particionada
  ? campos
      .filter((item) => item.flag_campo_particion === true)
      .map((item) => item.nombre_campo)
      .join(", ")
  : ""

  return (
    <div className="form_info_fuente_4">
      <p>Nombre Fuente: <span>{titulo.toUpperCase()}</span></p>
      <p>Tipo de Fuente: <span>{tipo_fuente}</span></p>
      <p>Directorio Salida del Parquet: <span>{directorio_salida_parquet}</span></p>
      {
        campos_particion != "" && (
          <p>Campo Particion: <span>{campos_particion}</span></p>
        )
      }
      <p>Cron-tab: <span>{cron_tab}</span></p>
      <p>Periodicidad: <span>{periodicidad}</span></p>
      <p>Total Campos: <span>{campos.length}</span></p>
    </div>
  )
}

export default InfoCuatro