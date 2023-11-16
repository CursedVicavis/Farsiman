import React, { useEffect, useState } from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import axios from 'axios'
import moment from 'moment'

const Reporte = ({ PedidoId, factura_Id }) => {
  const doc = new jsPDF()

  const [data, setData] = useState([])
  const [datos, setdatos] = useState([])

  useEffect(() => {
    // llamada a la API para obtener datos de la factura
    const DatosFactura = () => {
      let payload2 = {
        fact_Id: factura_Id
      }

      axios.post('http://eventcompany.somee.com/api/Facturas/ListarInfodeFactura', payload2).then(response => {
        console.log(response.data[0])
        setdatos(response.data[0])
      })
    }
    DatosFactura()
  }, [])

  useEffect(() => {
    // llamada a la API para obtener datos de la tabla
    const DatosFacturaTabla = () => {
      let payload2 = {
        pedi_Id: PedidoId
      }

      axios.post('http://eventcompany.somee.com/api/Facturas/ListarTabladeFactura', payload2).then(response => {
        console.log(response.data)
        setData(response.data)
      })
    }
    if (datos.pedi_Id) {
      DatosFacturaTabla()
    }
  }, [datos])

  const header = function (data) {
    doc.setFontSize(18)
    const pageWidth = doc.internal.pageSize.width
    doc.setTextColor(40)

    // Agregar imagen
    doc.addImage(
      'https://cdn.logojoy.com/wp-content/uploads/2018/05/30163918/1241-768x591.png',
      'png',
      pageWidth - 70,
      -15,
      80,
      80
    )

    // Agregar texto
    doc.setFontSize(30)
    doc.setFont('Pacifico', 'normal')
    doc.text('FACTURA', data.settings.margin.left + 0, 30)

    doc.setFontSize(13)
    doc.setFont('Pacifico', 'normal')
    const fechaCreacion = moment(datos.fact_FechaCreacion).format('DD/MM/YYYY HH:mm:ss')
    doc.text('Fecha de Emision: ' + fechaCreacion, data.settings.margin.left + 0, 60)

    const Empleado = localStorage.getItem('Empleado')
    doc.setFontSize(12)
    doc.setFont('Pacifico', 'normal')
    doc.text('Emitida por: ' + Empleado, data.settings.margin.left + 0, 66)

    doc.setFontSize(12)
    doc.setFont('Pacifico', 'normal')
    doc.text('Caja: 01', data.settings.margin.left + 0, 72)

    ////////////////////////////////////////////////////////////////////////////////////////////////
    doc.setDrawColor(0, 0, 0)
    doc.setLineWidth(0.5)
    doc.line(data.settings.margin.left, 45, pageWidth - data.settings.margin.right, 45)

    doc.setFontSize(13)
    doc.setFont('Pacifico', 'normal')
    doc.text('Factura Nº: ' + datos.fact_Id, data.settings.margin.left + 0, 54)

    doc.setFontSize(12)
    doc.setFont('Pacifico', 'normal')
    doc.text('San Pedro Sula, La Planeta , Cuarta Avenida', data.settings.margin.left + 100, 54)

    doc.setFontSize(12)
    doc.setFont('Pacifico', 'normal')
    doc.text('A la par de pollos super sanos ', data.settings.margin.left + 115, 58)

    doc.setFontSize(12)
    doc.setFont('Pacifico', 'normal')
    doc.text('Tel: +504 3165-0161 / Cel: +504 3396-2352', data.settings.margin.left + 100, 65)

    doc.setFontSize(12)
    doc.setFont('Pacifico', 'normal')
    doc.text('Correo:  eventCompany01@gmail.com', data.settings.margin.left + 104, 70)

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    doc.setDrawColor(0, 0, 0)
    doc.setLineWidth(0.5)
    doc.line(data.settings.margin.left, 76, pageWidth - data.settings.margin.right, 76)

    doc.setFontSize(14)
    doc.setFont('Pacifico', 'normal')
    doc.text('Informacion del Cliente:', data.settings.margin.left + 0, 85)

    doc.setFontSize(12)
    doc.setFont('Pacifico', 'normal')
    doc.text('Nombre del Cliente: ' + datos.clie_Nombres, data.settings.margin.left + 0, 92)

    doc.setFontSize(12)
    doc.setFont('Pacifico', 'normal')
    doc.text('Direccion del Evento: ' + datos.direccion, data.settings.margin.left + 0, 98)

    doc.setFontSize(12)
    doc.setFont('Pacifico', 'normal')
    doc.text('Metodo de pago: ' + datos.pago_Descripcion, data.settings.margin.left + 0, 104)
  }

  const footer = function (data) {
    doc.setFontSize(12)
    doc.setFont('Pacifico', 'normal')
    doc.text('La Factura es un beneficio de todos Exijala!!', data.settings.margin.left + 50, 270)

    doc.setFontSize(12)
    doc.setFont('Pacifico', 'normal')
    doc.text('Gracias por su Compra!!', data.settings.margin.left + 68, 280)
  }

  doc.autoTable({
    head: [['Descripción', 'Cantidad', 'Precio Unitario', 'Total']],
    body: data.map(campos => [
      campos.paqt_Nombre ?? campos.prov_Servicio ?? campos.inve_Elemento,
      campos.pede_Cantidad,
      campos.serv_Precio_Nuevo !== 0
        ? campos.serv_Precio_Nuevo
        : campos.inve_Precio !== 0
        ? campos.inve_Precio
        : campos.paqt_Precio !== 0
        ? campos.paqt_Precio
        : '',
      campos.serv_Precio_Nuevo !== 0
        ? campos.serv_Precio_Nuevo
        : campos.totalPrecioElemento !== 0
        ? campos.totalPrecioElemento
        : campos.paqt_Precio !== 0
        ? campos.paqt_Precio
        : ''
    ]),
    didDrawPage: function (data) {
      header(data)
      footer(data)
    },
    margin: { top: 110, bottom: 20 }
  })

  doc.autoTable({
    body: [
      ['SubTotal:', datos.fact_SubTotal],
      ['IVA:', datos.fact_Impuesto],
      ['TOTAL:', datos.fact_Total]
    ],
    startY: doc.autoTable.previous.finalY + 1,
    margin: { top: 150, right: 15, bottom: 20, left: 115 },
    styles: {
      cellWidth: 'wrap',
      cellPadding: 2,
      fontSize: 10
    },
    columnStyles: {
      1: { cellWidth: 25 } // Elige el valor que necesites
    }
  })

  // obtenemos una URL del PDF para mostrarlo en un iframe
  const pdfUrl = doc.output('dataurl')

  // mostramos el documento PDF en un iframe
  return (
    <div style={{ height: '100vh' }}>
      <iframe src={pdfUrl} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

export default Reporte
