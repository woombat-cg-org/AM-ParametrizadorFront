import Modal from 'react-modal'

const InfoCuatro = ({ paramFuente, modal = false }) => {

  const { info_fuente, campos } = paramFuente
  const { nombre_conjunto, tipo_fuente_ingesta, directorio_salida_parquet, flag_particionada, cron_tab, frecuencia_Actualizacion } = info_fuente

  const campos_particion = flag_particionada
  ? campos
      .filter((item) => item.flag_campo_particion === true)
      .map((item) => item.nombre_campo)
      .join(", ")
  : ""

  const customStyles = {
    overlay: {
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '100px',
        maxWidth: '100px',
        minHeight: '65px',
        maxHeight: '65px'
    }
  }

  return (
    <>
      <div className="form_info_fuente_4">
        <p>Nombre Fuente: <span>{nombre_conjunto.toUpperCase()}</span></p>
        <p>Tipo de Fuente: <span>{tipo_fuente_ingesta}</span></p>
        <p>Directorio Salida del Parquet: <span>{directorio_salida_parquet}</span></p>
        {
          campos_particion != "" && (
            <p>Campo Particion: <span>{campos_particion}</span></p>
          )
        }
        <p>Cron-tab: <span>{cron_tab}</span></p>
        <p>Periodicidad: <span>{frecuencia_Actualizacion}</span></p>
        <p>Total Campos: <span>{campos.length}</span></p>
      </div>
      <Modal
          isOpen={modal}
          style={customStyles}
      >
          Loading
      </Modal>
    </>
    )
}

export default InfoCuatro